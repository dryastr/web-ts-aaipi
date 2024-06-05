import React, { FC } from 'react';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from 'src/components/bootstrap/Card';
import Button from 'src/components/bootstrap/Button';
import Chart from 'src/components/extras/Chart';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from 'src/components/bootstrap/Dropdown';
import Badge from 'src/components/bootstrap/Badge';
import { priceFormat } from 'src/common-template/helpers';
import useDarkMode from 'src/hooks/useDarkMode';
import { ApexOptions } from 'apexcharts';

interface ICommonGridProductItemProps {
	name: string;
	category: string;
	img: string;
	color: string;
	series: ApexOptions['series'];
	price: number;
	editAction: any;
	deleteAction: any;
}
const CommonGridProductItem: FC<ICommonGridProductItemProps> = ({
	name,
	category,
	img,
	color,
	series,
	price,
	editAction,
	deleteAction,
}) => {
	const { themeStatus, darkModeStatus } = useDarkMode();

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
		<Card>
			<CardHeader>
				<CardLabel>
					<CardTitle>
						{name}{' '}
						{price && (
							<Badge color='success' isLight className='ms-2'>
								{priceFormat(price)}
							</Badge>
						)}
					</CardTitle>
					<CardSubTitle>{category}</CardSubTitle>
				</CardLabel>
				<CardActions>
					<Dropdown>
						<DropdownToggle hasIcon={false}>
							<Button icon='MoreHoriz' color={themeStatus} shadow='default' />
						</DropdownToggle>
						<DropdownMenu isAlignmentEnd>
							<DropdownItem>
								<Button icon='Edit' onClick={() => editAction()}>
									Edit
								</Button>
							</DropdownItem>
							<DropdownItem isDivider />
							<DropdownItem>
								<Button icon='Delete' onClick={() => deleteAction()}>
									Delete
								</Button>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</CardActions>
			</CardHeader>
			<CardBody>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={img}
					alt=''
					width={128}
					height={128}
					className='mx-auto d-block img-fluid mb-3'
				/>
				<div className='row align-items-center'>
					<div className='col'>Monthly sales</div>
					<div className='col-auto'>
						<Chart
							series={series}
							options={dummyOptions}
							type={dummyOptions.chart?.type}
							height={dummyOptions.chart?.height}
							width={dummyOptions.chart?.width}
						/>
					</div>
				</div>
			</CardBody>
			<CardFooter className='shadow-3d-container'>
				<Button
					color='dark'
					className={`w-100 mb-4 shadow-3d-up-hover shadow-3d-${
						darkModeStatus ? 'light' : 'dark'
					}`}
					size='lg'
					tag='a'
					to='/'>
					View Product
				</Button>
			</CardFooter>
		</Card>
	);
};

export default CommonGridProductItem;
