import { NextApiRequest, NextApiResponse } from 'next';
import COOKIES_KEY from 'src/constants/COOKIES_KEY';
import { deleteSecureCookie } from 'src/utils/serverCookie';

const ssrApi = (req: NextApiRequest, res: NextApiResponse) => {
	deleteSecureCookie(COOKIES_KEY.TOKEN_TYPE, { req, res });
	deleteSecureCookie(COOKIES_KEY.ACCESS_TOKEN, { req, res });
	return res.status(200).json({
		meta: {
			status: 200,
			message: 'Cookie removed',
		},
	});
};

export default ssrApi;
