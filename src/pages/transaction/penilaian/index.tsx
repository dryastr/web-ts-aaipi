import React from 'react';
import { NextPage } from 'next';
import RobotTable from 'src/components/robot/RobotTable';
import { deletePenilaian, getPenilaian } from 'src/service/transaction/penilaian';
import { NumericFormat } from 'react-number-format';
import FORM_TYPE from 'src/constants/FORM_TYPE';

const Template: NextPage = () => {
	const table = [
		{
			key: 'tahun',
			label: 'Tahun',
			render: (item: any) => item?.tahun,
		},
		{
			key: 'anggaran',
			label: 'Anggaran',
			render: (item: any) => (
				<NumericFormat
					value={item?.anggaran}
					displayType='text'
					thousandSeparator
					prefix='Rp '
				/>
			),
		},
		{ key: 'action', label: 'Kelola' },
	];

	const filter = [
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'tahun',
			label: 'Tahun',
			grid: [6, 6, 12],
		},
		{
			type: FORM_TYPE.INPUT_NUMBER,
			name: 'anggaran',
			label: 'Anggaran',
			grid: [6, 6, 12],
		},
	];

	return (
		<RobotTable
			type='page'
			title='Penilaian'
			apiList={getPenilaian}
			apiDelete={deletePenilaian}
			table={table}
			filter={filter}
		/>
	);
};

export default Template;
