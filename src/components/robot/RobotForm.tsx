import React, { FC, useEffect } from 'react';
import { object } from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import FORM_TYPE from 'src/constants/FORM_TYPE';
import { RobotType } from 'src/type/robot-type';
import Head from 'next/head';
import Button from 'src/components/bootstrap/Button';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from 'src/components/bootstrap/Card';
import PageWrapper from 'src/components/layout/PageWrapper/PageWrapper';
import Page from 'src/components/layout/Page/Page';
import { useQuery } from '@tanstack/react-query';
import useDarkMode from 'src/hooks/useDarkMode';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import Spinner from 'src/components/bootstrap/Spinner';
import { decryptURL } from 'src/utils/crypt';
import useCheckPermission from 'src/hooks/useCheckPermission';

import InputForm from './InputForm';
import Page403 from '../error/403';

interface RobotFormType {
	/**
	 * Props "title" digunakan untuk memberikan judul pada page RobotForm.
	 */
	title?: string;
	/**
	 * Props "type" digunakan untuk menyetel jenis RobotForm apakah mau RobotForm yang berjenis "component" atau RobotForm yang berjenis "page".
	 *
	 * Perbedaannya jika berjenis "page" maka RobotForm akan merender template mulai dari Header, Sidebar, Input Form sampai ke Footer.
	 *
	 * Tetapi jika berjenis "component" maka RobotForm hanya akan merender component Input Form nya saja.
	 */
	type: RobotType;
	/**
	 * Props "id" digunakan untuk mendapatkan detail data dari API BE.
	 *
	 * Jadi jika kita menambahkan id pada RobotForm maka template input yang ada di dalam RobotForm akan otomatis terisi berdasarkan id nya.
	 */
	id?: any;
	/**
	 * Props "apiShow" digunakan untuk memanggil detail data API.
	 *
	 * Jika kita menggunakan props "apiShow" maka kita wajib menggunakan props "id" untuk mendapatkan detail datanya.
	 *
	 * Nanti detail datanya bisa ditempelkan ke input RobotForm.
	 */
	apiShow?: (id?: any) => Promise<AxiosResponse<any, any>>;
	/**
	 * Props "form" digunakan untuk menyetel tampilan form nya. Contoh kita bisa memasukkan input Text, input Select dan input lainnya di props "form" ini.
	 *
	 * Berikut adalah contoh sederhana script "form":
	 * @example
	 *const form = [
	 *		{
	 *			type: formType.INPUT_TEXT,
	 *			name: 'username',
	 *			label: 'Email',
	 *			grid: [12],
	 *			validationSchema: string()
	 *				.required('Email wajib diisi')
	 *				.email('Format email salah'),
	 *		},
	 *		{
	 *			type: formType.INPUT_PASSWORD, // Ini adalah input type nya. Bisa input type Text, Password, Select dan lain-lain.
	 *			name: 'password', // Ini adalah input name nya
	 *			label: 'Password', // Ini adalah labelnya
	 *			grid: [12], // Ini adalah gridnya. [12] artinya lebar input ini adalah col-12 (Untuk seluruh ukuran layar). Lalu jika [12, 6, 3] ini artinya lebar versi desktop adalah col-12, lebar versi tablet adalah col-6, dan lebar versi mobile adalah col-3
	 *			validationSchema: string().required('Password wajib diisi'), // ini adalah script untuk mem-validasi input form kita, seperti required, email format dan lain-lain. Untuk validasi form kita menggunakan yup validation
	 *		},
	 *];
	 */
	form?: any[];
	/**
	 * Props "apiSubmit" digunakan untuk memanggil "API Simpan Data" ketika kita mengklik tombol submit.
	 */
	apiSubmit?: (data: any, id?: any) => Promise<AxiosResponse<any, any>> | any;
	/**
	 * Props "onSubmitSuccess" berisi sebuah fungsi yang akan dipanggil ketika Proses simpan data ke API BE nya berhasil.
	 */
	onSubmitSuccess?: any;
	/**
	 * Props "onSubmitError" berisi sebuah fungsi yang akan dipanggil ketika Proses simpan data ke API BE nya gagal.
	 */
	onSubmitError?: any;
	/**
	 * Props "className" digunakan untuk menyetel className pada form utama di RobotForm.
	 */
	className?: string;
	/**
	 * Props "messageSuccess" digunakan untuk menyetel atau meng-custom pesan ketika proses simpan data nya berhasil.
	 */
	// messageSuccess?: string;
	/**
	 * Props "messageError" digunakan untuk menyetel atau meng-custom pesan ketika proses simpan data nya gagal.
	 */
	// messageError?: string;
	withoutHitApi?: boolean;
	onSubmitForm?: any;
	payload?: any;
	responseBE?: any;
	isHiddenBtnBack?: boolean;
}

