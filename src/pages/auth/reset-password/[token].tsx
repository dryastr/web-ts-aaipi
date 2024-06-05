import React from 'react';
import { motion } from 'framer-motion';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Link from 'next/link';
import RobotForm from 'src/components/robot/RobotForm';
import { resetPasswordSSR } from 'src/service/public/reset-password';
import FORM_TYPE from 'src/constants/FORM_TYPE';
import { string } from 'yup';
import useDarkMode from 'src/hooks/useDarkMode';
import PageWrapper from 'src/components/layout/PageWrapper/PageWrapper';
import Head from 'next/head';
import Logo from 'src/components/Logo';
import BgLogin from 'public/images/Illustration-reset-password.svg';

const ResetPassword: NextPage = () => {
	const router = useRouter();
	const { token, email } = router.query;

	const { darkModeStatus } = useDarkMode();

	const onSubmitSuccess = async () => {
		router.push('/auth/login');
	};

	// Setup Form Template
	const form = [
		{
			type: FORM_TYPE.INPUT_PASSWORD,
			name: 'password',
			label: 'Kata sandi baru',
			grid: [12],
			validationSchema: string().required(`Kata sandi wajib diisi`),
		},
		{
			type: FORM_TYPE.INPUT_PASSWORD,
			name: 'password_confirmation',
			label: 'Konfirmasi kata sandi',
			grid: [12],
			validationSchema: string().required(`Konfirmasi kata sandi wajib diisi`),
		},
		{
			type: FORM_TYPE.SUBMIT,
			label: 'ATUR KATA SANDI BARU',
			grid: [12],
			className: 'w-100 py-3',
		},
	];

	return (
		<PageWrapper className={classNames({ 'bg-dark': false })}>
			<Head>
				<title>Telaah Sejawat | Atur Ulang Sandi</title>
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
					style={{ position: 'absolute', padding: 10, paddingLeft: 40 }}>
					<Link
						href='/'
						className={classNames('text-decoration-none  fw-bold display-2', {
							'text-dark': !darkModeStatus,
							'text-light': darkModeStatus,
						})}>
						<Logo width={100} />
					</Link>
				</div>
				<div
					className='col-xxl-8 col-xl-8 illustration-login'
					style={{
						backgroundColor: '#f8f8f8',
						backgroundImage: `url(${BgLogin})`,
						backgroundSize: 'auto',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center',
						height: 'auto',
						maxHeight: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				/>
				<div
					className='col-xxl-4 col-xl-4'
					style={{
						height: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<div style={{ maxWidth: '90%', minWidth: '90%' }}>
						<div className='illustration-login-logo text-center my-5'>
							<Link
								href='/'
								className={classNames('text-decoration-none  fw-bold display-2', {
									'text-dark': !darkModeStatus,
									'text-light': darkModeStatus,
								})}>
								<Logo width={200} dark />
							</Link>
						</div>

						<div>
							<div className='text-center h5 fw-bold mt-5'>
								Atur ulang kata sandi 🔐
							</div>
							<div className='text-center h6 text-muted mb-5'>
								Kata sandi baru Anda harus berbeda dengan kata sandi yang sekarang
							</div>
						</div>

						<RobotForm
							type='component'
							payload={{
								email,
								token,
							}}
							form={form}
							apiSubmit={resetPasswordSSR}
							onSubmitSuccess={onSubmitSuccess}
						/>
					</div>
				</div>
			</motion.div>
		</PageWrapper>
	);
};

export default ResetPassword;
