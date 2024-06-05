import request from 'src/utils/interceptor';

const BASE_URL = process.env.API_HOST_BE;

export const loginSSR = (data: any) =>
	request({
		url: '/api/auth/login',
		method: 'POST',
		data: {
			email: data.email,
			password: data.password,
			remember_me: data.remember_me ? true : false
		},
	});

export const loginBE = (body = {}) =>
	request({
		baseURL: BASE_URL,
		method: 'POST',
		url: '/api/v1/login',
		data: body,
	});

export const logout = () =>
	request({
		url: '/api/auth/logout',
		method: 'GET',
	});
