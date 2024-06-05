import { NextResponse } from 'next/server';
import mime from 'mime-types';
import COOKIES_KEY from './constants/COOKIES_KEY';

export function middleware(request: any): NextResponse {
	const url: string = request.nextUrl.pathname;
	const cookie: string | undefined = request.cookies.get(COOKIES_KEY.ACCESS_TOKEN);
	const loginURL = '/auth/login';
	const splitUrl = url.split('/');

	const isFileUrl = (urlCheck: any) => {
		const mimeType: string | false = mime.lookup(urlCheck);
		return mimeType !== false && mimeType !== 'application/octet-stream';
	};

	const publicUrls = ['images', 'public', 'auth', 'api'];

	if (splitUrl[1] === 'api' || splitUrl[1] === 'public') {
		return NextResponse.next();
	}

	if (publicUrls.includes(splitUrl[1]) && !cookie) {
		return NextResponse.next();
	}

	if (!isFileUrl(url)) {
		if ((url === loginURL || splitUrl[1] === 'public' || splitUrl[1] === 'auth') && cookie) {
			return NextResponse.redirect(new URL('/', request.url));
		}
		if (url !== loginURL && !cookie) {
			const previousUrl: string = request?.headers?.get?.('Referer');
			const parsedUrl: any = previousUrl ? new URL(previousUrl) : '';
			const previousPath: string = parsedUrl?.pathname;
			if (previousPath !== loginURL) {
				return NextResponse.redirect(new URL(loginURL, request.url));
			}
		}
	}

	return NextResponse.next();
}

// See "Matching Paths"
export const config = {
	matcher: ['/:path*', '/login'],
};
