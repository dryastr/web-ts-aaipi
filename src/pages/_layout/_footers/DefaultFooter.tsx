import React from 'react';
import Footer from 'src/components/layout/Footer/Footer';

const DefaultFooter = () => {
	return (
		<Footer>
			<div className='container-fluid'>
				<div className='row'>
					<div className='col'>
						<span className='fw-light'>Copyright © 2023 - TS AAIPI</span>
					</div>
				</div>
			</div>
		</Footer>
	);
};

export default DefaultFooter;
