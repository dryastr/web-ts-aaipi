import React from 'react';
import Head from 'next/head';
import PageWrapper from 'src/components/layout/PageWrapper/PageWrapper';
import Page from 'src/components/layout/Page/Page';
import Button from 'src/components/bootstrap/Button';
import Humans from 'src/assets/img/scene4.png';

const Page403 = () => {
	return (
		<PageWrapper>
			<Head>
				<title>Telaah Sejawat | Tidak memiliki izin akses</title>
			</Head>
			<Page>
				<div className='row d-flex align-items-center h-100'>
					<div className='col-12 d-flex flex-column justify-content-center align-items-center'>
						<div
							className='text-primary fw-bold'
							style={{ fontSize: 'calc(3rem + 3vw)' }}>
							403
						</div>
						<div
							className='text-dark fw-bold'
							style={{ fontSize: 'calc(1.5rem + 1.5vw)' }}>
							Kamu tidak memiliki izin akses.
						</div>
					</div>
					<div className='col-12 d-flex flex-column justify-content-center align-items-center'>
						<Button
							className='px-5 py-3'
							color='primary'
							isLight
							icon='HolidayVillage'
							tag='a'
							href='/'>
							Homepage
						</Button>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default Page403;
