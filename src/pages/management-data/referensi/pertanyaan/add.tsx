import React from 'react';
import { NextPage } from 'next';
import RobotForm from 'src/components/robot/RobotForm';
import FORM_TYPE from 'src/constants/FORM_TYPE';
import { string, number } from 'yup';
import { create } from 'src/service/management-data/referensi/pertanyaan';
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
			name: 'pertanyaan',
			label: 'Pertanyaan',
			grid: [6, 6, 12],
			validationSchema: string().required(`Pertanyaan wajib diisi`),
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'max_bobot',
			label: 'Maximal Bobot',
			grid: [6, 6, 12],
			validationSchema: number().required(`Maximal Bobot wajib diisi`),
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'langkah_kerja',
			label: 'Langkah Kerja',
			grid: [6, 6, 12],
			validationSchema: string().required(`Langkah Kerja wajib diisi`),
		},
		{
			type: FORM_TYPE.SELECT,
			name: 'jenis',
			label: 'Jenis Pertanyaan',
			grid: [6, 6, 12],
			validationSchema: string().required(`Jenis Pertanyaan dipilih`),
			dataValue: 'id',
			dataLabel: 'nama',
			dataList: [
				{
					id: 'option',
					nama: 'Option (Radio Button)',
				},
				{
					id: 'text',
					nama: 'Free Text (Bebas Text)',
				},
				{
					id: 'select',
					nama: 'Select (Pilihan)',
				},
				{
					id: 'checkbox',
					nama: 'Checkbox (Cek)',
				},
			],
		},
		{
			type: FORM_TYPE.CUSTOM,
			customTemplate: <></>,
		},
	];

	return <RobotForm title={title} type='page' form={form} apiSubmit={create} />;
};

export default Page;
