import React from 'react';
import { NextPage } from 'next';
import RobotForm from 'src/components/robot/RobotForm';
import FORM_TYPE from 'src/constants/FORM_TYPE';
import { string } from 'yup';
import { useRouter } from 'next/router';
import { showPenilaian, updatePenilaian } from 'src/service/transaction/penilaian';
import { FormType } from 'src/type/form-type';

const ClientPage: NextPage = () => {
	const title = 'Penilaian';

	const router = useRouter();

	// Setup Form Template
	const form: FormType[] = [
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'tahun',
			label: 'Tahun',
			grid: [6, 6, 12],
			validationSchema: string().required(`Tahun wajib diisi`),
			defaultValue: ({ responseBE }: any) => {
				return responseBE.tahun;
			},
		},
		{
			type: FORM_TYPE.INPUT_NUMBER,
			name: 'anggaran',
			label: 'Anggaran',
			grid: [6, 6, 12],
			validationSchema: string().required(`Anggaran wajib diisi`),
			defaultValue: ({ responseBE }: any) => {
				return responseBE.anggaran;
			},
		},
	];

	return (
		<RobotForm
			title={title}
			id={router.query.id}
			type='page'
			form={form}
			apiSubmit={updatePenilaian}
			apiShow={showPenilaian}
		/>
	);
};

export default ClientPage;
