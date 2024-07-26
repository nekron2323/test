const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const ENCRYPTION_KEY = 'f3a1e5ba909c44169643a600ad491907';
const IV_LENGTH = 16;

function encrypt(text) {
    if (!text) return;
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv(
        algorithm,
        Buffer.from(ENCRYPTION_KEY.slice(0, 32)),
        iv
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
    if (typeof text !== 'string') return '';
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv(
        algorithm,
        Buffer.from(ENCRYPTION_KEY.slice(0, 32)),
        iv
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

module.exports = { encrypt, decrypt }