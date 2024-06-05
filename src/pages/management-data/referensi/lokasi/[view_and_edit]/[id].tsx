import React, { useState } from 'react';
import { NextPage } from 'next';
import RobotForm from 'src/components/robot/RobotForm';
import FORM_TYPE from 'src/constants/FORM_TYPE';
import { string } from 'yup';
import { useRouter } from 'next/router';
import { show, update } from 'src/service/management-data/referensi/lokasi';
import { list } from 'src/service/general/referensi/lokasi';
import { FormType } from 'src/type/form-type';

const ClientPage: NextPage = () => {
	const title = 'Lokasi';
	const [isShowProvince, setIsShowProvince] = useState(false);

	const router = useRouter();

	// Setup Form Template
	const form: FormType[] = [
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'kode',
			label: 'Kode',
			grid: [6, 6, 12],
			validationSchema: string().required(`Kode Lokasi`),
			defaultValue: ({ responseBE }: any) => {
				return responseBE.kode;
			},
		},
		{
			type: FORM_TYPE.RADIO,
			name: 'level',
			label: 'Level',
			grid: [6, 6, 12],
			validationSchema: string().required(`Level Lokasi`),
			defaultValue: ({ responseBE }: any) => {
				setIsShowProvince(responseBE.level === 'kota-kab');
				return responseBE.level;
			},
			onChange: (e: any) => {
				setIsShowProvince(e.target.value === 'kota-kab');
			},
			list: [
				{
					value: 'provinsi',
					label: 'Provinsi',
				},
				{
					value: 'kota-kab',
					label: 'Kota / Kabupaten',
				},
			],
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'nama',
			label: 'Nama',
			grid: [6, 6, 12],
			validationSchema: string().required(`Nama Lokasi`),
			defaultValue: ({ responseBE }: any) => {
				return responseBE.nama;
			},
		},
		{
			type: FORM_TYPE.SELECT,
			name: 'parent_id',
			label: 'Provinsi',
			grid: [6, 6, 12],
			validationSchema: isShowProvince
				? string().required(`Provinsi wajib dipilih`)
				: string(),
			apiList: list,
			dataValue: 'id',
			dataLabel: 'nama',
			query: () => ({
				level: 'provinsi',
			}),
			isHidden: !isShowProvince,
			defaultValue: ({ responseBE }: any) => {
				return responseBE.parent_id;
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
