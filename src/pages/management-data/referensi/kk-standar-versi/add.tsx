import React from 'react';
import { NextPage } from 'next';
import RobotForm from 'src/components/robot/RobotForm';
import FORM_TYPE from 'src/constants/FORM_TYPE';
import { string } from 'yup';
import { create } from 'src/service/management-data/referensi/kk-standar-versi';
import { FormType } from 'src/type/form-type';

const Page: NextPage = () => {
	const title = 'Kertas Kerja Standar Versi';

	// Setup Form Template
	const form: FormType[] = [
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'nama',
			label: 'Nama',
			grid: [12, 12, 12],
			validationSchema: string().required(`Nama Versi`),
		},
	];

	return <RobotForm title={title} type='page' form={form} apiSubmit={create} />;
};

export default Page;
