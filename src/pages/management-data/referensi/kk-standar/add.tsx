import React from 'react';
import { NextPage } from 'next';
import RobotForm from 'src/components/robot/RobotForm';
import FORM_TYPE from 'src/constants/FORM_TYPE';
import { string } from 'yup';
import { create } from 'src/service/management-data/referensi/kk-standar';
import { list } from 'src/service/general/referensi/kk-standar';
import { list as listVersi } from 'src/service/general/referensi/kk-standar-versi';
import { FormType } from 'src/type/form-type';

const Page: NextPage = () => {
	const title = 'Kertas Kerja Standar Versi';

	// Setup Form Template
	const form: FormType[] = [
		{
			type: FORM_TYPE.SELECT,
			name: 'parent_id',
			label: 'Induk Data',
			grid: [6, 6, 12],
			validationSchema: string(),
			apiList: list,
			dataValue: 'id',
			dataLabel: 'nama',
		},
		{
			type: FORM_TYPE.SELECT,
			name: 'ref_kk_standar_versi_id',
			label: 'Versi',
			grid: [6, 6, 12],
			validationSchema: string(),
			apiList: listVersi,
			dataValue: 'id',
			dataLabel: 'nama',
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'nama',
			label: 'Nama',
			grid: [12, 12, 12],
			validationSchema: string().required(`Nama Versi`),
		},
		{
			type: FORM_TYPE.RADIO,
			name: 'is_active',
			label: 'Aktif / Tidak Aktif',
			grid: [6, 6, 12],
			validationSchema: string().required(`Aktif / Tidak Aktif wajib dipilih`),
			list: [
				{
					value: '1',
					label: 'Aktif',
				},
				{
					value: '0',
					label: 'Tidak Aktif',
				},
			],
		},
	];

	return <RobotForm title={title} type='page' form={form} apiSubmit={create} />;
};

export default Page;
