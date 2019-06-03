import SettingsModal from 'flarum/components/SettingsModal';

export default class LinkedInSettingsModal extends SettingsModal {
    className() {
        return 'AuthLinkedInSettingsModal Modal--small';
    }

    title() {
        return app.translator.trans('nomiscz-auth-linkedin.admin.settings.title');
    }

    form() {
        return [
            <div className="Form-group">
                <label>{app.translator.trans('nomiscz-auth-linkedin.admin.settings.api_app_id')}</label>
                <input className="FormControl" bidi={this.setting('flarum-ext-auth-linkedin.app_id')}/>
            </div>,
            <div className="Form-group">
                <label>{app.translator.trans('nomiscz-auth-linkedin.admin.settings.api_app_secret')}</label>
                <input className="FormControl" bidi={this.setting('flarum-ext-auth-linkedin.app_secret')}/>
            </div>,
        ];
    }
}