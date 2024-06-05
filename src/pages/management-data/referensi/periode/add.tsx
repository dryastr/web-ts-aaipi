import React, { useContext } from 'react';
import { NextPage } from 'next';
import moment from 'moment';
import GeneralContext from 'src/context/generalContext';
import RobotForm from 'src/components/robot/RobotForm';
import FORM_TYPE from 'src/constants/FORM_TYPE';
import ROLE_TYPE from 'src/constants/ROLE_TYPE';
import { string } from 'yup';
import { create } from 'src/service/management-data/referensi/periode';
import { list } from 'src/service/general/referensi/lokasi';
import { FormType } from 'src/type/form-type';

const Page: NextPage = () => {
	const { user } = useContext(GeneralContext);
	const title = 'Periode';

	const years = [];

	for (let i = moment().year() + 1; i >= moment().year() - 5; i--) {
		years.push({
			id: i,
			nama: i,
		});
	}

	// Setup Form Template
	const form: FormType[] = [
		{
			type: FORM_TYPE.SELECT,
			name: 'tahun',
			label: 'Tahun',
			grid: [6, 6, 12],
			validationSchema: string().required(`Tahun wajib dipilih`),
			dataValue: 'id',
			dataLabel: 'nama',
			dataList: years,
		},
		{
			type: FORM_TYPE.SELECT,
			name: 'semester',
			label: 'Semester',
			grid: [6, 6, 12],
			validationSchema: string().required(`Semester wajib dipilih`),
			dataValue: 'id',
			dataLabel: 'nama',
			dataList: [
				{
					id: 1,
					nama: '1 (SATU)',
				},
				{
					id: 2,
					nama: '2 (DUA)',
				},
			],
		},
		{
			type: FORM_TYPE.SELECT,
			name: 'ref_lokasi_id_provinsi',
			label: 'Daerah',
			grid: [6, 6, 12],
			validationSchema: [ROLE_TYPE.SUPER_ADMIN, ROLE_TYPE.DPN].includes(user?.role_id)
				? string()
				: string().required(`Daerah wajib diisi`),
			apiList: list,
			dataValue: 'id',
			dataLabel: 'nama',
			query: () => ({
				level: 'provinsi',
			}),
			isHidden: ROLE_TYPE.DPN === user.role_id,
		},
		{
			type: FORM_TYPE.SELECT,
			name: 'status',
			label: 'Status',
			grid: [6, 6, 12],
			validationSchema: string().required(`Status wajib dipilih`),
			dataValue: 'id',
			dataLabel: 'nama',
			dataList: [
				{
					id: 'tidak-aktif',
					nama: 'Tidak Aktif',
				},
				{
					id: 'aktif-persiapan',
					nama: 'Aktif Persiapan',
				},
				{
					id: 'aktif',
					nama: 'Aktif',
				},
				{
					id: 'selesai',
					nama: 'Selesai',
				},
			],
		},
	];

	return <RobotForm title={title} type='page' form={form} apiSubmit={create} />;
};

export default Page;
