import React from 'react';
import moment from 'moment'
import { NextPage } from 'next';
import RobotTable from 'src/components/robot/RobotTable';
import { get, destroy } from 'src/service/management-data/referensi/lokasi';

const Template: NextPage = () => {
	const table = [
		{
			key: 'kode',
			label: 'kode',
			render: (item: any) => item?.kode,
		},
		{
			key: 'level',
			label: 'Level',
			render: (item: any) => item?.level,
		},
		{
			key: 'nama',
			label: 'Nama',
			render: 'nama',
		},
		{
			key: 'updated_by_name',
			label: 'Updated By',
			render: (item: any) => item?.updated_by_name,
		},
		{
			key: 'updated_at',
			label: 'Updated At',
			render: (item: any) => (item?.updated_at ? moment(item?.updated_at).format('DD-MM-YYYY HH:mm:ss') : '-'),
		},
		{ key: 'action', label: 'Kelola' },
	];
	return (
		<RobotTable
			type='page'
			title='Lokasi'
			apiList={get}
			apiDelete={destroy}
			table={table}
			filter={[]}
		/>
	);
};

export default Template;
