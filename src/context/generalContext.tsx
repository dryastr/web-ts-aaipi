import React, { createContext, FC, ReactNode, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export interface IGeneralContextProps {
	modal: any;
	setModal: any;
	user?: any;
	setUser?: any;
}
const GeneralContext = createContext<IGeneralContextProps>({} as IGeneralContextProps);

interface IGeneralContextProviderProps {
	children: ReactNode;
}
export const GeneralContextProvider: FC<IGeneralContextProviderProps> = ({ children }) => {
	// @ts-ignore

	const [modal, setModal] = useState({
		title: '',
		content: '',
		isOpen: false,
		size: 'sm',
	});

	const [user, setUser] = useState({});

	const value = useMemo(
		() => ({
			modal,
			setModal,
			user,
			setUser
		}),
		[modal, setModal, user, setUser],
	);
	return <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>;
};
GeneralContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default GeneralContext;
