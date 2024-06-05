import React, { FC, useState } from 'react';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from 'src/components/bootstrap/Card';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from 'src/components/bootstrap/Dropdown';
import Button from 'src/components/bootstrap/Button';
import useDarkMode from 'src/hooks/useDarkMode';
import { TColor } from 'src/type/color-type';
import Chart, { IChartOptions } from 'src/components/extras/Chart';
import Avatar from 'src/components/Avatar';
import Popovers from 'src/components/bootstrap/Popovers';
import USERS from '../data/userDummyData';

interface IAnswerCustomerProps {
	img: string;
	name: string;
	job: string;
	value: number;
	color: TColor | 'link' | 'brand' | 'brand-two' | 'storybook';
}
const AnswerCustomer: FC<IAnswerCustomerProps> = (props: IAnswerCustomerProps) => {
	const { img, name, job, value, color } = props;

	const [state] = useState<IChartOptions>({
		series: [value],
		options: {
			chart: {
				type: 'radialBar',
				width: 50,
				height: 50,
				sparkline: {
					enabled: true,
				},
			},
			dataLabels: {
				enabled: false,
			},
			plotOptions: {
				radialBar: {
					hollow: {
						margin: 0,
						size: '50%',
					},
					track: {
						margin: 0,
					},
					dataLabels: {
						show: false,
					},
				},
			},
			stroke: {
				lineCap: 'round',
			},
			colors: [
				(color === 'primary' && String(process.env.NEXT_PUBLIC_PRIMARY_COLOR)) ||
					(color === 'secondary' && String(process.env.NEXT_PUBLIC_SECONDARY_COLOR)) ||
					(color === 'success' && String(process.env.NEXT_PUBLIC_SUCCESS_COLOR)) ||
					(color === 'info' && String(process.env.NEXT_PUBLIC_INFO_COLOR)) ||
					(color === 'warning' && String(process.env.NEXT_PUBLIC_WARNING_COLOR)) ||
					(color === 'danger' && String(process.env.NEXT_PUBLIC_DANGER_COLOR)),
			],
		},
	});
	return (
		<div className='col-12'>
			<div className='row g-2'>
				<div className='col d-flex'>
					<div className='flex-shrink-0'>
						<Avatar src={img} size={54} userName={name} color={color} />
					</div>
					<div className='flex-grow-1 ms-3 d-flex justify-content-between align-items-center'>
						<div>
							{/* <Link
								href={`../${nonAuthPagesMenu.appointment.subMenu.employeeID.path}/${id}`}
								className={classNames('fw-bold fs-6 mb-0', {
									'link-dark': !darkModeStatus,
									'link-light': darkModeStatus,
								})}>
								{name}
							</Link> */}
							<div className='text-muted mt-n1'>
								<small>{job}</small>
							</div>
						</div>
					</div>
				</div>
				<div className='col-auto'>
					<div className='d-flex align-items-center'>
						<Popovers desc='Remaining time' trigger='hover'>
							<span className='me-3'>%{value}</span>
						</Popovers>
						<Chart
							series={state.series}
							options={state.options}
							type={state.options.chart?.type}
							height={state.options.chart?.height}
							width={state.options.chart?.width}
							className='me-3'
						/>
						<Button
							color='info'
							isLight
							icon='ScheduleSend'
							className='text-nowrap'
							tag='a'
							href='mailto:example@site.com'>
							Send
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

const CommonDashboardWaitingAnswer = () => {
	const { darkModeStatus } = useDarkMode();

	return (
		<Card stretch>
			<CardHeader>
				<CardLabel icon='ContactSupport' iconColor='secondary'>
					<CardTitle tag='h4' className='h5'>
						Waiting for an Answer
					</CardTitle>
					<CardSubTitle tag='h5' className='h6'>
						Customer
					</CardSubTitle>
				</CardLabel>
				<CardActions>
					<Dropdown>
						<DropdownToggle hasIcon={false}>
							<Button
								color={darkModeStatus ? 'light' : 'dark'}
								isLink
								hoverShadow='default'
								icon='MoreHoriz'
								aria-label='More Actions'
							/>
						</DropdownToggle>
						<DropdownMenu isAlignmentEnd>
							<DropdownItem>
								<Button icon='Send' tag='a' href='mailto:example@site.com'>
									Send Bulk Mail
								</Button>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</CardActions>
			</CardHeader>
			<CardBody>
				<div className='row g-3'>
					<AnswerCustomer
						img={USERS.GRACE.src}
						name={`${USERS.GRACE.name} ${USERS.GRACE.surname}`}
						color={USERS.GRACE.color}
						job='Maryland'
						value={43}
					/>
					<AnswerCustomer
						img={USERS.JANE.src}
						name={`${USERS.JANE.name} ${USERS.JANE.surname}`}
						color={USERS.JANE.color}
						job='North Carolina'
						value={35}
					/>
					<AnswerCustomer
						img={USERS.RYAN.src}
						name={`${USERS.RYAN.name} ${USERS.RYAN.surname}`}
						color={USERS.RYAN.color}
						job='Rhode Island'
						value={27}
					/>
					<AnswerCustomer
						img={USERS.ELLA.src}
						name={`${USERS.ELLA.name} ${USERS.ELLA.surname}`}
						color={USERS.ELLA.color}
						job='Washington'
						value={15}
					/>
					<AnswerCustomer
						img={USERS.CHLOE.src}
						name={`${USERS.CHLOE.name} ${USERS.CHLOE.surname}`}
						color={USERS.CHLOE.color}
						job='Kentucky'
						value={12}
					/>
					<AnswerCustomer
						img={USERS.SAM.src}
						name={`${USERS.SAM.name} ${USERS.SAM.surname}`}
						color={USERS.SAM.color}
						job='Michigan'
						value={12}
					/>
				</div>
			</CardBody>
		</Card>
	);
};

export default CommonDashboardWaitingAnswer;
