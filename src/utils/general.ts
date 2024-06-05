export const setKey = (name: string, id: any) => {
	return `${name}-${id}`;
};

export const test = () => {
	return null;
};

export const getClientIP = (req: any) => {
	let ip = '';
	if (req.headers?.['x-forwarded-for']) {
		ip = req.headers?.['x-forwarded-for'].split(',')[0];
	} else if (req.headers?.['x-real-ip']) {
		ip = req.connection?.remoteAddress;
	} else {
		ip = req.connection?.remoteAddress;
	}
	return ip;
};
