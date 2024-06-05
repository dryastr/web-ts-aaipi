import React from 'react';
import Head from 'next/head';
import 'src/styles/styles.scss';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'react-jss';
import { ToastContainer } from 'react-toastify';
import { TourProvider } from '@reactour/tour';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-toastify/dist/ReactToastify.css';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { GeneralContextProvider } from 'src/context/generalContext';
import { ThemeContextProvider } from 'src/context/themeContext';
import useDarkMode from 'src/hooks/useDarkMode';
import COLORS from 'src/common-template/data/enumColors';
import { getOS } from 'src/common-template/helpers';
import steps, { styles } from 'src/steps';
import Wrapper from 'src/components/layout/Wrapper/Wrapper';
import App from 'src/components/layout/App/App';
import AsideRoutes from 'src/components/layout/Aside/AsideRoutes';
import { ToastCloseButton } from 'src/components/bootstrap/Toasts';
import ModalPage from 'src/components/bootstrap/ModalPage';

import Router from 'next/router';
import NProgress from 'nprogress'; // nprogress module

// Route Events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
	getOS();

	/**
	 * Dark Mode
	 */
	const { themeStatus } = useDarkMode();
	const theme = {
		theme: themeStatus,
		primary: COLORS.PRIMARY.code,
		secondary: COLORS.SECONDARY.code,
		success: COLORS.SUCCESS.code,
		info: COLORS.INFO.code,
		warning: COLORS.WARNING.code,
		danger: COLORS.DANGER.code,
		dark: COLORS.DARK.code,
		light: COLORS.LIGHT.code,
	};

	return (
		<QueryClientProvider client={queryClient}>
			<GeneralContextProvider>
				<ThemeContextProvider>
					<ThemeProvider theme={theme}>
						<TourProvider
							steps={steps}
							styles={styles}
							showNavigation={false}
							showBadge={false}>
							<App>
								<AsideRoutes />
								<Wrapper>
									<Head>
										<title>Telaah Sejawat</title>
									</Head>
									<Component {...pageProps} />

									<ModalPage />
								</Wrapper>
							</App>
							<ToastContainer
								closeButton={ToastCloseButton}
								toastClassName='toast show'
							/>
						</TourProvider>
					</ThemeProvider>
				</ThemeContextProvider>
			</GeneralContextProvider>
			{/* <ReactQueryDevtools initialIsOpen={false} /> */}
		</QueryClientProvider>
	);
};

export default MyApp;