const RobotForm: FC<RobotFormType> = ({
	title,
	type,
	id,
	apiShow,
	form,
	apiSubmit,
	onSubmitSuccess,
	onSubmitError,
	onSubmitForm,
	className,
	withoutHitApi,
	payload,
	responseBE,
	isHiddenBtnBack,
	// messageSuccess,
	// messageError,
}) => {
	const router = useRouter();
	const { darkModeStatus } = useDarkMode();
	const initialValues = form?.reduce(
		(accumulator, value) =>
			value?.type !== FORM_TYPE.BUTTON && value?.type !== FORM_TYPE.SUBMIT
				? {
						...accumulator,
						[value.name?.split('[').shift()]:
							typeof value.defaultValue !== 'function' &&
							typeof value.defaultValue !== 'undefined'
								? value.defaultValue
								: '',
					}
				: { ...accumulator },
		{},
	);

	const checkPermission = useCheckPermission();

	const validationSchema = object().shape(
		form?.reduce(
			(accumulator, value) =>
				value?.type !== FORM_TYPE.BUTTON && value?.type !== FORM_TYPE.SUBMIT
					? {
							...accumulator,
							[value.name?.split('[').shift()]:
								router.query.view_and_edit === 'view'
									? ''
									: value?.validationSchema,
						}
					: { ...accumulator },
			{},
		),
	);

	const removeLastURL = () => {
		const theArr = router.asPath.split('/');
		theArr.pop();
		if (id) theArr.pop();
		router.push(theArr.join('/'));
	};

	const { isLoading, error, data, isFetched }: any = useQuery({
		queryKey: [title, id],
		queryFn: async () => apiShow?.(id ? await decryptURL(id) : ''),
		refetchOnWindowFocus: false,
		enabled: typeof apiShow === 'function',
	});

	const formik = useFormik({
		enableReinitialize: true,
		initialValues,
		validationSchema,
		validateOnChange: false,
		onSubmit: async (values) => {
			if (!withoutHitApi) {
				let body = values;
				if (payload) {
					body = { ...body, ...payload };
				}
				await apiSubmit?.(body, data?.data?.id)
					.then((response: any) => {
						toast.success(response?.message, {
							hideProgressBar: true,
							theme: 'colored',
						});
						if (onSubmitSuccess) {
							onSubmitSuccess({ router, response });
						} else {
							removeLastURL();
						}
					})
					.catch(async (err: any) => {
						if (err?.response?.status === 422) {
							const dataError = err?.response?.data?.errors;
							// Menempelkan pesan kesalahan ke input
							Object.keys(dataError).reduce((acc, field) => {
								formik.setFieldError(field, dataError[field][0]);
								return false;
							}, {});
						}
						onSubmitError?.(err?.response);
					});
			} else {
				onSubmitForm(values);
			}
		},
	});

	useEffect(() => {
		if (isFetched === true) {
			form?.map((value: any) => {
				if (value?.type !== FORM_TYPE.BUTTON && value?.type !== FORM_TYPE.SUBMIT) {
					formik.setFieldValue(
						value?.name,
						value?.defaultValue?.({ responseBE: data?.data }) || '',
					);
				}
				return false;
			});

			if (data.data && responseBE) {
				responseBE(data.data);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isFetched]);

	// const removeLastURL = () => {
	// 	const theArr = router.asPath.split('/');
	// 	theArr.pop();
	// 	router.push(theArr.join('/'));
	// };

	if (error) {
		return 'error RB';
	}

	if (type === 'component') {
		return (
			<div className={className}>
				<form className='row g-4'>
					<InputForm
						form={form || []}
						formik={formik}
						responseBE={data?.data}
						readOnly={router.query.view_and_edit === 'view'}
						darkModeStatus={darkModeStatus}
						checkPermission={checkPermission}
					/>
				</form>
			</div>
		);
	}
	if (
		type === 'page' &&
		((router.asPath.includes('/view') && checkPermission('View') === true) ||
			(router.asPath.includes('/edit') && checkPermission('Edit') === true) ||
			(router.asPath.includes('/add') && checkPermission('Create') === true)) ||
			router.asPath.includes('/profile')
	) {
		let titleType = '';
		if (router.asPath.includes('/add')) {
			titleType = 'Tambah';
		} else if (router.asPath.includes('/edit')) {
			titleType = 'Ubah';
		} else if (router.asPath.includes('/view')) {
			titleType = 'Detail';
		}
		return (
			<PageWrapper>
				<Head>
					<title>Telaah Sejawat | {`${titleType} ${title}`}</title>
				</Head>
				<Page container='fluid'>
					<div className={className}>
						<Card stretch>
							<CardHeader
								borderSize={3}
								borderColor={darkModeStatus ? 'dark' : 'light'}>
								<CardLabel iconColor='warning'>
									<CardTitle tag='h4' className='h4 mb-0 pb-0'>
										{`${titleType} ${title}`}
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								{isLoading ? (
									'Loading'
								) : (
									<form className='row g-4'>
										<InputForm
											form={form || []}
											formik={formik}
											responseBE={data?.data}
											readOnly={router.query.view_and_edit === 'view'}
											darkModeStatus={darkModeStatus}
											checkPermission={checkPermission}
										/>
										<div className='col-12 d-flex gap-2'>
											{
												!isHiddenBtnBack && (
													<Button
														onClick={removeLastURL}
														color='danger'
														className='px-4'>
														KEMBALI
													</Button>
												)
											}
											{router.query.view_and_edit !== 'view' && (
												<>
													<Button
														onClick={formik.handleSubmit}
														color='primary'
														className='px-4'>
														{formik.isSubmitting ? (
															<Spinner isSmall inButton />
														) : (
															<>SIMPAN</>
														)}
													</Button>
													<Button
														onClick={formik.handleReset}
														color='light'
														className='px-4'>
														RESET
													</Button>
												</>
											)}
										</div>
									</form>
								)}
							</CardBody>
						</Card>
					</div>
				</Page>
			</PageWrapper>
		);
	}
	if (checkPermission() === 'loading') {
		return 'Loading...';
	}
	return <Page403 />;
};

export default RobotForm;
