import request from 'src/utils/interceptor';

const BASE_URL = process.env.API_HOST_BE;

export const forgotPasswordSSR = (data: any) =>
	request({
		url: '/api/public/forgot-password',
		method: 'POST',
		data,
	});

export const forgotPasswordBE = (body = {}) =>
	request({
		baseURL: BASE_URL,
		method: 'POST',
		url: '/api/v1/forgot-password',
		data: body,
	});

