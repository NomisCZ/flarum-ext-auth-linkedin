import app from 'flarum/app';
import LinkedInSettingsModal from './components/LinkedInSettingsModal';

app.initializers.add('nomiscz-auth-linkedin', () => {
    app.extensionSettings['nomiscz-auth-linkedin'] = () => app.modal.show(new LinkedInSettingsModal());
});