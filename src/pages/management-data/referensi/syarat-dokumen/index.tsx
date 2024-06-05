import React, { useState } from 'react';
import { NextPage } from 'next';
import Badge from 'src/components/bootstrap/Badge';
import RobotTable from 'src/components/robot/RobotTable';
import { get, destroy, setActive } from 'src/service/management-data/referensi/syarat-dokumen';
import { encryptURL } from 'src/utils/crypt';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

const Template: NextPage = () => {
	const queryClient = useQueryClient();

	const [isRender, setIsRender] = useState(false);

	const table = [
		{
			key: 'nama',
			label: 'Nama Dokumen',
			render: (item: any) => item?.nama,
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
			key: 'is_active',
			label: 'Status',
			render: (item: any) => (
				<Badge
					color={
						(item.is_active == 1 && 'success') ||
						(item.is_active == 0 && 'secondary') ||
						'info'
					}>
					{item.is_active ? 'Aktif' : 'Tidak Aktif'}
				</Badge>
			),
		},
		{
			key: 'is_required',
			label: 'Wajib (Ya / Tidak)',
			render: (item: any) => (
				<Badge
					color={
						(item.is_required == 1 && 'success') ||
						(item.is_required == 0 && 'secondary') ||
						'info'
					}>
					{item.is_required ? 'Ya' : 'Tidak'}
				</Badge>
			),
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
					hidden: ({ responseBE, checkPermission }: any) => Boolean(responseBE.is_active === 1 || checkPermission('Edit') === false),
				},
				{
					icon: 'Close',
					label: 'Atur Sebagai Tidak Aktif Data',
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
					hidden: ({ responseBE, checkPermission }: any) => Boolean(responseBE.is_active === 0 || checkPermission('Edit') === false),
				},
			],
		},
	];
	return (
		<RobotTable
			type='page'
			title='Dokumen Persyaratan'
			apiList={get}
			apiDelete={destroy}
			table={table}
			filter={[]}
		/>
	);
};

export default Template;
