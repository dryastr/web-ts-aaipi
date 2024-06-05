import { AxiosResponse } from 'axios';
import React, { FC, useContext } from 'react';
import { ModalBody, ModalFooter } from 'src/components/bootstrap/Modal';
import GeneralContext from 'src/context/generalContext';
import FORM_TYPE from 'src/constants/FORM_TYPE';
import { useQueryClient } from '@tanstack/react-query';
import RobotForm from '../RobotForm';

interface DeleteConfirmationType {
	id: any;
	apiDelete?: (id: any) => Promise<AxiosResponse<any, any>>;
}

const DeleteConfirmation: FC<DeleteConfirmationType> = ({ id, apiDelete }) => {
	const queryClient = useQueryClient();
	const { setModal } = useContext(GeneralContext);
	const form = [
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
			label: 'Hapus',
			grid: [6, 6, 6],
			className: 'w-100',
		},
	];
	return (
		<>
			<ModalBody>Apakah anda yakin ingin menghapus data ini?</ModalBody>
			<ModalFooter>
				<RobotForm
					type='component'
					apiSubmit={() => apiDelete?.(id)}
					form={form}
					onSubmitSuccess={() => {
						queryClient.clear();
						setModal({ isOpen: false });
					}}
					className='w-100'
				/>
			</ModalFooter>
		</>
	);
};
export default DeleteConfirmation;
