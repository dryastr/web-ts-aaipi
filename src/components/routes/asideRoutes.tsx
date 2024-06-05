import React from 'react';
import dynamic from 'next/dynamic';
import { nonAuthPagesMenu, pageLayoutTypesPagesMenu } from 'src/menu';

const DefaultAside = dynamic(() => import('../../pages/_layout/_asides/DefaultAside'));

const asides = [
	{ path: nonAuthPagesMenu.login.path, element: null, exact: true },
	{ path: nonAuthPagesMenu.signUp.path, element: null, exact: true },
	{ path: pageLayoutTypesPagesMenu.blank.path, element: null, exact: true },
	{ path: nonAuthPagesMenu.resetPassword.path, element: null, exact: true },
	{ path: nonAuthPagesMenu.forgotPassword.path, element: null, exact: true },
	{ path: nonAuthPagesMenu.emailVerification.path, element: null, exact: true },
	{ path: nonAuthPagesMenu.email.path, element: null, exact: true },
	{ path: '/*', element: <DefaultAside />, exact: true },
];

export default asides;
