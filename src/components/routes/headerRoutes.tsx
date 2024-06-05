import React from 'react';
import { nonAuthPagesMenu, pageLayoutTypesPagesMenu } from 'src/menu';
import DefaultHeader from '../../pages/_layout/_headers/DefaultHeader';

const headers = [
	{ path: pageLayoutTypesPagesMenu.blank.path, element: null },
	{ path: nonAuthPagesMenu.login.path, element: null },
	{ path: nonAuthPagesMenu.signUp.path, element: null },
	{ path: nonAuthPagesMenu.resetPassword.path, element: null },
	{ path: nonAuthPagesMenu.forgotPassword.path, element: null },
	{ path: nonAuthPagesMenu.emailVerification.path, element: null },
	{ path: nonAuthPagesMenu.email.path, element: null },
	{ path: nonAuthPagesMenu.page404.path, element: null },
	{
		path: `/*`,
		element: <DefaultHeader />,
	},
];

export default headers;
