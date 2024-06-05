import React, { FC, useState } from 'react';
import Icon from 'src/components/icon/Icon';
import { setKey } from 'src/utils/general';

interface THeadType {
	table?: any[];
	setSortQuery?: any;
}

const THead: FC<THeadType> = ({ table, setSortQuery }) => {
	const [sortBy, setSortBy] = useState('');
	const [sortType, setSortType] = useState('');
	const sorting = async (column: string) => {
		const cSortType = sortType === 'ascending' ? 'descending' : 'ascending';
		setSortType(cSortType);
		setSortBy(column);
		setSortQuery({ sort: column, sort_type: cSortType === 'ascending' ? 'asc' : 'desc' });
	};
	return (
		<thead>
			<tr>
				{table?.map((row: any) => (
					<th
						key={setKey('thead', row.label)}
						className={row.key === 'action' ? 'text-center' : 'cursor-pointer'}
						scope='col'
						onClick={() => row?.key !== 'action' && sorting(row?.key)}>
						{row?.label}
						{row?.key && (
							<Icon
								size='lg'
								className={sortBy === row?.key ? sortType : 'invisible'}
								icon='FilterList'
							/>
						)}
					</th>
				))}
			</tr>
		</thead>
	);
};
export default THead;
