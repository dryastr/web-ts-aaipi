export const summaryPageTopMenu = {
	intro: { id: 'intro', text: 'Intro', path: '#intro', icon: 'Vrpano', subMenu: null },
	bootstrap: {
		id: 'bootstrap',
		text: 'Bootstrap Components',
		path: '#bootstrap',
		icon: 'BootstrapFill',
		subMenu: null,
	},
	storybook: {
		id: 'storybook',
		text: 'Storybook',
		path: '#storybook',
		icon: 'CustomStorybook',
		subMenu: null,
	},
	formik: {
		id: 'formik',
		text: 'Formik',
		path: '#formik',
		icon: 'CheckBox',
		subMenu: null,
	},
	apex: {
		id: 'apex',
		text: 'Apex Charts',
		path: '#apex',
		icon: 'AreaChart',
		subMenu: null,
	},
};

export const dashboardPagesMenu = {
	// dashboard: {
	// 	id: 'dashboard',
	// 	text: 'Dashboard',
	// 	path: '/',
	// 	icon: 'Dashboard',
	// 	subMenu: null,
	// },
	// dashboardProject: {
	// 	id: 'dashboardProject',
	// 	text: 'Dashboard Projects',
	// 	path: 'project-management/list',
	// 	icon: 'AutoStories',
	// 	notification: true,
	// 	subMenu: null,
	// },
	// dashboardBooking: {
	// 	id: 'dashboard-booking',
	// 	text: 'Dashboard Booking',
	// 	path: 'dashboard-booking',
	// 	icon: 'emoji_transportation',
	// 	subMenu: null,
	// },
	// crmDashboard: {
	// 	id: 'crmDashboard',
	// 	text: 'CRM Dashboard',
	// 	path: 'crm/dashboard',
	// 	icon: 'RecentActors',
	// },
	// summary: {
	// 	id: 'summary',
	// 	text: 'Summary',
	// 	path: 'summary',
	// 	icon: 'sticky_note_2',
	// 	subMenu: null,
	// },
};

export const nonAuthPagesMenu = {
	auth: {
		id: 'auth',
		text: 'Auth Pages',
		icon: 'Extension',
	},
	login: {
		id: 'login',
		text: 'Login',
		path: 'auth/login',
		icon: 'Login',
	},
	forgotPassword: {
		id: 'forgotPassword',
		text: 'Lupa Password',
		path: 'auth/forgot-password',
		icon: 'Password',
	},
	resetPassword: {
		id: 'resetPassword',
		text: 'Atur ulang sandi',
		path: 'auth/reset-password/[token]',
		icon: 'Password',
	},
	email: {
		id: 'email',
		text: 'Email Terkirim',
		path: 'auth/email/[email]',
		icon: 'Email',
	},
	signUp: {
		id: 'signUp',
		text: 'Registrasi',
		path: 'public/registrasi',
		icon: 'PersonAdd',
	},
	emailVerification: {
		id: 'emailVerification',
		text: 'Email Verification',
		path: 'public/verify-email/[token]',
		icon: 'Email',
	},

	page404: {
		id: 'Page404',
		text: 'Tidak Ditemukan',
		path: '404',
		icon: 'ReportGmailerrorred',
	},

	app: {
		id: 'app',
		text: 'Apps',
		icon: 'Extension',
	},
};

export const pageLayoutTypesPagesMenu = {
	layoutTypes: {
		id: 'layoutTypes',
		text: 'Page Layout Types',
	},
	blank: {
		id: 'blank',
		text: 'Blank',
		path: 'page-layouts/blank',
		icon: 'check_box_outline_blank ',
	},
	pageLayout: {
		id: 'pageLayout',
		text: 'Page Layout',
		path: 'page-layouts',
		icon: 'BackupTable',
		subMenu: {
			headerAndSubheader: {
				id: 'headerAndSubheader',
				text: 'Header & Subheader',
				path: 'page-layouts/header-and-subheader',
				icon: 'ViewAgenda',
			},
			onlyHeader: {
				id: 'onlyHeader',
				text: 'Only Header',
				path: 'page-layouts/only-header',
				icon: 'ViewStream',
			},
			onlySubheader: {
				id: 'onlySubheader',
				text: 'Only Subheader',
				path: 'page-layouts/only-subheader',
				icon: 'ViewStream',
			},
			onlyContent: {
				id: 'onlyContent',
				text: 'Only Content',
				path: 'page-layouts/only-content',
				icon: 'WebAsset',
			},
		},
	},
	asideTypes: {
		id: 'asideTypes',
		text: 'Aside Types',
		path: 'aside-types',
		icon: 'Vertical Split',
		subMenu: {
			defaultAside: {
				id: 'defaultAside',
				text: 'Default Aside',
				path: 'aside-types/default-aside',
				icon: 'ViewQuilt',
			},
			minimizeAside: {
				id: 'minimizeAside',
				text: 'Minimize Aside',
				path: 'aside-types/minimize-aside',
				icon: 'View Compact',
			},
		},
	},
};
