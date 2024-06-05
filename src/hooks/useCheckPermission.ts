import { useRouter } from 'next/router';
import { useContext } from 'react';
import ThemeContext from 'src/context/themeContext';

const useCheckPermission = () => {
	const router = useRouter();
	const { breadcrumbs } = useContext(ThemeContext);
	const currentSegment = router.asPath
		.replace(/\/edit\/.+$/, '')
		.replace(/\/view\/.+$/, '')
		.replace('/add', '');

	if (breadcrumbs === null) {
		return () => {
			return 'loading';
		};
	}
	return (permission?: any) => {
		return JSON.stringify(breadcrumbs[currentSegment]?.permissions)?.includes(permission);
	};
};

export default useCheckPermission;
