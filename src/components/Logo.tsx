import React, { FC } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

interface ILogoProps {
	width?: number;
	height?: number;
	dark?: boolean;
}
const Logo: FC<ILogoProps> = ({ width, height, dark }) => {
	return (
		<Image
			alt='logo'
			src={dark ? '/images/logo-black.png' : '/images/logo-white.png'}
			width={height !== 854 && !!height ? height * (2155 / 854) : width}
			height={width !== 2155 && !!width ? width * (854 / 2155) : height}
		/>
	);
};
Logo.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	dark: PropTypes.bool,
};
Logo.defaultProps = {
	width: 2155,
	height: 854,
	dark: false,
};

export default Logo;
