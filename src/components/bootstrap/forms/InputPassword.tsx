import React, { FC, useState } from 'react';
import { Icon } from '@iconify/react';
import Input from './Input';
import InputGroup, { InputGroupText } from './InputGroup';
import Button from '../Button';

const InputPassword: FC = ({ ...props }) => {
	const [password, setPassword] = useState(true);

	return (
		<InputGroup>
			<Input
				className='rounded-end-0'
				type={password === true ? 'password' : 'text'}
				{...props}
			/>
			<InputGroupText className='p-0'>
				<Button className='m-0 rounded-start-0' onClick={() => setPassword(!password)}>
					<Icon
						icon={password === true ? 'mdi:eye-off-outline' : 'mdi:eye-outline'}
						width={18}
					/>
				</Button>
			</InputGroupText>
		</InputGroup>
	);
};

export default InputPassword;
