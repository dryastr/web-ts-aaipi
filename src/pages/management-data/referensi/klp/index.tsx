import React from 'react';
import moment from 'moment';
import { NextPage } from 'next';
import RobotTable from 'src/components/robot/RobotTable';
import { get, destroy } from 'src/service/management-data/referensi/klp';
import { toast } from 'react-toastify';
import { encryptURL } from 'src/utils/crypt';

const Template: NextPage = () => {
	const title = 'Kementrian Lembaga / PEMDA';

	const table = [
		{
			key: 'kode',
			label: 'kode',
			render: (item: any) => item?.kode,
		},
		{
			key: 'nama',
			label: 'Nama',
			render: (item: any) => item?.nama,
		},
		{
			key: 'nama_pendek',
			label: 'Nama Pendek',
			render: (item: any) => item?.nama_pendek,
		},
		{
			key: 'level',
			label: 'Level',
			render: (item: any) => item?.level,
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
		{
			key: 'action',
			label: 'Kelola',
			// menu: [
			// 	{
			// 		icon: 'AdsClick',
			// 		label: 'Click Me!',
			// 		onClick: (item: any) => {
			// 			toast.success(`Me Clicked! ${item?.id}`, {
			// 				hideProgressBar: true,
			// 				theme: 'colored',
			// 			});
			// 		},
			// 		hidden: ({ responseBE }: any) => responseBE.id === 1,
			// 	},
			// 	{
			// 		icon: 'InsertLink',
			// 		label: 'Link Me!',
			// 		to: (item: any) => `edit/${encryptURL(item.id)}`,
			// 		hidden: ({ checkPermission }: any) => checkPermission('Edit') === false,
			// 	},
			// ],
		},
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
