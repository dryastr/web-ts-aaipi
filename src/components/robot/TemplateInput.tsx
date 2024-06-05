import Button from 'src/components/bootstrap/Button';
import Checks from 'src/components/bootstrap/forms/Checks';
import FormGroup from 'src/components/bootstrap/forms/FormGroup';
import Input from 'src/components/bootstrap/forms/Input';
import SelectDB from 'src/components/bootstrap/forms/SelectDB';
import Textarea from 'src/components/bootstrap/forms/Textarea';
import Validation from 'src/components/bootstrap/forms/Validation';
import Spinner from 'src/components/bootstrap/Spinner';
import InputPassword from 'src/components/bootstrap/forms/InputPassword';
import Icon from 'src/components/icon/Icon';
import classNames from 'classnames';
import Link from 'next/link';
import FORM_TYPE from 'src/constants/FORM_TYPE';
import { FormikValues } from 'formik';
import React, { FC, ReactNode } from 'react';

interface GridItemType {
	grid: number[];
	children: ReactNode;
	hidden?: boolean;
	styles?: any;
}
const GridItem: FC<GridItemType> = ({ grid, children, hidden, styles }) => {
	const colXS = grid[2] ? `col-${grid[2]}` : '';
	const colSM = grid[1] ? `col-md-${grid[1]}` : '';
	const colMD = grid[0] ? `col-lg-${grid[0]}` : '';
	return (
		<div className={`${colXS} ${colSM} ${colMD}`} hidden={hidden} style={styles}>
			{children}
		</div>
	);
};

