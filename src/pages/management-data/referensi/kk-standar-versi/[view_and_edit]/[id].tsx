import React from 'react';
import { NextPage } from 'next';
import RobotForm from 'src/components/robot/RobotForm';
import FORM_TYPE from 'src/constants/FORM_TYPE';
import { string } from 'yup';
import { useRouter } from 'next/router';
import { show, update } from 'src/service/management-data/referensi/kk-standar-versi';
import { FormType } from 'src/type/form-type';

const ClientPage: NextPage = () => {
	const title = 'Kertas Kerja Standar Versi';

	const router = useRouter();

	// Setup Form Template
	const form: FormType[] = [
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'nama',
			label: 'Nama',
			grid: [6, 6, 12],
			validationSchema: string().required(`Nama Versi`),
			defaultValue: ({ responseBE }: any) => {
				return responseBE.nama;
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
