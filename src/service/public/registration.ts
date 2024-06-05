import request from 'src/utils/interceptor';

const BASE_URL = process.env.API_HOST_BE;

export const registrationSSR = (data: any) =>
	request({
		url: '/api/public/registration',
		method: 'POST',
		data,
	});

export const registrationBE = (body = {}) =>
	request({
		baseURL: BASE_URL,
		method: 'POST',
		url: '/api/v1/registration',
		data: body,
	});

