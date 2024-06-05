import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { FC, ReactNode, useContext } from 'react';
import useMounted from 'src/hooks/useMounted';
import ThemeContext from 'src/context/themeContext';

interface IPortalProps {
	children: ReactNode;
	id?: string;
}
// @ts-ignore
const Portal: FC<IPortalProps> = ({ id, children }) => {
	const { fullScreenStatus } = useContext(ThemeContext);

	const { mounted } = useMounted();

	const mount =
		typeof document !== 'undefined' && typeof id !== 'undefined' && document.getElementById(id);
	if (mounted) {
		if (fullScreenStatus) return children;
		// @ts-ignore
		if (mount) return ReactDOM.createPortal(children, mount);
	}
	return null;
};
Portal.propTypes = {
	children: PropTypes.node.isRequired,
	id: PropTypes.string,
};
Portal.defaultProps = {
	id: 'portal-root',
};

export default Portal;
