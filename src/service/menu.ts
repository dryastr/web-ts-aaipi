import request from 'src/utils/interceptor';

const getMenu = () =>
	request({
		method: 'GET',
		url: '/api/v1/menu/me',
	});

export default getMenu;
