import React from 'react';
import { NextPage } from 'next';
import RobotForm from 'src/components/robot/RobotForm';
import FORM_TYPE from 'src/constants/FORM_TYPE';
import { string } from 'yup';
import { myProfile, updateProfile } from 'src/service/user';

const Page: NextPage = () => {
	const title = 'Profile';

	// Setup Form Template
	const form = [
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'email',
			label: 'Email',
			grid: [6, 6, 12],
			validationSchema: string()
				.required(`Email wajib diisi`)
				.email('Email tidak valid'),
			defaultValue: (responseBE: any) => {
				return responseBE.email;
			},
			disabled: true,
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'fullname',
			label: 'Nama Lengkap',
			grid: [6, 6, 12],
			// validationSchema: string().required(`${t('form.fullname')} ${t('form.required')}`),
			defaultValue: (responseBE: any) => {
				return responseBE.fullname;
			},
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'mobile',
			label:'Nomor telpon',
			grid: [6, 6, 12],
			validationSchema: string().required(`Nomor telpon wajib diisi`),
			defaultValue: (responseBE: any) => {
				return responseBE.mobile;
			},
		},
	];

	return (
		<RobotForm
			title={title}
			type='page'
			form={form}
			apiSubmit={updateProfile}
			apiShow={myProfile}
		/>
	);
};

export default Page;
