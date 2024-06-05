import React from 'react';
import moment from 'moment'
import { NextPage } from 'next';
import RobotTable from 'src/components/robot/RobotTable';
import { get, destroy } from 'src/service/settings/role';

const Template: NextPage = () => {
	const title = 'Roles & Permissions';

	const table = [
		{
			key: 'name',
			label: 'Role',
			render: (item: any) => item?.name,
		},
		{
			key: 'description',
			label: 'Deskripsi',
			render: (item: any) => item?.description,
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
			title={title}
			apiList={get}
			apiDelete={destroy}
			table={table}
			filter={[]}
		/>
	);
};

export default Template;
