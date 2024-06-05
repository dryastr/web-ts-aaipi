import { NextApiRequest, NextApiResponse } from 'next';
import proxy from 'src/server/proxy';

const ssrApi = async (req: NextApiRequest, res: NextApiResponse) =>
	new Promise<void>((resolve, reject) => {
		req.url = '/api/v1/registration';

		/**
		 * if an error occurs in the proxy, we will reject the promise.
		 * it is so important. if you don't reject the promise,
		 * you're facing the stalled requests issue.
		 */
		// @ts-ignore
		proxy(req, res, (err: any) => {
			if (err) {
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