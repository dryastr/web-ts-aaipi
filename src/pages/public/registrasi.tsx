import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Link from 'next/link';
import RobotForm from 'src/components/robot/RobotForm';
import { registrationSSR } from 'src/service/public/registration';
import { listKlpSSR } from 'src/service/public/referensi/list-klp';
import FORM_TYPE from 'src/constants/FORM_TYPE';
import { string, number } from 'yup';
import useDarkMode from 'src/hooks/useDarkMode';
import PageWrapper from 'src/components/layout/PageWrapper/PageWrapper';
import Head from 'next/head';
import Logo from 'src/components/Logo';
import Icon from 'src/components/icon/Icon';
import Steps from 'src/components/Step';
import BgRegistrasi from 'public/images/Illustration-registrasi.svg';

const Registrasi: NextPage = () => {
	const router = useRouter();

	const { darkModeStatus } = useDarkMode();

	const onSubmitSuccess = async () => {
		router.push('/auth/login');
	};

	const [isKlpLainnya, setIsKlpLainnya] = useState(false);
	const [lastStep, setLastStep] = useState(0);
	const [activeStep, setActiveStep] = useState(0);
	const [payload, setPayload] = useState<any>({});

	let steps = [
		{
			step: 1,
			title: 'Organisasi',
			subtitle:
				'Silahkan pilih jenis instansi dan pilih instansi anda, dan upload surat permohonan dan SK dari instansi yang merujuk anda sebagai admin pengguna untuk instansi dengan surat resmi yang ditandatangani oleh pimpinan instansi.',
			form: [
				{
					type: FORM_TYPE.SELECT,
					name: 'ref_klp_id',
					label: 'Kementrian Lembaga / PEMDA (KLP)',
					grid: [12, 12, 12],
					validationSchema: isKlpLainnya
						? string()
						: string().required(`KLP wajib dipilih`),
					apiList: listKlpSSR,
					dataValue: 'id',
					dataLabel: 'nama',
					isHidden: isKlpLainnya,
					defaultValue: payload?.ref_klp_id || '',
					onChange: (e: any) => {
						setPayload({ ...payload, ref_klp_id: e.target.value });
					},
				},
				{
					type: FORM_TYPE.INPUT_TEXT,
					name: 'ref_klp_nama',
					label: 'Kementrian Lembaga / PEMDA (KLP)',
					grid: [12, 12, 12],
					validationSchema: isKlpLainnya
						? string().required('Nama KLP wajib diisi')
						: string(),
					isHidden: !isKlpLainnya,
					defaultValue: payload?.ref_klp_nama || '',
					onChange: (e: any) => {
						setPayload({ ...payload, ref_klp_nama: e.target.value });
					},
				},
				{
					type: FORM_TYPE.INPUT_TEXT,
					name: 'website',
					label: 'Website',
					grid: [12, 12, 12],
					validationSchema: isKlpLainnya
						? string().required('Website wajib diisi')
						: string(),
					isHidden: !isKlpLainnya,
					defaultValue: payload?.website || '',
					onChange: (e: any) => {
						setPayload({ ...payload, website: e.target.value });
					},
				},
				{
					type: FORM_TYPE.TEXT_AREA,
					name: 'alamat',
					label: 'Alamat',
					grid: [12, 12, 12],
					validationSchema: isKlpLainnya
						? string().required('Alamat wajib diisi')
						: string(),
					isHidden: !isKlpLainnya,
					defaultValue: payload?.alamat || '',
					onChange: (e: any) => {
						setPayload({ ...payload, alamat: e.target.value });
					},
				},
				{
					type: FORM_TYPE.CUSTOM,
					customTemplate: () => {
						return (
							<div
								className='text-center'
								style={{ justifyContent: 'center', flex: 1, display: 'flex' }}>
								<Icon icon='Help' color='dark' size='2x' />
								&nbsp;
								<b>
									<div
										style={{ cursor: 'pointer', paddingTop: 2 }}
										onClick={() => {
											setIsKlpLainnya(!isKlpLainnya);
											if (!isKlpLainnya) {
												setPayload({ ...payload, ref_klp_id: null });
											} else {
												setPayload({
													...payload,
													ref_klp_nama: null,
													website: null,
													alamat: null,
												});
											}
										}}>
										{isKlpLainnya
											? 'Sudah mempunyai KLP ? Klik disini untuk pilih data KLP.'
											: 'Tidak menemukan KLP Anda ? Klik disini untuk menambahkan secara manual.'}
									</div>
								</b>
							</div>
						);
					},
				},
				{
					type: FORM_TYPE.INPUT_FILE,
					name: 'file_surat_permohonan',
					label: 'Lampirkan Surat Permohonan',
					grid: [12, 12, 12],
					validationSchema: string(),
					defaultValue: payload?.file_surat_permohonan,
					onChange: (e: any) => {
						setPayload({ ...payload, file_surat_permohonan: e });
					},
				},
				{
					type: FORM_TYPE.SUBMIT,
					label: 'BERIKUTNYA',
					grid: [2, 12, 12],
					className: 'w-100 py-3 text-right',
					position: 'flex-row-reverse',
					// onClick: (values: any) => {
					// 	console.warn('asdf', values)
					// 	// setPayload({...payload, })
					// }
				},
			],
		},
		{
			step: 2,
			title: 'Data Pribadi',
			subtitle: 'Masukan Informasi',
			form: [
				{
					type: FORM_TYPE.INPUT_TEXT,
					name: 'nip',
					label: 'NIP',
					grid: [6, 6, 12],
					validationSchema: string().required(`NIP wajib diisi`),
					defaultValue: payload?.nip,
					onChange: (e: any) => {
						setPayload({ ...payload, nip: e.target.value });
					},
				},
				{
					type: FORM_TYPE.INPUT_TEXT,
					name: 'fullname',
					label: 'Nama Lengkap',
					grid: [6, 6, 12],
					validationSchema: string().required(`Nama Lengkap wajib diisi`),
					defaultValue: payload?.fullname,
					onChange: (e: any) => {
						setPayload({ ...payload, fullname: e.target.value });
					},
				},
				{
					type: FORM_TYPE.INPUT_TEXT,
					name: 'mobile',
					label: 'Nomor Handphone',
					grid: [6, 6, 12],
					validationSchema: number().required(`Nomor Handphone wajib diisi`),
					defaultValue: payload?.mobile,
					onChange: (e: any) => {
						setPayload({ ...payload, mobile: e.target.value });
					},
				},
				{
					type: FORM_TYPE.SUBMIT,
					label: 'BERIKUTNYA',
					grid: [2, 12, 12],
					className: 'w-100 py-3 text-right',
					position: 'flex-row-reverse',
				},
			],
		},
		{
			step: 3,
			title: 'Akses',
			subtitle: 'Atur Akses',
			form: [
				{
					type: FORM_TYPE.INPUT_TEXT,
					name: 'email',
					label: 'Email',
					grid: [6, 6, 12],
					validationSchema: string()
						.email('Email tidak valid')
						.required(`Email wajib diisi`),
					defaultValue: payload?.email,
					onChange: (e: any) => {
						setPayload({ ...payload, email: e.target.value });
					},
				},
				{
					type: FORM_TYPE.INPUT_PASSWORD,
					name: 'password',
					label: 'Password',
					grid: [6, 6, 12],
					validationSchema: string().required(`Password wajib diisi`),
					defaultValue: payload?.password,
					onChange: (e: any) => {
						setPayload({ ...payload, password: e.target.value });
					},
				},
				{
					type: FORM_TYPE.SUBMIT,
					label: 'SUBMIT',
					grid: [2, 12, 12],
					className: 'w-100 py-3 text-right',
					position: 'flex-row-reverse',
				},
			],
		},
	];

	// Setup Form Template

	return (
		<PageWrapper className={classNames({ 'bg-dark': false })}>
			<Head>
				<title>Telaah Sejawat | Registrasi</title>
			</Head>
			<motion.div
				// initial={{ opacity: 0, scale: 0.5 }}
				// animate={{ opacity: 1, scale: 1 }}
				// transition={{ duration: 0.05 }}
				initial={{ opacity: 0.5 }}
				animate={{ opacity: 1 }}
				className='row'
				style={{ height: '100%' }}>
				<div
					className='illustration-login'
					style={{ position: 'absolute', padding: 10, paddingLeft: 40, width: 200 }}>
					<Link
						href='/'
						className={classNames('text-decoration-none  fw-bold display-2', {
							'text-dark': !darkModeStatus,
							'text-light': darkModeStatus,
						})}>
						<Logo width={100} dark={true} />
					</Link>
				</div>
				<div
					className='col-xxl-3 col-xl-3 illustration-login'
					style={{
						backgroundImage: `url(${BgRegistrasi})`,
						backgroundSize: 'cover',
						height: 'auto',
						maxHeight: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				/>
				<div
					className='col-xxl-9 col-xl-9'
					style={{
						height: '100%',
						display: 'flex',
						paddingTop: 50,
						paddingLeft: 50,
					}}>
					<div style={{ maxWidth: '90%', minWidth: '90%' }}>
						<div
							className='text-left'
							style={{
								display: 'flex',
								flex: 1,
								justifyContent: 'flex-start',
								marginBottom: 30,
							}}>
							<Icon icon='NavigateBefore' color='dark' size='2x' />
							<h5 style={{ marginTop: 2 }}>
								<Link href='/auth/login'>Kembali Login</Link>
							</h5>
						</div>

						<Steps
							lastStep={lastStep}
							activeStep={activeStep}
							data={[
								{
									step: 1,
									title: 'Organisasi',
									subtitle: 'Masukan detail organisasi',
									icon: 'CorporateFare',
								},
								{
									step: 2,
									title: 'Data Pribadi',
									subtitle: 'Masukan informasi',
									icon: 'People',
								},
								{
									step: 3,
									title: 'Akses',
									subtitle: 'Atur akses',
									icon: 'Lock',
								},
							]}
							onClick={(index: any) => {
								setActiveStep(index);
							}}
						/>
						<hr className='hr hr-blurry' />

						<div>
							<div className='h5 fw-bold mt-5'>{steps[activeStep].title}</div>
							<div className='h6 text-muted mb-5'>{steps[activeStep].subtitle}</div>
						</div>

						<RobotForm
							payload={payload}
							type='component'
							form={steps[activeStep].form}
							withoutHitApi={steps.length - 1 !== activeStep}
							apiSubmit={registrationSSR}
							onSubmitForm={(values: any) => {
								if (steps.length - 1 !== activeStep) {
									setActiveStep(activeStep + 1);
									setLastStep(activeStep + 1);
								}
							}}
							onSubmitSuccess={onSubmitSuccess}
						/>
					</div>
				</div>
			</motion.div>
		</PageWrapper>
	);
};

export default Registrasi;
