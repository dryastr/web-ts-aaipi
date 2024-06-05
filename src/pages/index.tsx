import React, { useContext, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useTour } from '@reactour/tour';
import PageWrapper from 'src/components/layout/PageWrapper/PageWrapper';
import ThemeContext from 'src/context/themeContext';
import Page from 'src/components/layout/Page/Page';
import CommonDashboardAlert from 'src/common-template/partial/CommonDashboardAlert';
import CommonDashboardUserCard from 'src/common-template/partial/CommonDashboardUserCard';
import CommonDashboardRecentActivities from 'src/common-template/partial/CommonDashboardRecentActivities';
import CommonDashboardUserIssue from 'src/common-template/partial/CommonDashboardUserIssue';
import CommonDashboardSalesByStore from 'src/common-template/partial/CommonDashboardSalesByStore';
import CommonDashboardWaitingAnswer from 'src/common-template/partial/CommonDashboardWaitingAnswer';
import CommonDashboardTopSeller from 'src/common-template/partial/CommonDashboardTopSeller';
import CommonMyWallet from 'src/common-template/partial/CommonMyWallet';

const Index: NextPage = () => {
	const { mobileDesign } = useContext(ThemeContext);
	/**
	 * Tour Start
	 */
	const { setIsOpen } = useTour();
	useEffect(() => {
		if (
			typeof window !== 'undefined' &&
			localStorage.getItem('tourModalStarted') !== 'shown' &&
			!mobileDesign
		) {
			setTimeout(() => {
				setIsOpen(true);
				localStorage.setItem('tourModalStarted', 'shown');
			}, 3000);
		}
		return () => {};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// const { themeStatus } = useDarkMode();

	// const [activeTab, setActiveTab] = useState<TTabs>(TABS.YEARLY);

	return (
		<PageWrapper>
			<Head>
				<title>Dashboard</title>
			</Head>
			<Page container='fluid'>
				<div className='row'>
					<div className='col-12'>
						<CommonDashboardAlert />
					</div>

					<div className='col-xl-4'>
						<CommonDashboardUserCard />
					</div>
					<div className='col-xxl-3'>
						<CommonDashboardRecentActivities />
					</div>
					<div className='col-xxl-3'>
						<CommonDashboardUserIssue />
					</div>

					<div className='col-xxl-8'>
						<CommonDashboardSalesByStore />
					</div>
					<div className='col-xxl-4 col-xl-6'>
						<CommonDashboardWaitingAnswer />
					</div>

					<div className='col-xxl-4 col-xl-6'>
						<CommonMyWallet />
					</div>
					<div className='col-xxl-8'>
						<CommonDashboardTopSeller />
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default Index;
