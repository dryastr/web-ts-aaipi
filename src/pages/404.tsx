import React from 'react';
import Head from 'next/head';
import PageWrapper from 'src/components/layout/PageWrapper/PageWrapper';
import Page from 'src/components/layout/Page/Page';
import Button from 'src/components/bootstrap/Button';
import Humans from 'src/assets/img/scene4.png';
import { nonAuthPagesMenu } from 'src/menu';

const Page404 = () => {
	return (
		<PageWrapper>
			<Head>
				<title>{nonAuthPagesMenu.page404.text}</title>
			</Head>
			<Page>
				<div className='row d-flex align-items-center h-100'>
					<div className='col-12 d-flex flex-column justify-content-center align-items-center'>
						<div
							className='text-primary fw-bold'
							style={{ fontSize: 'calc(3rem + 3vw)' }}>
							404
						</div>
						<div
							className='text-dark fw-bold'
							style={{ fontSize: 'calc(1.5rem + 1.5vw)' }}>
							Page not found
						</div>
					</div>
					<div className='col-12 d-flex align-items-baseline justify-content-center'>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src={Humans} alt='Humans' style={{ height: '50vh' }} />
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

export default Page404;
