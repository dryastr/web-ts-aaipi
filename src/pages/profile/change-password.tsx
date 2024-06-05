import React from 'react';
import { NextPage } from 'next';
import RobotForm from 'src/components/robot/RobotForm';
import FORM_TYPE from 'src/constants/FORM_TYPE';
import { string } from 'yup';
import { changePassword } from 'src/service/user';

const Page: NextPage = () => {
	const title = 'Ubah Password';

	// Setup Form Template
	const form = [
		{
			type: FORM_TYPE.INPUT_PASSWORD,
			name: 'current_password',
			label: 'Password',
			grid: [12, 12, 12],
			validationSchema: string()
				.required(`Password wajib diisi`),
		},
		{
			type: FORM_TYPE.INPUT_PASSWORD,
			name: 'new_password',
			label: 'Password Baru',
			grid: [12, 12, 12],
			validationSchema: string()
				.required(`Password Baru wajib diisi`),
		},
		{
			type: FORM_TYPE.INPUT_PASSWORD,
			name: 'new_password_confirmation',
			label: 'Konfirmasi Password Baru',
			grid: [12, 12, 12],
			validationSchema: string()
				.required(`Konfirmasi Password Baru wajib diisi`),
		},
	];

	return (
		<RobotForm
			title={title}
			type='page'
			form={form}
			apiSubmit={changePassword}
			isHiddenBtnBack={true}
		/>
	);
};

export default Page;
