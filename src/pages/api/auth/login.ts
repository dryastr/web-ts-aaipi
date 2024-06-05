import { loginBE } from 'src/service/auth/auth';
import { encryptText } from 'src/utils/crypt';
import { setSecureCookie } from 'src/utils/serverCookie';
import { NextApiRequest, NextApiResponse } from 'next';
import COOKIES_KEY from 'src/constants/COOKIES_KEY';

const ssrApi = async (req: NextApiRequest, res: NextApiResponse) => {
	const { email, password } = req.body;
	const params = {
		email,
		password,
	};
	try {
		const response: any = await loginBE(params);
		const encryptedAccessToken = encryptText(response?.data?.access_token);
		const encryptedTokenType = encryptText(response?.data?.token_type);
		setSecureCookie(COOKIES_KEY.ACCESS_TOKEN, encryptedAccessToken, { req, res });
		setSecureCookie(COOKIES_KEY.TOKEN_TYPE, encryptedTokenType, { req, res });
		res.status(200).json({ message: response.message, status: response.status });
	} catch (err: any) {
		// Tambah error log di sini seperti error log dari newrelic atau lainnya untuk me-record error di sisi server (SSR) yang sudah production
		// Atau lakukan console log di sini lalu cek pada terminal kita untuk melakukan debug di sisi Server (SSR) secara local.
		// console.log('error', err);
		res.status(err?.response?.status || 500).json(
			err?.response?.data || { message: 'Internal Server Error' },
		);
	}
};

export default ssrApi;
