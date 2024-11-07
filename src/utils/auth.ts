import config from 'configs/env';
import { StorageKey } from 'const/storage';
import forge from 'node-forge';

import { User as TelegramUser } from 'types/telegram';
import storage from 'utils/storage';

export class Auth {
  get telegramId() {
    const user = storage.getJSON<TelegramUser>(StorageKey.USER);
    return user?.id ?? -1;
  }

  getAuthHeader() {
    if (!config.requestPublicKey || this.telegramId === null) {
      return '';
    }

    const publicKey = forge.pki.publicKeyFromPem(config.requestPublicKey);
    const encryptedPayload = publicKey.encrypt(
      forge.util.encodeUtf8(this.telegramId.toString()),
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
