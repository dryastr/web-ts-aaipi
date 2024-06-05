import React, { forwardRef, ReactElement, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ISubHeaderProps } from '../SubHeader/SubHeader';
import { IPageProps } from '../Page/Page';
import Mounted from '../../Mounted';

interface IPageWrapperProps {
	children:
		| ReactElement<ISubHeaderProps>[]
		| ReactElement<IPageProps>
		| ReactElement<IPageProps>[];
	className?: string;
}
const PageWrapper = forwardRef<HTMLDivElement, IPageWrapperProps>(
	({ className, children }, ref) => {
		// const navigate = useNavigate();
		useEffect(() => {
			return () => {};
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

		return (
			<div ref={ref} className={classNames('page-wrapper', 'container-fluid', className)}>
				<Mounted>{children}</Mounted>
			</div>
		);
	},
);
PageWrapper.displayName = 'PageWrapper';
PageWrapper.propTypes = {
	// @ts-ignore
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};
PageWrapper.defaultProps = {
	className: undefined,
};

export default PageWrapper;
