import request from 'src/utils/interceptor';

export const get = (params: object) =>
	request({
		method: 'GET',
		url: `/api/v1/verification/new-user${params ? '' : '/list'}`,
		params,
	});

export const show = (id: string) =>
	request({
		method: 'GET',
		url: `/api/v1/verification/new-user/${id}`,
	});

export const approval = (type: any, data: any, id: string) => {
	return request({
		method: 'POST',
		url: `/api/v1/verification/new-user/${id}/${type}`,
		data,
	});
}