interface TemplateInputType {
	type: string;
	grid: any[];
	hidden?: boolean;
	formik: FormikValues;
	defaultValue: any;
	validationSchema: any;
	onChange: any;
	onBlur: any;
	onClick: any;
	isFloating?: boolean;
	isHideLabel?: boolean;
	thousandSeparator: boolean;
	note: string;
	customTemplate: any;
	position: any;
	href?: any;
	styles?: any;
	responseBE: object;
	isHidden?: any;
	darkModeStatus?: boolean;
	checkPermission?: any;
}
const TemplateInput: FC<TemplateInputType> = ({
	type,
	grid,
	formik,
	defaultValue,
	validationSchema,
	onChange,
	onBlur,
	onClick,
	isFloating,
	isHideLabel,
	thousandSeparator,
	customTemplate,
	note,
	position,
	href,
	styles,
	responseBE,
	isHidden,
	darkModeStatus,
	checkPermission,
	...other
}) => {
	if (isHidden) {
		return null;
	}
	// eslint-disable-next-line react-hooks/rules-of-hooks

	const otr: any = other;
	switch (type) {
		case FORM_TYPE.INPUT_TEXT:
			return (
				<GridItem grid={grid} hidden={otr.hidden}>
					<FormGroup isFloating={isFloating} label={otr.label} formText={note}>
						<Input
							placeholder={otr.label && isFloating ? otr.label : ''}
							value={formik.values[otr.name]}
							isTouched={formik.touched[otr.name]}
							invalidFeedback={formik.errors[otr.name]}
							isValid={formik.isValid}
							onChange={async (e: object) => {
								await formik.handleChange(e);
								onChange?.({ ...e, ...{ formik } });
							}}
							onBlur={(e: any) => {
								formik.handleBlur(e);
								onBlur?.({ ...e, ...{ formik } });
							}}
							onClick={(e: object) => {
								onClick?.({ ...e, ...{ formik } });
							}}
							{...otr}
							autoComplete='off'
						/>
					</FormGroup>
				</GridItem>
			);
		case FORM_TYPE.INPUT_NUMBER:
			return (
				<GridItem grid={grid} hidden={otr.hidden}>
					<FormGroup
						isFloating={otr.label ? isFloating : false}
						label={otr.label}
						formText={note}>
						<Input
							placeholder={otr.label && isFloating ? otr.label : ''}
							id={otr.name}
							component='NumberFormat'
							value={formik.values[otr.name]}
							isTouched={formik.touched[otr.name]}
							invalidFeedback={formik.errors[otr.name]}
							isValid={formik.isValid}
							onChange={async (e: object) => {
								await formik.handleChange(e);
								onChange?.({ ...e, ...{ formik } });
							}}
							onBlur={(e: any) => {
								formik.handleBlur(e);
								onBlur?.({ ...e, ...{ formik } });
							}}
							onClick={(e: object) => {
								onClick?.({ ...e, ...{ formik } });
							}}
							{...otr}
						/>
					</FormGroup>
				</GridItem>
			);
		case FORM_TYPE.INPUT_PASSWORD:
			return (
				<GridItem grid={grid} hidden={otr.hidden}>
					<FormGroup
						isFloating={otr.label ? isFloating : false}
						label={otr.label}
						formText={note}>
						<InputPassword
							placeholder={otr.label && isFloating ? otr.label : ''}
							value={formik.values[otr.name]}
							isTouched={formik.touched[otr.name]}
							invalidFeedback={formik.errors[otr.name]}
							isValid={formik.isValid}
							onChange={async (e: object) => {
								await formik.handleChange(e);
								onChange?.({ ...e, ...{ formik } });
							}}
							onBlur={(e: any) => {
								formik.handleBlur(e);
								onBlur?.({ ...e, ...{ formik } });
							}}
							onClick={(e: object) => {
								onClick?.({ ...e, ...{ formik } });
							}}
							{...otr}
							autoComplete='off'
						/>
					</FormGroup>
				</GridItem>
			);
		case FORM_TYPE.INPUT_FILE:
			const isTouched: any =
				typeof formik.touched[otr.name] === 'object' ? true : formik.touched[otr.name];
			return (
				<GridItem grid={grid} hidden={otr.hidden}>
					<FormGroup
						isFloating={otr.label ? isFloating : false}
						label={otr.label}
						formText={note}
						className='position-relative'>
						<Input
							type='file'
							id={otr.name}
							isTouched={isTouched}
							invalidFeedback={formik.errors[otr.name]}
							isValid={formik.isValid}
							onChange={async (e: any) => {
								onChange?.(e?.currentTarget?.files?.[0]);
								await formik.setFieldValue(otr.name, e?.currentTarget?.files?.[0]);
								formik.setFieldTouched(otr.name, true);
							}}
							onClick={(e: object) => {
								onClick?.({ ...e, ...{ formik } });
							}}
							style={{ color: 'transparent' }}
							{...otr}
						/>
						<Button
							onClick={() => document.getElementById(otr.name)?.click()}
							style={{
								fontSize: '13px',
								position: 'absolute',
								bottom: '0px',
								right: '32px',
								fontWeight: 'bold',
								cursor: 'pointer',
								border: 'none',
								width: 'calc(100% - 132px)',
								textAlign: 'left',
								overflow: 'hidden',
							}}>
							<div className='text-nowrap'>
								{formik.values[otr.name]
									? formik.values[otr.name].name
									: 'No file chosen'}
							</div>
						</Button>
					</FormGroup>
				</GridItem>
			);
		case FORM_TYPE.INPUT_DATE:
			return (
				<GridItem grid={grid} hidden={otr.hidden}>
					<FormGroup
						isFloating={otr.label ? isFloating : false}
						label={otr.label}
						formText={note}>
						<Input
							type='date'
							id={otr.name}
							value={formik.values[otr.name]}
							isTouched={formik.touched[otr.name]}
							invalidFeedback={formik.errors[otr.name]}
							isValid={formik.isValid}
							onChange={async (e: object) => {
								await formik.handleChange(e);
								onChange?.({ ...e, ...{ formik } });
							}}
							onBlur={(e: any) => {
								formik.handleBlur(e);
								onBlur?.({ ...e, ...{ formik } });
							}}
							onClick={(e: object) => {
								onClick?.({ ...e, ...{ formik } });
							}}
						/>
					</FormGroup>
				</GridItem>
			);
		case FORM_TYPE.TEXT_AREA:
			return (
				<GridItem grid={grid} hidden={otr.hidden}>
					<FormGroup
						isFloating={otr.label ? isFloating : false}
						label={otr.label}
						formText={note}>
						<Textarea
							placeholder={otr.label && isFloating ? otr.label : ''}
							value={formik.values[otr.name]}
							isTouched={formik.touched[otr.name]}
							invalidFeedback={formik.errors[otr.name]}
							isValid={formik.isValid}
							onChange={async (e: object) => {
								await formik.handleChange(e);
								onChange?.({ ...e, ...{ formik } });
							}}
							onBlur={(e: any) => {
								formik.handleBlur(e);
								onBlur?.({ ...e, ...{ formik } });
							}}
							onClick={(e: object) => {
								onClick?.({ ...e, ...{ formik } });
							}}
							style={{ minHeight: '100px' }}
							{...otr}
						/>
					</FormGroup>
				</GridItem>
			);
		case FORM_TYPE.SELECT:
			return (
				<GridItem grid={grid} hidden={otr.hidden} styles={styles}>
					<FormGroup
						isFloating={otr.label ? isFloating : false}
						label={otr.label}
						formText={note}>
						<SelectDB
							disabled={otr.readOnly}
							value={formik.values[otr.name]}
							isTouched={formik.touched[otr.name]}
							invalidFeedback={formik.errors[otr.name]}
							isValid={formik.isValid}
							responseBE={responseBE}
							onChange={async (e: object) => {
								await formik.handleChange(e);
								onChange?.({ ...e, ...{ formik } });
							}}
							{...otr}
						/>
					</FormGroup>
				</GridItem>
			);
		case FORM_TYPE.CHECKBOX:
			return (
				<GridItem grid={grid} hidden={otr.hidden}>
					<FormGroup
						isFloating={otr.label ? isFloating : false}
						label={!isHideLabel ? otr.label : ''}
						formText={note}>
						<Checks
							disabled={otr.readOnly}
							id={otr.name}
							label={otr.label}
							value={formik.values[otr.name]}
							isTouched={formik.touched[otr.name]}
							invalidFeedback={formik.errors[otr.name]}
							isValid={formik.isValid}
							onChange={async (e: object) => {
								await formik.handleChange(e);
								onChange?.({ ...e, ...{ formik } });
							}}
							onClick={(e: object) => {
								onClick?.({ ...e, ...{ formik } });
							}}
							checked={formik.values[otr.name]}
						/>
					</FormGroup>
				</GridItem>
			);
		case FORM_TYPE.TOGGLE:
			return (
				<GridItem grid={grid} hidden={otr.hidden}>
					<FormGroup
						isFloating={otr.label ? isFloating : false}
						label={otr.label}
						formText={note}>
						<Checks
							disabled={otr.readOnly}
							type='switch'
							id={otr.name}
							label={otr.label}
							value={formik.values[otr.name]}
							isTouched={formik.touched[otr.name]}
							invalidFeedback={formik.errors[otr.name]}
							isValid={formik.isValid}
							onChange={async (e: object) => {
								await formik.handleChange(e);
								onChange?.({ ...e, ...{ formik } });
							}}
							onClick={(e: object) => {
								onClick?.({ ...e, ...{ formik } });
							}}
							checked={formik.values[otr.name]}
						/>
					</FormGroup>
				</GridItem>
			);
		case FORM_TYPE.RADIO:
			return (
				<GridItem grid={grid} hidden={otr.hidden}>
					<FormGroup
						// isFloating={otr.label ? isFloating : false}
						label={otr.label}
						formText={note}>
						{otr.list.map((row: any) => (
							<Checks
								disabled={otr.readOnly}
								key={row?.value}
								type='radio'
								name={otr.name}
								id={otr.name + row.value}
								label={row.label}
								value={row.value}
								onChange={async (e: object) => {
									await formik.handleChange(e);
									await formik.setFieldTouched(otr.name, true);
									onChange?.({ ...e, ...{ formik } });
								}}
								onClick={(e: object) => {
									onClick?.({ ...e, ...{ formik } });
								}}
								checked={formik.values[otr.name]}
							/>
						))}
						<Validation
							isTouched={formik.touched[otr.name]}
							invalidFeedback={formik.errors[otr.name]}
							className='d-block'
						/>
					</FormGroup>
				</GridItem>
			);
		case FORM_TYPE.BUTTON:
			return (
				<GridItem grid={grid} hidden={otr.hidden}>
					<Button
						onClick={(e: object) => {
							onClick?.({ ...e, ...{ formik } });
						}}
						{...otr}
						color={otr.color ? otr.color : 'primary'}>
						{otr.label}
					</Button>
				</GridItem>
			);
		case FORM_TYPE.SUBMIT:
			const components = (
				<GridItem grid={grid} hidden={otr.hidden}>
					<Button
						id={otr.name ? otr.name : 'submit'}
						onClick={(e: object) => {
							formik.handleSubmit();
							onClick?.({ ...e, ...{ formik } });
						}}
						{...otr}
						color={otr.color ? otr.color : 'primary'}
						isDisable={formik.isSubmitting}>
						{/* {otr.label} */}
						{formik.isSubmitting ? <Spinner isSmall inButton /> : otr.label}
						{/* <Spinner isSmall inButton /> */}
					</Button>
				</GridItem>
			);

			if (position) {
				return (
					<div className={`d-flex ${position}`}>
						{/* <div className='flex-row-reverse'> */}
						{components}
						{/* </div> */}
					</div>
				);
			}
			return components;

		case FORM_TYPE.LINK:
			return (
				<GridItem grid={grid} hidden={otr.hidden} styles={styles}>
					<Link
						href={href}
						className={classNames('text-decoration-none  fw-bold display-2', {
							'text-dark': !darkModeStatus,
							'text-light': darkModeStatus,
						})}
						style={{ fontSize: 12 }}>
						{otr.label}
					</Link>
				</GridItem>
			);
		case FORM_TYPE.LINK_DOWNLOAD:
			return (
				<GridItem grid={grid} hidden={otr.hidden} styles={styles}>
					<FormGroup
						isFloating={otr.label ? isFloating : false}
						label={otr.label}
						formText={note}>
						<p>
							<Button
								id={otr.name ? otr.name : 'button'}
								onClick={(e: object) => {
									onClick?.({ ...e, ...{ formik } });
								}}
								{...otr}
								color={otr.color ? otr.color : 'primary'}>
								<Icon icon='Download' size={'lg'} /> Download {otr.label}
							</Button>
						</p>
					</FormGroup>
				</GridItem>
			);
		case FORM_TYPE.INPUT_HIDDEN:
			return <input id={otr.name} type='hidden' value={formik.values[otr.name]} {...otr} />;
		case FORM_TYPE.LABEL:
			return (
				<GridItem grid={grid} hidden={otr.hidden} styles={styles}>
					<FormGroup
						isFloating={otr.label ? isFloating : false}
						label={otr.label}
						formText={note}>
						<p>
							<strong>{otr.value || otr.defaultValue}</strong>
						</p>
					</FormGroup>
				</GridItem>
			);
		default:
			return typeof customTemplate === 'function'
				? customTemplate({ formik, responseBE, checkPermission })
				: customTemplate;
	}
};

TemplateInput.defaultProps = {
	isFloating: false,
};

export default TemplateInput;
