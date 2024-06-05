import React from 'react';
import moment from 'moment'
import { NextPage } from 'next';
import RobotTable from 'src/components/robot/RobotTable';
import { get } from 'src/service/settings/audit-log';

const Template: NextPage = () => {
	const title = 'Audit Log';

	const table = [
		{
			key: 'method',
			label: 'Method',
			style: {
				minWidth: 100,
			},
			render: (item: any) => item?.method,
		},
		{
			key: 'ip_address',
			label: 'IP',
			style: {
				minWidth: 100,
			},
			render: (item: any) => item?.ip_address,
		},
		{
			key: 'type',
			label: 'Tipe',
			style: {
				minWidth: 100,
			},
			render: (item: any) => item?.type,
		},
		{
			key: 'table',
			label: 'Table Update',
			style: {
				minWidth: 200,
			},
			render: (item: any) => item?.table,
		},
		{
			key: 'table_keyname',
			label: 'Name',
			style: {
				minWidth: 100,
			},
			render: (item: any) => item?.table_keyname,
		},
		{
			key: 'table_key',
			label: 'ID',
			style: {
				minWidth: 100,
			},
			render: (item: any) => item?.table_key,
		},
		{
			key: 'user',
			label: 'Pengguna',
			style: {
				minWidth: 200,
			},
			render: (item: any) => item?.user?.fullname,
		},
		{
			key: 'created_at',
			label: 'Tanggal',
			style: {
				minWidth: 150,
			},
			render: (item: any) => (item?.created_at ? moment(item?.created_at).format('DD-MM-YYYY HH:mm:ss') : '-'),
		},
		{
			key: 'data',
			label: 'Data',
			render: (item: any) => item?.data,
		},
	];
	return (
		<RobotTable
			type='page'
			title={title}
			apiList={get}
			table={table}
			filter={[]}
		/>
	);
};

export default Template;
