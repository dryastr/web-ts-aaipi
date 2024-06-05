import React from 'react';
import { motion } from 'framer-motion';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Link from 'next/link';
import RobotForm from 'src/components/robot/RobotForm';
import { forgotPasswordSSR } from 'src/service/public/forgot-password';
import FORM_TYPE from 'src/constants/FORM_TYPE';
import useDarkMode from 'src/hooks/useDarkMode';
import PageWrapper from 'src/components/layout/PageWrapper/PageWrapper';
import Head from 'next/head';
import Logo from 'src/components/Logo';
import BgLogin from 'public/images/Illustration-email.svg';
import Button from 'src/components/bootstrap/Button';

const ForgotPassword: NextPage = () => {
	const router = useRouter();
	const { email } = router.query;

	const { darkModeStatus } = useDarkMode();

	const emailResend = () => {
		return (
			<div className='text-center p-3' id='picker'>
				<h5>
					Tidak Menerima Email? <Button onClick={() => {}}>kirim ulang</Button>
				</h5>
			</div>
		);
	};

	// Setup Form Template
	const form = [
		{
			type: FORM_TYPE.BUTTON,
			label: 'LEWATI UNTUK SAAT INI',
			grid: [12],
			className: 'w-100 py-3',
			onClick: () => {
				router.push('/auth/login');
			},
		},
		{
			type: FORM_TYPE.CUSTOM,
			customTemplate: emailResend,
		},
	];

	return (
		<PageWrapper className={classNames({ 'bg-dark': false })}>
			<Head>
				<title>Telaah Sejawat | Verifikasi Email Terkirim</title>
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
						<Logo width={100} dark />
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
								<Logo width={200} />
							</Link>
						</div>

						<div>
							<div className='text-center h5 fw-bold mt-5'>
								Verifikasi Email Anda ✉️
							</div>
						</div>

						<div style={{ marginTop: 20 }}>
							<div className='text-center h6 text-muted mb-5'>
								Tautan aktivasi akun dikirim ke alamat email Anda: <b>{email}</b>{' '}
								Silakan ikuti tautan di dalam untuk melanjutkan.
							</div>
						</div>

						<RobotForm type='component' form={form} apiSubmit={forgotPasswordSSR} />
					</div>
				</div>
			</motion.div>
		</PageWrapper>
	);
};

export default ForgotPassword;
