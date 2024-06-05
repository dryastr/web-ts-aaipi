import { resetPasswordBE } from 'src/service/public/reset-password';
import { NextApiRequest, NextApiResponse } from 'next';

const ssrApi = async (req: NextApiRequest, res: NextApiResponse) => {
	const { email, token, password, password_confirmation } = req.body;
	const params = {
		email,
		token,
		password,
		password_confirmation
	};
	try {
		const response: any = await resetPasswordBE(params);
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
