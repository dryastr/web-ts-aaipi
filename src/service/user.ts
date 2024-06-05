import request from 'src/utils/interceptor';

export const myProfile = () =>
	request({
		method: 'GET',
		url: '/api/v1/user',
	});

export const updateProfile = (data: any, id: any) =>
	request({
		method: 'PUT',
		url: `/api/v1/users/${id}`,
		data,
	});

export const changePassword = (data: any) =>
	request({
		method: 'POST',
		url: `/api/v1/user/change-password`,
		data,
	});
