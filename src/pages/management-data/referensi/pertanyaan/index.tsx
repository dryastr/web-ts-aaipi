import React from 'react';
import { NextPage } from 'next';
import RobotTable from 'src/components/robot/RobotTable';
import { get, destroy } from 'src/service/management-data/referensi/pertanyaan';

const Template: NextPage = () => {
	const table = [
		{
			key: 'nama',
			label: 'Pertanyaan',
			render: (item: any) => item?.pertanyaan,
		},
		{
			key: 'nama',
			label: 'Kertas Kerja',
			render: (item: any) => item?.kkStandar?.nama,
		},
		{
			key: 'nama',
			label: 'Kertas Kerja Versi',
			render: (item: any) => item?.kkStandar?.versi?.nama,
		},
		{
			key: 'action',
			label: 'Kelola',
		},
	];
	return (
		<RobotTable
			type='page'
			title='Pertanyaan'
			apiList={get}
			apiDelete={destroy}
			table={table}
			filter={[]}
		/>
	);
};

export default Template;
