import React, { useState } from 'react';
import moment from 'moment'
import { NextPage } from 'next';
import Badge from 'src/components/bootstrap/Badge';
import RobotTable from 'src/components/robot/RobotTable';
import { get, destroy, setActive } from 'src/service/management-data/referensi/kk-standar-versi';
import { encryptURL } from 'src/utils/crypt';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

const Template: NextPage = () => {
	const queryClient = useQueryClient();

	const [isRender, setIsRender] = useState(false);

	const table = [
		{
			key: 'nama',
			label: 'Nama',
			render: 'nama',
		},
		{
			key: 'is_active',
			label: 'Status',
			render: (item: any) => (
				<Badge
					color={
						(item.is_active == 1 && 'success') ||
						(item.is_active == 0 && 'secondary') ||
						'info'
					}>
					{item.is_active ? 'Aktif / Default' : 'Tidak Aktif'}
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
			render: (item: any) => (item?.updated_at ? moment(item?.updated_at).format('DD-MM-YYYY HH:mm:ss') : '-'),
		},
		{
			key: 'action',
			label: 'Kelola',
			menu: [
				{
					icon: 'Done',
					label: 'Atur Sebagai Aktif Data',
					onClick: (item: any) => {
						setActive(encryptURL(item.id))
							.then((response: any) => {
								setIsRender(!isRender);
								queryClient.clear();
								toast.success(response?.message, {
									hideProgressBar: true,
									theme: 'colored',
								});
							});
					},
					hidden: ({ checkPermission }: any) => checkPermission('Edit') === false,
				},
			],
		},
	];
	return (
		<RobotTable
			type='page'
			title='Kertas Kerja Standar Versi'
			apiList={get}
			apiDelete={destroy}
			table={table}
			filter={[]}
		/>
	);
};

export default Template;
