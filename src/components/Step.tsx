import React, { FC } from 'react';
import Icon from 'src/components/icon/Icon';
import Button from './bootstrap/Button';

interface IStepsProps {
	lastStep: number;
	activeStep: number;
	data?: any;
	onClick?: any;
}

const Steps: FC<IStepsProps> = ({ lastStep, activeStep, data, onClick }) => {
	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				justifyContent: 'flex-start',
				overflowX: 'auto',
			}}>
			{data.map((item: any, index: any) => {
				if (lastStep >= index) {
					return (
						<>
							<Button
								className={`step-item ${
									activeStep === index && 'step-item-active'
								}`}
								onClick={() => {
									onClick(index);
								}}>
								<div
									style={{
										paddingTop: 10,
										paddingRight: 5,
										marginLeft: index !== 0 ? 10 : 0,
									}}>
									<Icon icon={item.icon} color='dark' size='2x' />
								</div>
								<div
									className='d-xs-none'
									style={{ marginRight: 10, marginLeft: 10 }}>
									<div className='h5 fw-bold' style={{ textAlign: 'left' }}>
										{item.title}
									</div>
									<div className='h7 text-muted mb-2'>{item.subtitle}</div>
								</div>
							</Button>
							{index !== data.length - 1 && (
								<div style={{ paddingTop: 20, paddingRight: 5, paddingLeft: 5 }}>
									<Icon icon='NavigateNext' color='dark' size='2x' />
								</div>
							)}
						</>
					);
				}

				return (
					<>
						<div className='step-item-disabled'>
							<div
								style={{
									paddingTop: 10,
									paddingRight: 5,
									marginLeft: index !== 0 ? 10 : 0,
								}}>
								<Icon icon={item.icon} color='light' size='2x' />
							</div>
							<div style={{ marginRight: 10, marginLeft: 10 }}>
								<div className='h5 fw-bold' style={{ color: '#ddd' }}>
									{item.title}
								</div>
								<div
									className='h7 text-muted mb-2'
									style={{ color: '#ddd !important' }}>
									{item.subtitle}
								</div>
							</div>
						</div>

						{index !== data.length - 1 && (
							<div style={{ paddingTop: 20, paddingRight: 5, paddingLeft: 5 }}>
								<Icon icon='NavigateNext' color='light' size='2x' />
							</div>
						)}
					</>
				);
			})}
		</div>
	);
};

export default Steps;
