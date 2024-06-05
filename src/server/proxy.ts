import { createProxyMiddleware, RequestHandler } from 'http-proxy-middleware';

const proxy: RequestHandler = createProxyMiddleware({
	/**
	 * Get the actual back-end service URL from environment variables.
	 * We shouldn't prefix the environment variable with NEXT_PUBLIC_* to avoid exposing it to the client.
	 */
	target: process.env.API_HOST_BE as string,
	autoRewrite: false,
	changeOrigin: true,
});

export default proxy;
