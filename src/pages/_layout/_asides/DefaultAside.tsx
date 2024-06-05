import React, { useContext, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Brand from 'src/components/layout/Brand/Brand';
import { pageLayoutTypesPagesMenu } from 'src/menu';
import ThemeContext from 'src/context/themeContext';
import GeneralContext from 'src/context/generalContext';
import Aside, { AsideBody, AsideFoot, AsideHead } from 'src/components/layout/Aside/Aside';
import Icon from 'src/components/icon/Icon';
import Collapse from 'src/components/bootstrap/Collapse';
import { NavigationLine } from 'src/components/layout/Navigation/Navigation';
import { logout } from 'src/service/auth/auth';
import { myProfile } from 'src/service/user';
import { useQuery } from '@tanstack/react-query';

const Navigation = dynamic(() => import('src/components/layout/Navigation/Navigation'));

const DefaultAside = () => {
	const { asideStatus, setAsideStatus } = useContext(ThemeContext);
	const { setUser } = useContext(GeneralContext);
	const [collapseStatus, setCollapseStatus] = useState<boolean>(false);
	const router = useRouter();

	const { data } = useQuery({
		queryKey: ['my-profile'],
		queryFn: myProfile,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		setUser(data?.data !== undefined ? data?.data : {});
	}, [data])

	return (
		<Aside>
			<AsideHead>
				<Brand asideStatus={asideStatus} setAsideStatus={setAsideStatus} />
			</AsideHead>
			<AsideBody>
				{/* <NavigationLine /> */}
				<Navigation menu={pageLayoutTypesPagesMenu} id='aside-menu' />
			</AsideBody>
			<AsideFoot>
				<div
					className={classNames('user', { open: collapseStatus })}
					role='presentation'
					onClick={() => setCollapseStatus(!collapseStatus)}>
					{/* <div className='user-avatar'>
					<img src={''} alt='Avatar' width={128} height={128} />
				</div> */}
					<div className='user-info'>
						<div className='user-name d-flex align-items-center'>
							{data?.data?.fullname}
						</div>
						<div className='user-sub-title'>{data?.data?.email}</div>
					</div>
				</div>
				<Collapse isOpen={collapseStatus} className='user-menu'>
					<nav aria-label='aside-bottom-user-menu'>
						<div className='navigation'>
							<div
								role='presentation'
								className='navigation-item cursor-pointer'
								onClick={() => router.push('/profile/my-profile')}>
								<span className='navigation-link navigation-link-pill'>
									<span className='navigation-link-info'>
										<Icon icon='AccountBox' className='navigation-icon' />
										<span className='navigation-text'>Profil Saya</span>
									</span>
								</span>
							</div>
							<div
								role='presentation'
								className='navigation-item cursor-pointer'
								onClick={() =>
									router.push('/profile/change-password')
								}>
								<span className='navigation-link navigation-link-pill'>
									<span className='navigation-link-info'>
										<Icon icon='VpnKey' className='navigation-icon' />
										<span className='navigation-text'>Ubah Password</span>
									</span>
								</span>
							</div>
						</div>
					</nav>
					<NavigationLine />
					<nav aria-label='aside-bottom-user-menu-2'>
						<div className='navigation'>
							<div
								role='presentation'
								className='navigation-item cursor-pointer'
								onClick={async () => {
									await logout();
									// window.location.href = '/auth/login';
									router.push('/auth/login');
								}}>
								<span className='navigation-link navigation-link-pill'>
									<span className='navigation-link-info'>
										<Icon icon='Logout' className='navigation-icon' />
										<span className='navigation-text'>Keluar</span>
									</span>
								</span>
							</div>
						</div>
					</nav>
				</Collapse>
			</AsideFoot>
		</Aside>
	);
};

export default DefaultAside;
