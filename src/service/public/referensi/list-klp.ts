import request from 'src/utils/interceptor';

const BASE_URL = process.env.API_HOST_BE;

export const listKlpSSR = (params: any) =>
	request({
		url: '/api/public/referensi/list-klp',
		method: 'GET',
		params,
	});

export const listKlpBE = (params = {}) =>
	request({
		baseURL: BASE_URL,
		method: 'GET',
		url: '/api/v1/general/ref/klp/list',
		params,
	});

