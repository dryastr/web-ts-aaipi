import request from 'src/utils/interceptor';

export const get = (params: object) =>
	request({
		method: 'GET',
		url: `/api/v1/settings/audit-log${params ? '' : '/list'}`,
		params,
	});
