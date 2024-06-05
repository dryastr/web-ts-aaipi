import React from 'react';
import { NextPage } from 'next';
import RobotForm from 'src/components/robot/RobotForm';
import FORM_TYPE from 'src/constants/FORM_TYPE';
import { string } from 'yup';
import { createPenilaian } from 'src/service/transaction/penilaian';
import { FormType } from 'src/type/form-type';

const ClientPage: NextPage = () => {
	const title = 'Penilaian';

	// Setup Form Template
	const form: FormType[] = [
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'tahun',
			label: 'Tahun',
			grid: [6, 6, 12],
			validationSchema: string().required(`Tahun wajib diisi`),
		},
		{
			type: FORM_TYPE.INPUT_NUMBER,
			name: 'anggaran',
			label: 'Anggaran',
			grid: [6, 6, 12],
			validationSchema: string().required(`Anggaran wajib diisi`),
		},
	];

	return <RobotForm title={title} type='page' form={form} apiSubmit={createPenilaian} />;
};

export default ClientPage;
