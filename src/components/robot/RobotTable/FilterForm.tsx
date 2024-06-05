import React, { FC, useContext } from 'react';
import { ModalBody } from 'src/components/bootstrap/Modal';
import GeneralContext from 'src/context/generalContext';
import FORM_TYPE from 'src/constants/FORM_TYPE';
import { useQueryClient } from '@tanstack/react-query';
import RobotForm from '../RobotForm';

interface FilterFormType {
	form: any[];
	setQuery: any;
}

const FilterForm: FC<FilterFormType> = ({ form, setQuery }) => {
	const queryClient = useQueryClient();
	const { setModal } = useContext(GeneralContext);

	const newForm = [
		...form,
		{
			type: FORM_TYPE.CUSTOM,
			name: 'custom',
			grid: [12],
			customTemplate: <div className='w-100 m-0'>{}</div>,
		},
		{
			type: FORM_TYPE.BUTTON,
			label: 'Reset',
			grid: [3, 3, 6],
			className: 'border-0 w-100',
			color: 'secondary',
			isOutline: true,
			onClick: (e: any) => {
				setQuery({});
				e.formik.handleReset();
				setModal({ isOpen: false });
			},
		},
		{
			type: FORM_TYPE.BUTTON,
			label: 'Filter',
			grid: [3, 3, 6],
			className: 'w-100',
			onClick: (e: any) => {
				setQuery(e.formik.values);
				setModal({ isOpen: false });
			},
		},
	];
	return (
		<ModalBody>
			<RobotForm
				type='component'
				form={newForm}
				onSubmitSuccess={() => {
					queryClient.clear();
					setModal({ isOpen: false });
				}}
				className='w-100'
			/>
		</ModalBody>
	);
};
export default FilterForm;
