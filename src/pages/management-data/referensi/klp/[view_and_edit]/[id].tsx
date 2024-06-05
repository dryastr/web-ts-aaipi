import React, { useState } from 'react';
import { NextPage } from 'next';
import RobotForm from 'src/components/robot/RobotForm';
import FORM_TYPE from 'src/constants/FORM_TYPE';
import { string, number } from 'yup';
import { useRouter } from 'next/router';
import { show, update } from 'src/service/management-data/referensi/klp';
import { list } from 'src/service/general/referensi/lokasi';
import { FormType } from 'src/type/form-type';

const ClientPage: NextPage = () => {
	const title = 'Kementrian Lembaga / PEMDA';
	const [refLokasiProvinsi, setRefLokasiProvince] = useState(null);

	const router = useRouter();

	// Setup Form Template
	const form: FormType[] = [
		{
			type: FORM_TYPE.SELECT,
			name: 'ref_lokasi_id_provinsi',
			label: 'Lokasi Provinsi',
			grid: [6, 6, 12],
			validationSchema: string().required(`Lokasi Provinsi wajib diisi`),
			apiList: list,
			dataValue: 'id',
			dataLabel: 'nama',
			query: () => ({
				level: 'provinsi',
			}),
			onChange: (e: any) => {
				setRefLokasiProvince(e.target.value);
			},
			defaultValue: ({ responseBE }) => {
				return responseBE.ref_lokasi_id_provinsi;
			},
		},
		{
			type: FORM_TYPE.SELECT,
			name: 'ref_lokasi_id_kota_kab',
			label: 'Lokasi Kota / Kabupaten',
			grid: [6, 6, 12],
			validationSchema: string(),
			apiList: list,
			dataValue: 'id',
			dataLabel: 'nama',
			query: ({ responseBE }) => ({
				level: 'kota-kab',
				parent_id: refLokasiProvinsi || responseBE.ref_lokasi_id_provinsi,
			}),
			defaultValue: ({ responseBE }) => {
				return responseBE.ref_lokasi_id_kota_kab;
			},
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'kode',
			label: 'Kode',
			grid: [6, 6, 12],
			validationSchema: string().required(`Kode wajib diisi`),
			defaultValue: ({ responseBE }) => {
				return responseBE.kode;
			},
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'nama',
			label: 'Nama',
			grid: [6, 6, 12],
			validationSchema: string().required(`Nama wajib diisi`),
			defaultValue: ({ responseBE }) => {
				return responseBE.nama;
			},
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'nama_pendek',
			label: 'Nama Pendek',
			grid: [6, 6, 12],
			validationSchema: string().required(`Nama Pendek wajib diisi`),
			defaultValue: ({ responseBE }) => {
				return responseBE.nama_pendek;
			},
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'pimpinan',
			label: 'Pimpinan',
			grid: [6, 6, 12],
			validationSchema: string().required(`Pimpinan wajib diisi`),
			defaultValue: ({ responseBE }) => {
				return responseBE.pimpinan;
			},
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'jabatan_pimpinan',
			label: 'Jabatan Pimpinan',
			grid: [6, 6, 12],
			validationSchema: string().required(`Jabatan Pimpinan wajib diisi`),
			defaultValue: ({ responseBE }) => {
				return responseBE.jabatan_pimpinan;
			},
		},
		{
			type: FORM_TYPE.RADIO,
			name: 'jenis',
			label: 'Jenis',
			grid: [6, 6, 12],
			validationSchema: string().required(`Jenis wajib dipilih`),
			list: [
				{
					value: 'KL',
					label: 'Kementrian Lembaga',
				},
				{
					value: 'PEMDA',
					label: 'PEMDA',
				},
			],
			defaultValue: ({ responseBE }) => {
				return responseBE.jenis;
			},
		},
		{
			type: FORM_TYPE.RADIO,
			name: 'level',
			label: 'Level',
			grid: [6, 6, 12],
			validationSchema: string().required(`Level wajib dipilih`),
			list: [
				{
					value: 'PUSAT',
					label: 'Pusat',
				},
				{
					value: 'NON-PUSAT',
					label: 'Non Pusat',
				},
			],
			defaultValue: ({ responseBE }) => {
				return responseBE.level;
			},
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'no_telp',
			label: 'Nomor Telepon',
			grid: [6, 6, 12],
			validationSchema: number(),
			defaultValue: ({ responseBE }) => {
				return responseBE.no_telp;
			},
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'website',
			label: 'Website',
			grid: [6, 6, 12],
			validationSchema: string(),
			defaultValue: ({ responseBE }) => {
				return responseBE.website;
			},
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'fax',
			label: 'Fax',
			grid: [6, 6, 12],
			validationSchema: string(),
			defaultValue: ({ responseBE }) => {
				return responseBE.fax;
			},
		},
		{
			type: FORM_TYPE.TEXT_AREA,
			name: 'alamat',
			label: 'Alamat',
			grid: [6, 6, 12],
			validationSchema: string().required(`Alamat wajib diisi`),
			defaultValue: ({ responseBE }) => {
				return responseBE.alamat;
			},
		},
		{
			type: FORM_TYPE.INPUT_FILE,
			name: 'logo',
			label: 'Logo',
			grid: [6, 6, 12],
			validationSchema: string(),
			// defaultValue: ({ responseBE }) => {
			// 	return responseBE.logo;
			// },
		},
	];

	return (
		<RobotForm
			title={title}
			id={router.query.id}
			type='page'
			form={form}
			apiSubmit={update}
			apiShow={show}
		/>
	);
};

export default ClientPage;
