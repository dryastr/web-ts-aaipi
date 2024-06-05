import React from 'react';
import { NextPage } from 'next';
import RobotForm from 'src/components/robot/RobotForm';
import FORM_TYPE from 'src/constants/FORM_TYPE';
import { string, number } from 'yup';
import { useRouter } from 'next/router';
import { show, update } from 'src/service/management-data/user';
import { FormType } from 'src/type/form-type';

const ClientPage: NextPage = () => {
	const title = 'Pengguna';

	const router = useRouter();

	// Setup Form Template
	const form: FormType[] = [
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'nip',
			label: 'NIP',
			grid: [6, 6, 12],
			validationSchema: number().required(`NIP Wajib diisi`),
			defaultValue: ({ responseBE }: any) => {
				return responseBE.nip;
			},
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'email',
			label: 'Email',
			grid: [6, 6, 12],
			validationSchema: string().required(`Email Wajib diisi`),
			defaultValue: ({ responseBE }: any) => {
				return responseBE.email;
			},
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'fullname',
			label: 'Nama Lengkap',
			grid: [6, 6, 12],
			validationSchema: string().required(`Nama Lengkap Wajib diisi`),
			defaultValue: ({ responseBE }: any) => {
				return responseBE.fullname;
			},
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
			defaultValue: ({ responseBE }: any) => {
				return responseBE.status;
			},
		},
	];

	return (
		<RobotForm
			title={title}
			id={router.query.id}
			type='page'
			form={form}
			apiSubmit={update}
			apiShow={show}
		/>
	);
};

export default ClientPage;
