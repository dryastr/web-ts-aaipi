import { setCookie, getCookie, deleteCookie, getCookies } from 'cookies-next';

interface Server {
	req: any;
	res: any;
}

export const setSecureCookie = (cookieKey: string, cookieContent: string, server: Server) => {
	const secureCookie = {
		sameSite: true,
		httpOnly: true,
		secure: true,
		req: server.req,
		res: server.res,
	};
	setCookie(cookieKey, cookieContent, secureCookie);
};

export const getSecureCookie = (key: string = '', server: any = {}) => {
	const cookieOptions = { req: server.req, res: server.res };
	return getCookie(key, cookieOptions);
};

export const getAllCookie = (server: any = {}) => {
	const cookieOptions = { req: server.req, res: server.res };
	return getCookies(cookieOptions);
};

export const deleteSecureCookie = (cookieKey: string = '', server: any = {}) => {
	const secureCookie = {
		sameSite: true,
		httpOnly: true,
		secure: true,
		req: server.req,
		res: server.res,
	};
	deleteCookie(cookieKey, secureCookie);
};
