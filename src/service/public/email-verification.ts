import request from 'src/utils/interceptor';

const BASE_URL = process.env.API_HOST_BE;

export const emailVerificationSSR = (data: any) =>
	request({
		url: '/api/public/email-verification',
		method: 'POST',
		data,
	});

export const emailVerificationBE = (body = {}) =>
	request({
		baseURL: BASE_URL,
		method: 'POST',
		url: '/api/v1/user/email-verification',
		data: body,
	});

