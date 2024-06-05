import React, { useState } from 'react';
import { NextPage } from 'next';
import RobotForm from 'src/components/robot/RobotForm';
import FORM_TYPE from 'src/constants/FORM_TYPE';
import { string, number } from 'yup';
import { create } from 'src/service/management-data/referensi/klp';
import { list } from 'src/service/general/referensi/lokasi';
import { FormType } from 'src/type/form-type';

const Page: NextPage = () => {
	const title = 'Kementrian Lembaga / PEMDA';
	const [refLokasiProvinsi, setRefLokasiProvince] = useState(null);

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
			query: () => ({
				level: 'kota-kab',
				parent_id: refLokasiProvinsi,
			}),
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'kode',
			label: 'Kode',
			grid: [6, 6, 12],
			validationSchema: string().required(`Kode wajib diisi`),
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'nama',
			label: 'Nama',
			grid: [6, 6, 12],
			validationSchema: string().required(`Nama wajib diisi`),
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'nama_pendek',
			label: 'Nama Pendek',
			grid: [6, 6, 12],
			validationSchema: string().required(`Nama Pendek wajib diisi`),
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'pimpinan',
			label: 'Pimpinan',
			grid: [6, 6, 12],
			validationSchema: string().required(`Pimpinan wajib diisi`),
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'jabatan_pimpinan',
			label: 'Jabatan Pimpinan',
			grid: [6, 6, 12],
			validationSchema: string().required(`Jabatan Pimpinan wajib diisi`),
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
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'no_telp',
			label: 'Nomor Telepon',
			grid: [6, 6, 12],
			validationSchema: number(),
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'website',
			label: 'Website',
			grid: [6, 6, 12],
			validationSchema: string(),
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'fax',
			label: 'Fax',
			grid: [6, 6, 12],
			validationSchema: string(),
		},
		{
			type: FORM_TYPE.TEXT_AREA,
			name: 'alamat',
			label: 'Alamat',
			grid: [6, 6, 12],
			validationSchema: string().required(`Alamat wajib diisi`),
		},
		{
			type: FORM_TYPE.INPUT_FILE,
			name: 'logo',
			label: 'Logo',
			grid: [6, 6, 12],
			validationSchema: string(),
		},
	];

	return <RobotForm title={title} type='page' form={form} apiSubmit={create} />;
};

export default Page;
