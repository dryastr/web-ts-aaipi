import React, { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import Select from './Select';
import Option from '../Option';

interface SelectDBType {
	apiList: any;
	query: any;
	dataValue: any;
	dataLabel: string;
	responseBE: object;
	value?: any;
	dataList?: any;
}

const SelectDB: FC<SelectDBType> = ({
	apiList,
	query,
	dataValue,
	dataLabel,
	responseBE,
	value,
	dataList,
	...other
}) => {
	const otr: any = other;
	const { isLoading, data }: any = useQuery({
		queryKey: [otr.name, typeof query === 'function' ? query?.({ responseBE }) : query],
		queryFn: () => apiList(typeof query === 'function' ? query?.({ responseBE }) : query),
		refetchOnWindowFocus: false,
	});

	return (
		<Select
			ariaLabel={otr.label}
			placeholder={`Pilih ${otr.label}`}
			{...other}
			value={String(value)}>
			{data ?
				data && data?.data.map((row: any) => (
					<Option key={row[dataValue]} value={row[dataValue]}>
						{row[dataLabel]}
					</Option>
				)) 
			: dataList && dataList.map((row: any) => (
				<Option key={row[dataValue]} value={row[dataValue]}>
					{row[dataLabel]}
				</Option>
			)) }
			{!dataList && isLoading && (
				<Option disabled key={otr.name} value='loading'>
					Loading
				</Option>
			)}
		</Select>
	);
	return null;
};
export default SelectDB;
