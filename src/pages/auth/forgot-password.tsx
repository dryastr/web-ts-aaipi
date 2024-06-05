import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Link from 'next/link';
import RobotForm from 'src/components/robot/RobotForm';
import { forgotPasswordSSR } from 'src/service/public/forgot-password';
import FORM_TYPE from 'src/constants/FORM_TYPE';
import { string } from 'yup';
import useDarkMode from 'src/hooks/useDarkMode';
import PageWrapper from 'src/components/layout/PageWrapper/PageWrapper';
import Head from 'next/head';
import Logo from 'src/components/Logo';
import BgLogin from 'public/images/Illustration-reset-password.svg';
import Icon from 'src/components/icon/Icon';

const ForgotPassword: NextPage = () => {
	const router = useRouter();
	const [email, setEmail] = useState('');

	const { darkModeStatus } = useDarkMode();

	const onSubmitSuccess = async () => {
		router.push(`/auth/email/${email}`);
	};

	// Setup Form Template
	const form = [
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'email',
			label: 'Email',
			grid: [12],
			validationSchema: string().required(`Email wajib diisi`).email('Email tidak valid'),
			onChange: (e: any) => {
				setEmail(e.target.value);
			},
		},
		{
			type: FORM_TYPE.SUBMIT,
			label: 'KIRIM LINK',
			grid: [12],
			className: 'w-100 py-3',
		},
		{
			type: FORM_TYPE.CUSTOM,
			customTemplate: (
				<div
					className='text-center p-3'
					style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
					<Icon icon='NavigateBefore' color='dark' size='2x' />
					<h5 style={{ marginTop: 2 }}>
						<Link href='/auth/login'>Kembali Login</Link>
					</h5>
				</div>
			),
		},
	];

	return (
		<PageWrapper className={classNames({ 'bg-dark': false })}>
			<Head>
				<title>Telaah Sejawat | Lupa Sandi</title>
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
								<Logo width={200} dark />
							</Link>
						</div>

						<div>
							<div className='text-center h5 fw-bold mt-5'>Lupa kata sandi ? 🔐</div>
							<div className='text-center h6 text-muted mb-5'>
								Kirim link atur ulang kata sandi anda.
							</div>
						</div>

						<RobotForm
							type='component'
							form={form}
							apiSubmit={forgotPasswordSSR}
							onSubmitSuccess={onSubmitSuccess}
						/>
					</div>
				</div>
			</motion.div>
		</PageWrapper>
	);
};

export default ForgotPassword;
