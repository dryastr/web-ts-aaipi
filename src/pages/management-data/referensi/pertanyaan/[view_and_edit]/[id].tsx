import React from 'react';
import { NextPage } from 'next';
import RobotForm from 'src/components/robot/RobotForm';
import FORM_TYPE from 'src/constants/FORM_TYPE';
import { string, number } from 'yup';
import { useRouter } from 'next/router';
import { show, update } from 'src/service/management-data/referensi/pertanyaan';
import { list } from 'src/service/general/referensi/kk-standar';
import { FormType } from 'src/type/form-type';

const ClientPage: NextPage = () => {
	const title = 'Kertas Kerja Standar Versi';

	const router = useRouter();

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
			defaultValue: ({ responseBE }: any) => {
				return responseBE.ref_kk_standar_id;
			},
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'pertanyaan',
			label: 'Pertanyaan',
			grid: [6, 6, 12],
			validationSchema: string().required(`Pertanyaan wajib diisi`),
			defaultValue: ({ responseBE }: any) => {
				return responseBE.pertanyaan;
			},
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'max_bobot',
			label: 'Maximal Bobot',
			grid: [6, 6, 12],
			validationSchema: number().required(`Maximal Bobot wajib diisi`),
			defaultValue: ({ responseBE }: any) => {
				return responseBE.max_bobot;
			},
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'langkah_kerja',
			label: 'Langkah Kerja',
			grid: [6, 6, 12],
			validationSchema: string().required(`Langkah Kerja wajib diisi`),
			defaultValue: ({ responseBE }: any) => {
				return responseBE.langkah_kerja;
			},
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
			defaultValue: ({ responseBE }: any) => {
				return responseBE.jenis;
			},
		},
		{
			type: FORM_TYPE.CUSTOM,
			customTemplate: <></>,
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
