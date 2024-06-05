import { NextApiRequest, NextApiResponse } from 'next';
import proxy from 'src/server/proxy';
import { decryptText, decryptURL } from 'src/utils/crypt';

const ssrApi = async (req: NextApiRequest, res: NextApiResponse) =>
	new Promise<void>((resolve, reject) => {
		const { cookies } = req;
		const { webAccess } = cookies;

		// Setup Token
		let decryptedText;
		try {
			decryptedText = decryptText(webAccess);
			req.headers.Authorization = `Bearer ${decryptedText}`;
		} catch (error) {
			reject();
			res.status(401).json({ message: 'Failed to decrypt token' });
		}

		// Setup Security Params ID (Decrypt ID)
		if (req.headers['decrypt-id']) {
			let url = req?.url || '';
			const segments = req?.url?.split('/') || [];
			let lastSegment = segments?.[segments.length - 1];
			let idSegment = '';
			if (['approve', 'reject', 'set-active'].includes(lastSegment)) {
				lastSegment = segments?.[segments.length - 2]
				idSegment = decryptURL(lastSegment);
			} else {
				idSegment = decryptURL(lastSegment)
			}
			url = url.replace(lastSegment, idSegment);
			req.url = url;
		}

		/**
		 * if an error occurs in the proxy, we will reject the promise.
		 * it is so important. if you don't reject the promise,
		 * you're facing the stalled requests issue.
		 */
		// @ts-ignore
		proxy(req, res, (err: any) => {
			if (err) {
				// console.error('error disini', err);
				reject(err);
			} else {
				resolve();
			}
		});
	});

export const config = {
	api: {
		bodyParser: false,
	},
};

export default ssrApi;
