import request from 'src/utils/interceptor';

export const get = (params: object) =>
	request({
		method: 'GET',
		url: `/api/v1/management-data/ref/periode${params ? '' : '/list'}`,
		params,
	});

export const show = (id: string) =>
	request({
		method: 'GET',
		url: `/api/v1/management-data/ref/periode/${id}`,
	});

export const create = (data: any) => {
	if (!data.ref_lokasi_id_provinsi) {
		delete data.ref_lokasi_id_provinsi;
	}

	return request({
		method: 'POST',
		url: `/api/v1/management-data/ref/periode`,
		data,
	});
};

export const update = (data: any, id: string) => {
	if (!data.ref_lokasi_id_provinsi) {
		delete data.ref_lokasi_id_provinsi;
	}

	return request({
		method: 'PUT',
		url: `/api/v1/management-data/ref/periode/${id}`,
		data,
	});
};

export const destroy = (id: string) =>
	request({
		method: 'DELETE',
		url: `/api/v1/management-data/ref/periode/${id}`,
	});
