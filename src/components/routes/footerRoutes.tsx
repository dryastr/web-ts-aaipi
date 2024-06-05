import React from 'react';
import { nonAuthPagesMenu, pageLayoutTypesPagesMenu } from 'src/menu';
import DefaultFooter from '../../pages/_layout/_footers/DefaultFooter';

const footers = [
	{ path: pageLayoutTypesPagesMenu.blank.path, element: null, exact: true },
	{ path: nonAuthPagesMenu.login.path, element: null, exact: true },
	{ path: nonAuthPagesMenu.signUp.path, element: null, exact: true },
	{ path: nonAuthPagesMenu.resetPassword.path, element: null, exact: true },
	{ path: nonAuthPagesMenu.forgotPassword.path, element: null, exact: true },
	{ path: nonAuthPagesMenu.emailVerification.path, element: null, exact: true },
	{ path: nonAuthPagesMenu.email.path, element: null, exact: true },
	{ path: nonAuthPagesMenu.page404.path, element: null, exact: true },
	{ path: '/*', element: <DefaultFooter />, exact: true },
];

export default footers;
