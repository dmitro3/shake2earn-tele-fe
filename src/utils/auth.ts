import config from 'configs/env';
import forge from 'node-forge';

import ls from 'utils/ls';

export class Auth {
  get telegramId() {
    const telegramId = ls.getItem('telegram-id');
    return telegramId;
  }

  getAuthHeader() {
    if (!config.requestPublicKey || this.telegramId === null) {
      return '';
    }

    const publicKey = forge.pki.publicKeyFromPem(config.requestPublicKey);
    const encryptedPayload = publicKey.encrypt(
      forge.util.encodeUtf8(this.telegramId),
      'RSA-OAEP',
      {
        md: forge.md.sha256.create(),
      },
    );
    const base64Payload = forge.util.encode64(encryptedPayload);
    return base64Payload;
  }
}

const auth = new Auth();
export default auth;
