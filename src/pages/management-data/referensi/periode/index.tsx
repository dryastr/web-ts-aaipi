import React from 'react';
import moment from 'moment';
import { NextPage } from 'next';
import Badge from 'src/components/bootstrap/Badge';
import RobotTable from 'src/components/robot/RobotTable';
import { get, destroy } from 'src/service/management-data/referensi/periode';

const Template: NextPage = () => {
	const table = [
		{
			key: 'tahun',
			label: 'Tahun',
			render: (item: any) => item?.tahun,
		},
		{
			key: 'semester',
			label: 'Semester',
			render: 'semester_description',
		},
		{
			key: 'semester',
			label: 'Rentang',
			render: 'semester_date',
		},
		{
			key: 'provinsi',
			label: 'Daerah',
			render: (item: any) => item?.provinsi?.nama ?? '-',
		},
		{
			key: 'status',
			label: 'Status',
			render: (item: any) => (
				<Badge
					color={
						(item.status === 'tidak-aktif' && 'secondary') ||
						(item.status === 'aktif-persiapan' && 'warning') ||
						(item.status === 'aktif' && 'primary') ||
						(item.status === 'selesai' && 'success') ||
						'info'
					}>
					{item.status_description}
				</Badge>
			),
		},
		{
			key: 'updated_by_name',
			label: 'Updated By',
			render: (item: any) => item?.updated_by_name,
		},
		{
			key: 'updated_at',
			label: 'Updated At',
			render: (item: any) =>
				item?.updated_at ? moment(item?.updated_at).format('DD-MM-YYYY HH:mm:ss') : '-',
		},
		{ key: 'action', label: 'Kelola' },
	];
	return (
		<RobotTable
			type='page'
			title='Periode'
			apiList={get}
			apiDelete={destroy}
			table={table}
			filter={[]}
		/>
	);
};

export default Template;
