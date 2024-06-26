import React from 'react';
import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => {
	return (
		<Html>
			<Head>
				<link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
				<link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
				<link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
				<link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
				<meta name='msapplication-TileColor' content='#da532c' />
				<meta name='theme-color' content='#ffffff' />
			</Head>
			<body className='modern-design subheader-enabled'>
				<Main />
				<div id='portal-root' />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
