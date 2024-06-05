import React, { FC, useContext } from 'react';
import Modal, { ModalHeader, ModalTitle } from 'src/components/bootstrap/Modal';
import GeneralContext from 'src/context/generalContext';

interface ModalPageType extends Record<string, any> {
	headerCloseStatus?: any;
}
const ModalPage: FC<ModalPageType> = ({ headerCloseStatus, setState }) => {
	const { modal, setModal } = useContext(GeneralContext);
	return (
		<Modal
			isOpen={modal?.isOpen}
			setIsOpen={(status: any) => setModal({ isOpen: status })}
			titleId={modal?.title}
			isStaticBackdrop={modal?.isStaticBackdrop ? modal?.isStaticBackdrop : true}
			isScrollable={modal?.isScrollable ? modal?.isScrollable : false}
			isCentered={modal?.isCentered ? modal?.isCentered : true}
			size={modal?.size}
			fullScreen={modal?.fullScreen ? modal?.fullScreen : false}
			isAnimation={modal?.isAnimation ? modal?.isAnimation : true}>
			{modal?.title && (
				<ModalHeader setIsOpen={headerCloseStatus ? setState : undefined}>
					<ModalTitle id='exampleModalLabel'>{modal?.title}</ModalTitle>
				</ModalHeader>
			)}
			{modal?.content}
		</Modal>
	);
};

export default ModalPage;
