import CryptoJS from 'crypto-js';

export const encryptText = (text: string = '') => {
	const keyEncrypt = process.env.APP_ENCRYPT_KEY || '';
	return CryptoJS.AES.encrypt(JSON.stringify(text), keyEncrypt).toString();
};

export const decryptText = (text: string = '') => {
	const keyEncrypt = process.env.APP_ENCRYPT_KEY || '';
	return JSON.parse(CryptoJS.AES.decrypt(text, keyEncrypt).toString(CryptoJS.enc.Utf8));
};

export const encryptURL = (id: any = '') => {
	const idEncrypt = encryptText(id?.toString());
	const paramEncode = encodeURIComponent(idEncrypt);
	return paramEncode.toString();
};

export const decryptURL = (id: string = '') => {
	const paramDecode = decodeURIComponent(id);
	const idDecrypt = decryptText(paramDecode);
	return idDecrypt;
};
