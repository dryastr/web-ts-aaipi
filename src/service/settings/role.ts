import request from 'src/utils/interceptor';

export const get = (params: object) =>
	request({
		method: 'GET',
		url: `/api/v1/settings/role${params ? '' : '/list'}`,
		params,
	});

export const show = (id: string) =>
	request({
		method: 'GET',
		url: `/api/v1/settings/role/${id}`,
	});

export const create = (data: any) => {
	if (!data.logo) {
		delete data.logo;
	}

	return request({
		method: 'POST',
		url: `/api/v1/settings/role`,
		data,
	});
}

export const update = (data: any, id: string) => {
	if (!data.logo) {
		delete data.logo;
	}
	data._method = 'PUT';

	return request({
		method: 'POST',
		url: `/api/v1/settings/role/${id}`,
		data,
	});
}
	

export const destroy = (id: string) =>
	request({
		method: 'DELETE',
		url: `/api/v1/settings/role/${id}`,
	});
