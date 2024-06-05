import request from 'src/utils/interceptor';

const BASE_URL = process.env.API_HOST_BE;

export const resetPasswordSSR = (data: any) =>
	request({
		url: '/api/public/reset-password',
		method: 'POST',
		data,
	});

export const resetPasswordBE = (body = {}) =>
	request({
		baseURL: BASE_URL,
		method: 'POST',
		url: '/api/v1/reset-password',
		data: body,
	});

