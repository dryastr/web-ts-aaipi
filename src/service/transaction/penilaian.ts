import request from 'src/utils/interceptor';

export const getPenilaian = (params: object) =>
	request({
		method: 'GET',
		url: `/api/v1/trans/penilaian`,
		params,
	});

export const showPenilaian = (id: string) =>
	request({
		method: 'GET',
		url: `/api/v1/trans/penilaian/${id}`,
	});

export const createPenilaian = (data: any) =>
	request({
		method: 'POST',
		url: `/api/v1/trans/penilaian`,
		data,
	});

export const updatePenilaian = (data: any, id: string) =>
	request({
		method: 'PUT',
		url: `/api/v1/trans/penilaian/${id}`,
		data,
	});

export const deletePenilaian = (id: string) =>
	request({
		method: 'DELETE',
		url: `/api/v1/trans/penilaian/${id}`,
	});
