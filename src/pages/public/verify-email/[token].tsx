import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import Link from 'next/link';
import RobotForm from 'src/components/robot/RobotForm';
import { emailVerificationSSR } from 'src/service/public/email-verification';
import FORM_TYPE from 'src/constants/FORM_TYPE';
import useDarkMode from 'src/hooks/useDarkMode';
import PageWrapper from 'src/components/layout/PageWrapper/PageWrapper';
import Head from 'next/head';
import Logo from 'src/components/Logo';
import Icon from 'src/components/icon/Icon';
import BgLogin from 'public/images/Illustration-reset-password.svg'

const Page: NextPage = () => {
	const router = useRouter();
	const { token, email } = router.query;

	const { darkModeStatus } = useDarkMode();
	const [isVerified, setIsVerified] = useState(false);

	const { data } = useQuery({
		queryKey: ['email-verification'],
		queryFn: () => emailVerificationSSR({
			email: email,
			email_verify_key: token,
		}),
		enabled: token !== undefined,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (data?.data?.is_verified) {
			setIsVerified(true)
		}
	}, [data])

	// Setup Form Template
	const form = [
		{
			type: FORM_TYPE.BUTTON,
			label: 'MASUK KE AKUN SAYA',
			grid: [12],
			className: 'w-100 py-3',
			onClick: () => {
				router.push('/');
			}
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
				className='row' style={{ height: '100%' }}
			>
				<div className='illustration-login' style={{ position: 'absolute', padding: 10, paddingLeft: 40 }}>
					<Link
						href='/'
						className={classNames(
							'text-decoration-none  fw-bold display-2',
							{
								'text-dark': !darkModeStatus,
								'text-light': darkModeStatus,
							},
						)}>
						<Logo width={100} dark={true} />
					</Link>
				</div>
				<div className='col-xxl-8 col-xl-8 illustration-login' style={{
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
				}} />
				<div className='col-xxl-4 col-xl-4' style={{
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
					<div style={{ maxWidth: '90%', minWidth: '90%' }}>
						<div className='illustration-login-logo text-center my-5'>
							<Link
								href='/'
								className={classNames(
									'text-decoration-none  fw-bold display-2',
									{
										'text-dark': !darkModeStatus,
										'text-light': darkModeStatus,
									},
								)}>
								<Logo width={200} dark={true} />
							</Link>
						</div>

						{
							isVerified ? (
								<>
									<div className='text-center'>
										<Icon icon='VerifiedUser' color='success' size='8x' />
									</div>

									<div>
										<div className='text-center h5 fw-bold mt-5'>Email sudah terverifikasi</div>
									</div>

									<div style={{ marginTop: 20 }}>
										<div className='text-center h6 text-muted mb-5'>
											Email anda {email} sudah terverifikasi. Klik dibawah untuk melanjutkan.
										</div>
									</div>
								</>
							) : (
								<>
									<div className='text-center'>
										<Icon icon='CheckCircle' color='success' size='8x' />
									</div>

									<div>
										<div className='text-center h5 fw-bold mt-5'>Email berhasil di verifikasi</div>
									</div>

									<div style={{ marginTop: 20 }}>
										<div className='text-center h6 text-muted mb-5'>
											Email anda {email} sekarang terverifikasi. Klik dibawah untuk melanjutkan.
										</div>
									</div>
								</>
							)
						}

						<RobotForm
							type='component'
							form={form}
							withoutHitApi={true}
						/>
					</div>
				</div>
			</motion.div>
		</PageWrapper>
	);
};

export default Page;
