<?php

/*
 * This file is part of nomiscz/flarum-ext-auth-linkedin.
 *
 * Copyright (c) 2019 NomisCZ.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace NomisCZ\LinkedInAuth\Http\Controllers;

use Exception;
use Flarum\Forum\Auth\Registration;
use NomisCZ\LinkedInAuth\Flarum\Forum\Auth\NResponseFactory;
use Flarum\Http\UrlGenerator;
use Flarum\Settings\SettingsRepositoryInterface;
use League\OAuth2\Client\Provider\LinkedIn;
use League\OAuth2\Client\Provider\LinkedInResourceOwner;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface;
use Zend\Diactoros\Response\RedirectResponse;

class LinkedInAuthController implements RequestHandlerInterface
{
    /**
     * @var NResponseFactory
     */
    protected $response;
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;
    /**
     * @var UrlGenerator
     */
    protected $url;
    /**
     * @param NResponseFactory $response
     * @param SettingsRepositoryInterface $settings
     * @param UrlGenerator $url
     */
    public function __construct(NResponseFactory $response, SettingsRepositoryInterface $settings, UrlGenerator $url)
    {
        $this->response = $response;
        $this->settings = $settings;
        $this->url = $url;
    }
    /**
     * @param Request $request
     * @return ResponseInterface
     * @throws Exception
     */
    public function handle(Request $request): ResponseInterface
    {
        $redirectUri = $this->url->to('forum')->route('auth.linkedin');

        $provider = new LinkedIn([
            'clientId' => $this->settings->get('flarum-ext-auth-linkedin.app_id'),
            'clientSecret' => $this->settings->get('flarum-ext-auth-linkedin.app_secret'),
            'redirectUri' => $redirectUri,
        ]);

        $session = $request->getAttribute('session');
        $queryParams = $request->getQueryParams();
        $code = array_get($queryParams, 'code');

        if (!$code) {

            $authUrl = $provider->getAuthorizationUrl();
            $session->put('oauth2state', $provider->getState());
            return new RedirectResponse($authUrl.'&display=popup');
        }

        $state = array_get($queryParams, 'state');

        if (!$state || $state !== $session->get('oauth2state')) {

            $session->remove('oauth2state');
            throw new Exception('Invalid state');
        }

        $token = $provider->getAccessToken('authorization_code', compact('code'));
        /** @var LinkedInResourceOwner $user */
        $user = $provider->getResourceOwner($token);

        return $this->response->make(
            'linkedin', $user->getId(),
            function (Registration $registration) use ($user) {
                $registration
                    ->provideTrustedEmail($user->getEmail())
                    ->suggestUsername($user->getFirstName().'_'.$user->getLastName())
                    ->setPayload($user->toArray());

                if ($user->getImageUrl()) {
                    $registration->provideAvatar($user->getImageUrl());
                }
            }
        );
    }
}