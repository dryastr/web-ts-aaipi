import request from 'src/utils/interceptor';

export const get = (params: object) =>
	request({
		method: 'GET',
		url: `/api/v1/management-data/ref/jadwal${params ? '' : '/list'}`,
		params,
	});

export const show = (id: string) =>
	request({
		method: 'GET',
		url: `/api/v1/management-data/ref/jadwal/${id}`,
	});

export const create = (data: any) => {
	return request({
		method: 'POST',
		url: `/api/v1/management-data/ref/jadwal`,
		data,
	});
}

export const update = (data: any, id: string) => {
	return request({
		method: 'PUT',
		url: `/api/v1/management-data/ref/jadwal/${id}`,
		data,
	});
}

export const destroy = (id: string) =>
	request({
		method: 'DELETE',
		url: `/api/v1/management-data/ref/jadwal/${id}`,
	});
