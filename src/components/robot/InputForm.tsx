import React, { FC } from 'react';
import TemplateInput from './TemplateInput';

interface InputFormType {
	form: any[];
	formik: object;
	responseBE: object;
	readOnly: boolean;
	darkModeStatus: boolean;
	checkPermission: any;
}

const InputForm: FC<InputFormType> = ({
	form,
	formik,
	responseBE,
	readOnly,
	darkModeStatus,
	checkPermission,
}) =>
	form?.map((item: any, index) => (
		<TemplateInput
			key={`form-${index}` || index}
			formik={formik}
			{...item}
			responseBE={responseBE}
			readOnly={readOnly}
			darkModeStatus={darkModeStatus}
			checkPermission={checkPermission}
		/>
	));
export default InputForm;
