import { AxiosResponse } from 'axios';
import React, { FC, useContext, useState } from 'react';
import { ModalBody, ModalFooter } from 'src/components/bootstrap/Modal';
import GeneralContext from 'src/context/generalContext';
import FORM_TYPE from 'src/constants/FORM_TYPE';
import { string } from 'yup';
import { useQueryClient } from '@tanstack/react-query';
import { list } from 'src/service/general/referensi/lokasi';
import RobotForm from '../RobotForm';

interface ApprovalConfirmationType {
	id: any;
	data?: any;
	type: any;
	apiShow?: any;
	apiSubmit?: (type: any, body: any, id: any) => Promise<AxiosResponse<any, any>>;
}

const ApprovalConfirmation: FC<ApprovalConfirmationType> = ({
	id,
	data,
	type,
	apiShow,
	apiSubmit,
}) => {
	const queryClient = useQueryClient();
	const { setModal } = useContext(GeneralContext);
	// const [payload, setPayload] = useState<any>({});
	const [refLokasiProvinsi, setRefLokasiProvince] = useState(null);
	const [refLokasiKotaKab, setRefLokasiKotaKab] = useState(null);

	const form = [
		{
			type: FORM_TYPE.LABEL,
			name: 'ref_klp_nama',
			label: 'Kementrian Lembaga / PEMDA (KLP)',
			grid: [12, 12, 12],
			value: data?.ref_klp_nama,
			styles: {
				marginTop: 0,
			},
		},
		{
			type: FORM_TYPE.LABEL,
			name: 'website',
			label: 'Website',
			grid: [12, 12, 12],
			isHidden: data?.ref_klp_id,
			value: data?.website,
			styles: {
				marginTop: 0,
			},
		},
		{
			type: FORM_TYPE.LABEL,
			name: 'alamat',
			label: 'Alamat',
			grid: [12, 12, 12],
			isHidden: data?.ref_klp_id,
			value: data?.alamat,
			styles: {
				marginTop: 0,
			},
		},
		{
			type: FORM_TYPE.SELECT,
			name: 'ref_lokasi_id_provinsi',
			label: 'Lokasi Provinsi',
			grid: [12, 12, 12],
			validationSchema: data?.ref_klp_id
				? string()
				: string().required(`Lokasi Provinsi wajib diisi`),
			isHidden: data?.ref_klp_id || type === 'reject',
			apiList: list,
			dataValue: 'id',
			dataLabel: 'nama',
			query: () => ({
				level: 'provinsi',
			}),
			onChange: (e: any) => {
				setRefLokasiProvince(e.target.value);
			},
			styles: {
				marginTop: 1,
			},
		},
		{
			type: FORM_TYPE.SELECT,
			name: 'ref_lokasi_id_kota_kab',
			label: 'Lokasi Kota / Kabupaten',
			grid: [12, 12, 12],
			validationSchema: string(),
			isHidden: data?.ref_klp_id || type === 'reject',
			apiList: list,
			dataValue: 'id',
			dataLabel: 'nama',
			query: () => ({
				level: 'kota-kab',
				parent_id: refLokasiProvinsi,
			}),
			onChange: (e: any) => {
				setRefLokasiKotaKab(e.target.value);
			},
			styles: {
				marginTop: 5,
			},
		},
		{
			type: FORM_TYPE.LABEL,
			name: 'nip',
			label: 'NIP',
			grid: [12, 12, 12],
			value: data?.nip,
			styles: {
				marginTop: 5,
			},
		},
		{
			type: FORM_TYPE.LABEL,
			name: 'email',
			label: 'Email',
			grid: [12, 12, 12],
			value: data?.email,
			styles: {
				marginTop: 0,
			},
		},
		{
			type: FORM_TYPE.LABEL,
			name: 'fullname',
			label: 'Nama Lengkap',
			grid: [12, 12, 12],
			value: data?.fullname,
			styles: {
				marginTop: 0,
			},
		},
		{
			type: FORM_TYPE.LABEL,
			name: 'mobile',
			label: 'Nomor Handphone',
			grid: [12, 12, 12],
			value: data?.mobile,
			styles: {
				marginTop: 0,
			},
		},
		{
			type: FORM_TYPE.LINK_DOWNLOAD,
			name: 'file_surat_permohonan_url',
			label: 'Surat Permohonan',
			grid: [12, 12, 12],
			href: data?.file_surat_permohonan_url ?? '/',
			styles: {
				marginTop: 0,
			},
			onClick: () => {
				window.open(data?.file_surat_permohonan_url, '_blank');
			},
		},
		{
			type: FORM_TYPE.BUTTON,
			label: 'Batal',
			grid: [6, 6, 6],
			className: 'border-0 w-100',
			color: 'secondary',
			isOutline: true,
			onClick: () => setModal({ isOpen: false }),
		},
		{
			type: FORM_TYPE.SUBMIT,
			label:
				type === 'approve'
					? data?.ref_klp_id
						? 'Setujui'
						: 'Setujui & Buat Data KLP Baru'
					: 'Tolak',
			grid: [6, 6, 6],
			className: 'w-100',
			color: type === 'approve' ? 'primary' : 'secondary',
		},
	];
	return (
		<>
			<ModalBody>
				Apakah anda yakin ingin untuk {type === 'approve' ? 'Menyetujui' : 'Tolak'} data ini
				?
			</ModalBody>
			<ModalFooter>
				<RobotForm
					type='component'
					id={id}
					// apiShow={apiShow}
					apiSubmit={() =>
						apiSubmit?.(
							type,
							{
								ref_lokasi_id_provinsi: refLokasiProvinsi,
								ref_lokasi_id_kota_kab: refLokasiKotaKab,
							},
							id,
						)
					}
					form={form}
					onSubmitSuccess={() => {
						queryClient.clear();
						setModal({ isOpen: false });
					}}
					className='w-100'
					// responseBE={(responseBE: any) => {
					// 	setPayload(responseBE);
					// }}
				/>
			</ModalFooter>
		</>
	);
};
export default ApprovalConfirmation;
