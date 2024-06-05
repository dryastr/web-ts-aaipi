import React, { useState } from 'react';
import moment from 'moment';
import { NextPage } from 'next';
import Badge from 'src/components/bootstrap/Badge';
import RobotTable from 'src/components/robot/RobotTable';
import { get, destroy } from 'src/service/management-data/referensi/jadwal';
import { list as listPeriode } from 'src/service/general/referensi/periode';
import FORM_TYPE from 'src/constants/FORM_TYPE';
import JADWAL_STATUS from 'src/constants/JADWAL_STATUS';
import { string } from 'yup';

const Template: NextPage = () => {
	const table = [
		{
			key: 'nama',
			label: 'Nama Aktifitas',
			render: (item: any) => (
				<>
					{item?.judul}
					<br />
					<small>{item?.keterangan}</small>
				</>
			),
		},
		{
			key: 'rentang',
			label: 'Rentang',
			render: (item: any) => (
				<>
					{moment(item?.tanggal_mulai)
						.locale('id')
						.format('D MMMM YYYY')}{' '}
					s/d{' '}
					{moment(item?.tanggal_selesai)
						.locale('id')
						.format('D MMMM YYYY')}
				</>
			),
		},
		{
			key: 'status',
			label: 'Status',
			render: (item: any) => (
				<Badge
					color={
						(item.status === JADWAL_STATUS.BELUM_AKTIF && 'secondary') ||
						(item.status === JADWAL_STATUS.AKTIF && 'success') ||
						(item.status === JADWAL_STATUS.SELESAI && 'warning') ||
						'info'
					}>
					{item.status_description}
				</Badge>
			),
		},
		{
			key: 'action',
			label: 'Kelola',
		},
	];

	const filter = [
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
	];

	return (
		<RobotTable
			type='page'
			title='Jadwal'
			apiList={get}
			apiDelete={destroy}
			table={table}
			filter={filter}
		/>
	);
};

export default Template;
