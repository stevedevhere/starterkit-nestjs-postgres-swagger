import * as config from 'config';
import * as crypto from 'crypto';

export class Encryption {
  static algorithm = config.auth.encryption.algorithm;
  static password = config.auth.encryption.secret;

  static encrypt(text) {
    const cipher = crypto.createCipher(this.algorithm, this.password);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  static decrypt(encrypted) {
    const decipher = crypto.createDecipher(this.algorithm, this.password);
    let dec = decipher.update(encrypted, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  }
}
