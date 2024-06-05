import request from 'src/utils/interceptor';

export const list = (params: object) =>
	request({
		method: 'GET',
		url: `/api/v1/general/ref/jadwal/list`,
		params,
	});
