import React from 'react';
import { NextPage } from 'next';
import RobotForm from 'src/components/robot/RobotForm';
import FORM_TYPE from 'src/constants/FORM_TYPE';
import { string } from 'yup';
import { create } from 'src/service/management-data/referensi/syarat-dokumen';
import { list } from 'src/service/general/referensi/kk-standar';
import { FormType } from 'src/type/form-type';

const Page: NextPage = () => {
	const title = 'Dokumen Persyaratan';

	// Setup Form Template
	const form: FormType[] = [
		{
			type: FORM_TYPE.SELECT,
			name: 'ref_kk_standar_id',
			label: 'Kertas Kerja Data',
			grid: [6, 6, 12],
			validationSchema: string(),
			apiList: list,
			dataValue: 'id',
			dataLabel: 'nama',
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'nama',
			label: 'Nama Dokumen',
			grid: [6, 6, 12],
			validationSchema: string().required(`Nama Dokumen`),
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'min_required',
			label: 'Minimal Required',
			grid: [6, 6, 12],
			validationSchema: string().required(`Minimal Required`),
		},
		{
			type: FORM_TYPE.RADIO,
			name: 'is_required',
			label: 'Wajib / Tidak Wajib',
			grid: [6, 6, 12],
			validationSchema: string().required(`Wajib / Tidak wajib dipilih`),
			list: [
				{
					value: '1',
					label: 'Wajib',
				},
				{
					value: '0',
					label: 'Tidak Wajib',
				},
			],
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
