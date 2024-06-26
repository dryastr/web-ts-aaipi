import React, { FC } from 'react';
import classNames from 'classnames';
import Checks from 'src/components/bootstrap/forms/Checks';
import Chart from 'src/components/extras/Chart';
import Badge from 'src/components/bootstrap/Badge';
import Button from 'src/components/bootstrap/Button';
import useDarkMode from 'src/hooks/useDarkMode';
import { ApexOptions } from 'apexcharts';
import Link from 'next/link';

interface ICommonTableRowProps {
	id: string | number;
	image: string;
	name: string;
	category: string;
	series: ApexOptions['series'];
	color: string;
	stock: string | number;
	price: number;
	store: string;
	selectOnChange: any;
	selectChecked: any;
	selectName: string;
}
const CommonTableRow: FC<ICommonTableRowProps> = ({
	id,
	image,
	name,
	category,
	series,
	color,
	stock,
	price,
	store,
	selectOnChange,
	selectChecked,
	selectName,
}) => {
	const { darkModeStatus } = useDarkMode();

	const dummyOptions: ApexOptions = {
		colors: [color],
		chart: {
			type: 'line',
			width: 100,
			height: 35,
			sparkline: {
				enabled: true,
			},
		},
		tooltip: {
			theme: 'dark',
			fixed: {
				enabled: false,
			},
			x: {
				show: false,
			},
			y: {
				title: {
					formatter() {
						return '';
					},
				},
			},
		},
		stroke: {
			curve: 'smooth',
			width: 2,
		},
	};
	return (
		<tr>
			<th scope='row'>
				{}
				<Checks
					id={id.toString()}
					name={selectName}
					value={id}
					onChange={selectOnChange}
					checked={selectChecked}
				/>
			</th>
			<th scope='row'>{id}</th>
			<td>
				<Link href='/'>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src={image} alt={name} width={54} height={54} />
				</Link>
			</td>
			<td>
				<div>
					<Link
						href='/'
						className={classNames('fw-bold', {
							'link-dark': !darkModeStatus,
							'link-light': darkModeStatus,
						})}>
						{name}
					</Link>
					<div className='text-muted'>
						<small>{category}</small>
					</div>
				</div>
			</td>
			<td>
				{}
				<Chart
					series={series}
					options={dummyOptions}
					type={dummyOptions.chart?.type}
					height={dummyOptions.chart?.height}
					width={dummyOptions.chart?.width}
				/>
			</td>
			<td>
				<span>{stock}</span>
			</td>
			<td>
				<span>{price}</span>
			</td>
			<td className='h5'>
				<Badge
					color={
						(store === 'Company A' && 'danger') ||
						(store === 'Company B' && 'warning') ||
						(store === 'Company C' && 'success') ||
						'info'
					}>
					{store}
				</Badge>
			</td>
			<td className='text-end'>
				{}
				<Button color='dark' isLight icon='Edit' tag='a' to='/' />
			</td>
		</tr>
	);
};

export default CommonTableRow;
