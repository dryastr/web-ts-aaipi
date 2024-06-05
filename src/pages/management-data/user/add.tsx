import React from 'react';
import { NextPage } from 'next';
import RobotForm from 'src/components/robot/RobotForm';
import FORM_TYPE from 'src/constants/FORM_TYPE';
import { string, number } from 'yup';
import { create } from 'src/service/management-data/user';
import { FormType } from 'src/type/form-type';

const Page: NextPage = () => {
	const title = 'Pengguna';

	// Setup Form Template
	const form: FormType[] = [
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'nip',
			label: 'NIP',
			grid: [6, 6, 12],
			validationSchema: number().required(`NIP Wajib diisi`),
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'email',
			label: 'Email',
			grid: [6, 6, 12],
			validationSchema: string().required(`Email Wajib diisi`),
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'fullname',
			label: 'Nama Lengkap',
			grid: [6, 6, 12],
			validationSchema: string().required(`Nama Lengkap Wajib diisi`),
		},
		{
			type: FORM_TYPE.SELECT,
			name: 'status',
			label: 'Status',
			grid: [6, 6, 12],
			validationSchema: string().required(`Status wajib dipilih`),
			dataValue: 'id',
			dataLabel: 'nama',
			dataList: [
				{
					id: 'active',
					nama: 'Aktif',
				},
				{
					id: 'inactive',
					nama: 'Tidak Aktif',
				},
			],
		},
	];

	return <RobotForm title={title} type='page' form={form} apiSubmit={create} />;
};

export default Page;
