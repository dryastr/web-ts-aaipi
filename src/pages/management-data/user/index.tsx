import React from 'react';
import { NextPage } from 'next';
import Badge from 'src/components/bootstrap/Badge';
import RobotTable from 'src/components/robot/RobotTable';
import { get, destroy } from 'src/service/management-data/user';

const Template: NextPage = () => {
	const table = [
		{
			key: 'nip',
			label: 'NIP',
			render: 'nip',
		},
		{
			key: 'email',
			label: 'Email',
			render: 'email',
		},
		{
			key: 'fullname',
			label: 'Nama Lengkap',
			render: 'fullname',
		},
		{
			key: 'mobile',
			label: 'Nomor Handphone',
			render: (item: any) => item.mobile ?? '-',
		},
		{
			key: 'role',
			label: 'Role',
			render: (item: any) => item.role ?? '-',
		},
		{
			key: 'status',
			label: 'Status',
			render: (item: any) => (
				<Badge
					color={
						(item.status == 'active' && 'success') ||
						(item.status == 'inactive' && 'secondary') ||
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
	return (
		<RobotTable
			type='page'
			title='Semua Pengguna'
			apiList={get}
			apiDelete={destroy}
			table={table}
			filter={[]}
		/>
	);
};

export default Template;
