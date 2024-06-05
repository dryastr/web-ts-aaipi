import request from 'src/utils/interceptor';

export const get = (params: object) =>
	request({
		method: 'GET',
		url: `/api/v1/management-data/ref/lokasi${params ? '' : '/list'}`,
		params,
	});

export const show = (id: string) =>
	request({
		method: 'GET',
		url: `/api/v1/management-data/ref/lokasi/${id}`,
	});

export const create = (data: any) => {
	Object.keys(data).forEach(key => {
		if (!data[key]) {
			delete data[key];
		}
	});

	return request({
		method: 'POST',
		url: `/api/v1/management-data/ref/lokasi`,
		data,
	});
}

export const update = (data: any, id: string) => {
	Object.keys(data).forEach(key => {
		if (!data[key]) {
			delete data[key];
		}
	});

	return request({
		method: 'PUT',
		url: `/api/v1/management-data/ref/lokasi/${id}`,
		data,
	});
}

export const destroy = (id: string) =>
	request({
		method: 'DELETE',
		url: `/api/v1/management-data/ref/lokasi/${id}`,
	});
