import React, { useContext } from 'react';
import { NextPage } from 'next';
import GeneralContext from 'src/context/generalContext';
import RobotForm from 'src/components/robot/RobotForm';
import FORM_TYPE from 'src/constants/FORM_TYPE';
import { string } from 'yup';
import { list as listPeriode } from 'src/service/general/referensi/periode';
import { create } from 'src/service/management-data/referensi/jadwal';
import { JADWAL_STATUS_LIST } from 'src/constants/JADWAL_STATUS';
import { FormType } from 'src/type/form-type';

const Page: NextPage = () => {
	const { user } = useContext(GeneralContext);
	const title = 'Jadwal';

	// Setup Form Template
	const form: FormType[] = [
		{
			type: FORM_TYPE.SELECT,
			name: 'ref_periode_id',
			label: 'Periode Penilaian',
			grid: [12, 12, 12],
			validationSchema: string().required(`Periode wajib dipilih`),
			dataValue: 'id',
			dataLabel: 'nama',
			apiList: listPeriode,
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'judul',
			label: 'Nama Aktivitas',
			grid: [12, 12, 12],
			validationSchema: string().required(`Nama aktifitas wajib diisi`),
		},
		{
			type: FORM_TYPE.TEXT_AREA,
			name: 'keterangan',
			label: 'Keterangan',
			grid: [12, 12, 12],
		},
		{
			type: FORM_TYPE.INPUT_DATE,
			name: 'tanggal_mulai',
			label: 'Mulai',
			grid: [6, 6, 12],
		},
		{
			type: FORM_TYPE.INPUT_DATE,
			name: 'tanggal_selesai',
			label: 'Selesai',
			grid: [6, 6, 12],
		},
		{
			type: FORM_TYPE.SELECT,
			name: 'status',
			label: 'Status',
			grid: [12, 12, 12],
			validationSchema: string().required(`Status wajib dipilih`),
			dataValue: 'id',
			dataLabel: 'nama',
			dataList: JADWAL_STATUS_LIST,
		},
	];

	return <RobotForm title={title} type='page' form={form} apiSubmit={create} />;
};

export default Page;
