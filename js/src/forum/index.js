import app from 'flarum/app';

import LogInButtons from 'flarum/components/LogInButtons';
import LogInButton from 'flarum/components/LogInButton';

app.initializers.add('nomiscz/flarum-ext-auth-linkedin', () => {
    extend(LogInButtons.prototype, 'items', (items) => {
        items.add('linkedin',
            <LogInButton
                className="Button LogInButton--linkdin"
                icon="fab fa-linkedin"
                path="/auth/linkedin">
                {app.translator.trans('nomiscz-auth-linkedin.forum.buttons.login')}
            </LogInButton>
        );
    });
});