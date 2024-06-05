import axios from 'axios';
import { logout } from 'src/service/auth/auth';
import { toast } from 'react-toastify';
import { encryptURL } from './crypt';

const axiosDefaultHeader = {
	Accept: 'application/json',
};

// Membuat instance Axios dengan konfigurasi default
const request = axios.create({
	headers: axiosDefaultHeader,
});

// Intercept permintaan sebelum dikirim
request.interceptors.request.use(
	async (config: any) => {
		// Modifikasi config permintaan jika diperlukan
		// Contoh: Menambahkan header otentikasi
		// config.headers['Authorization'] = 'Bearer {token}';

		if (typeof window !== 'undefined') {
			if (config.data) {
				// Mendeteksi apakah ada input file dalam body permintaan
				const hasFile = Object.values(config.data).some((value) => value instanceof File);

				// Mengatur header Content-Type sesuai dengan adanya input file
				if (hasFile) {
					config.headers['Content-Type'] = 'multipart/form-data';
				} else {
					config.headers['Content-Type'] = 'application/json';
				}
			}

			// Encrypt params
			const segments = config?.url?.split('/') || [];
			const lastSegment = segments?.[segments.length - 1];
			if (/^-?\d+(\.\d+)?$/.test(lastSegment)) {
				const idSegment = await encryptURL(lastSegment);
				segments[segments.length - 1] = idSegment;
				config.url = segments.join('/');
				config.headers['decrypt-id'] = true;
			} else if (['approve', 'reject', 'set-active'].includes(lastSegment)) {
				config.headers['decrypt-id'] = true;
			}
		}

		return config;
	},
	(error: any) => {
		// Tangani kesalahan yang terjadi saat mengintersep request / permintaan
		return Promise.reject(error);
	},
);

// Intercept respons sebelum digunakan
request.interceptors.response.use(
	(response: any) => {
		// Modifikasi respons jika diperlukan sebelum digunakan
		// Contoh: Mengambil data respons
		// const data = response.data;

		return response?.data;
	},
	async (error: any) => {
		if (typeof window !== 'undefined') {
			if (error?.response?.data?.message) {
				toast.error(error?.response?.data?.message, {
					hideProgressBar: true,
					theme: 'colored',
				});
			}
			if (error?.response?.status === 401) {
				await logout();
				window.location.href = '/auth/login';
			}
		}
		// Tangani kesalahan yang terjadi saat mengintersep response
		return Promise.reject(error);
	},
);

export default request;
