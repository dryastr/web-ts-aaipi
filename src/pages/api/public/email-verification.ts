import { emailVerificationBE } from 'src/service/public/email-verification';
import { NextApiRequest, NextApiResponse } from 'next';

const ssrApi = async (req: NextApiRequest, res: NextApiResponse) => {
	const { email, email_verify_key } = req.body;
	const params = {
		email,
		email_verify_key
	};
	try {
		const response: any = await emailVerificationBE(params);
		res.status(200).json({ message: response.message, status: response.status });
	} catch (err: any) {
		if (err?.response?.status === 422 && err?.response?.data?.errors?.data?.is_verified) {
			res.status(200).json({ message: err?.response?.data?.message, status: 'success', data: { is_verified: err?.response?.data?.errors?.data?.is_verified } });
		}
		// Tambah error log di sini seperti error log dari newrelic atau lainnya untuk me-record error di sisi server (SSR) yang sudah production
		// Atau lakukan console log di sini lalu cek pada terminal kita untuk melakukan debug di sisi Server (SSR) secara local.
		// console.log('error', err);
		res.status(err?.response?.status || 500).json(
			err?.response?.data || { message: 'Internal Server Error' },
		);
	}
};

export default ssrApi;
