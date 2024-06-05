import { listKlpBE } from 'src/service/public/referensi/list-klp';
import { NextApiRequest, NextApiResponse } from 'next';

const ssrApi = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const response: any = await listKlpBE(req.body);
		res.status(200).json(response);
	} catch (err: any) {
		// Tambah error log di sini seperti error log dari newrelic atau lainnya untuk me-record error di sisi server (SSR) yang sudah production
		// Atau lakukan console log di sini lalu cek pada terminal kita untuk melakukan debug di sisi Server (SSR) secara local.
		// console.log('error', err);
		res.status(err.response.status || 500).json(
			err?.response?.data || { message: 'Internal Server Error' },
		);
	}
};

export default ssrApi;
