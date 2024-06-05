import React, { useContext } from 'react';
import moment from 'moment';
import { NextPage } from 'next';
import GeneralContext from 'src/context/generalContext';
import RobotTable from 'src/components/robot/RobotTable';
import ApprovalConfirmation from 'src/components/robot/RobotTable/ApprovalConfirmation';
import { encryptURL } from 'src/utils/crypt';
import { get, approval } from 'src/service/verification/new-user';

const Template: NextPage = () => {
	const { setModal } = useContext(GeneralContext);

	const table = [
		{
			key: 'ref_klp_nama',
			label: 'KLP',
			render: (item: any) => item?.ref_klp_nama,
		},
		{
			key: 'nip',
			label: 'NIP',
			render: (item: any) => item?.nip,
		},
		{
			key: 'email',
			label: 'Email',
			render: (item: any) => item?.email,
		},
		{
			key: 'fullname',
			label: 'Nama Lengkap',
			render: (item: any) => item?.fullname,
		},
		{
			key: 'mobile',
			label: 'Nomor Handphone',
			render: 'mobile',
		},
		{
			key: 'created_at',
			label: 'Tgl Registrasi',
			render: (item: any) =>
				item?.created_at ? moment(item?.created_at).format('DD-MM-YYYY HH:mm:ss') : '-',
		},
		{
			key: 'action',
			label: 'Kelola',
			menu: [
				{
					icon: 'TaskAlt',
					label: 'Setujui',
					onClick: (item: any) => {
						setModal({
							isOpen: true,
							title: 'Setujui data',
							size: 'md',
							content: (
								<ApprovalConfirmation
									id={encryptURL(item.id)}
									type={'approve'}
									apiSubmit={approval}
									data={item}
								/>
							),
						});
					},
					hidden: ({ checkPermission }: any) => checkPermission('Approve') === false,
				},
				{
					icon: 'Cancel',
					label: 'Tolak',
					onClick: (item: any) => {
						setModal({
							isOpen: true,
							title: 'Tolak data',
							size: 'md',
							content: (
								<ApprovalConfirmation
									id={encryptURL(item.id)}
									type={'reject'}
									apiSubmit={approval}
									data={item}
								/>
							),
						});
					},
					hidden: ({ checkPermission }: any) => checkPermission('Reject') === false,
				},
			],
		},
	];
	return (
		<RobotTable
			type='page'
			title='Verifikasi Pengguna Baru'
			apiList={get}
			table={table}
			filter={[]}
			isShowView={false}
		/>
	);
};

export default Template;
