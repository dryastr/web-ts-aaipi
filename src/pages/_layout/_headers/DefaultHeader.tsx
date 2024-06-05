import React, { useContext, useEffect, useState } from 'react';
import Header, { HeaderLeft } from 'src/components/layout/Header/Header';
import Breadcrumb from 'src/components/bootstrap/Breadcrumb';
import { useRouter } from 'next/router';
import ThemeContext from 'src/context/themeContext';
// import { myProfile } from 'src/service/user';
// import { useQuery } from '@tanstack/react-query';

import CommonHeaderRight from './CommonHeaderRight';

const DynamicBreadCrubms = () => {
	const router = useRouter();
	const { breadcrumbs } = useContext(ThemeContext);
	const currentSegment = router.asPath
		.replace(/\/edit\/.+$/, '')
		.replace(/\/view\/.+$/, '')
		.replace('/add', '');
	const [final, setFinal] = useState([]);

	useEffect(() => {
		if (breadcrumbs !== null) {
			const setBreadCrumbsTemplate = async () => {
				const finalData: any = await breadcrumbs[currentSegment]?.breadcrumbs?.map(
					(item: any) => {
						return {
							title: item,
							to: currentSegment,
						};
					},
				);
				if (finalData && router.asPath.includes('/edit/')) {
					finalData.push({ title: 'Ubah', to: '' });
				}
				if (finalData && router.asPath.includes('/view/')) {
					finalData.push({ title: 'Detail', to: '' });
				}
				if (finalData && router.asPath.includes('/add')) {
					finalData.push({ title: 'Tambah', to: '' });
				}
				if (finalData) {
					setFinal(finalData);
				}
			};

			setBreadCrumbsTemplate();
		}
	}, [breadcrumbs, currentSegment, router.asPath]);

	if (breadcrumbs !== null) {
		return (
			<Breadcrumb
				list={
					// @ts-ignore
					breadcrumbs[currentSegment]?.breadcrumbs ? final : []
				}
			/>
		);
	}
	return null;
};

const DefaultHeader = () => {
	// const { isLoading, isFetched, data } = useQuery({
	// 	queryKey: ['my-profile'],
	// 	queryFn: myProfile,
	// 	refetchOnWindowFocus: false,
	// });
	// console.warn(isLoading, isFetched, data);

	return (
		<Header>
			<HeaderLeft>
				<DynamicBreadCrubms />
			</HeaderLeft>
			<CommonHeaderRight />
		</Header>
	);
};

export default DefaultHeader;
