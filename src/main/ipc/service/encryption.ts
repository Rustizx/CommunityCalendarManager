import * as crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const iv = crypto.randomBytes(16);

export interface EncryptedFileType {
  iv: string;
  encryptedData: string;
}

export function encrypt(data: string, pass: string): EncryptedFileType {
  const password = crypto.scryptSync(pass, 'salt', 32);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(password), iv);
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

export function decrypt(data: EncryptedFileType, pass: string): string {
  const password = crypto.scryptSync(pass, 'salt', 32);
  const ivFile = Buffer.from(data.iv, 'hex');
  const encryptedText = Buffer.from(data.encryptedData, 'hex');
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(password),
    ivFile
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
