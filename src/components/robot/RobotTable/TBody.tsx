import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { Dispatch, FC, useContext, useEffect } from 'react';
import Button from 'src/components/bootstrap/Button';
import GeneralContext from 'src/context/generalContext';
import { encryptURL } from 'src/utils/crypt';
import { setKey } from 'src/utils/general';
import { AxiosResponse } from 'axios';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from 'src/components/bootstrap/Dropdown';
import DeleteConfirmation from './DeleteConfirmation';

interface TBodyType {
	title?: string;
	apiList: any;
	table: any[];
	setTotal: Dispatch<any>;
	currentPage: number;
	perPage: number;
	sortQuery?: object;
	search?: string;
	apiDelete?: (id: any) => Promise<AxiosResponse<any, any>>;
	query?: object;
	checkPermission: any;
	isShowView?: boolean;
}

const TBody: FC<TBodyType> = ({
	title,
	table,
	sortQuery,
	setTotal,
	currentPage,
	perPage,
	apiList,
	search,
	apiDelete,
	query,
	checkPermission,
	isShowView,
}) => {
	const { setModal } = useContext(GeneralContext);
	const router = useRouter();
	const allQuery = { search, per_page: perPage, page: currentPage, ...sortQuery, ...query };
	const { data } = useQuery({
		queryKey: [title, allQuery],
		queryFn: () => apiList(allQuery),
		placeholderData: keepPreviousData,
	});
	useEffect(() => {
		setTotal?.(data?.data?.total || 0);
	}, [data, setTotal]);
	return (
		<tbody className=''>
			{data?.data?.data.length > 0 ? (
				data?.data?.data?.map((row: any) => (
					<tr key={setKey('tr', row.id)}>
						{table?.map((r) => {
							if (r?.key !== 'action') {
								return (
									<td key={setKey('td', r.label)} style={r.style}>
										{typeof r?.render === 'function'
											? r?.render(row)
											: row[r?.render]}
									</td>
								);
							}
							return (
								<td key={setKey('td', 'action')} className='text-center'>
									<Dropdown>
										<DropdownToggle hasIcon={false}>
											<Button color='primary' isLight icon='ArrowDropDown' />
										</DropdownToggle>
										<DropdownMenu isAlignmentEnd>
											<DropdownItem isHeader>{r?.label}</DropdownItem>
											{r?.menu?.map((menuData: any) => (
												<DropdownItem
													key={`menu-${menuData.label}`}
													hidden={menuData?.hidden?.({
														responseBE: row,
														checkPermission,
													})}>
													<Button
														color='primary'
														isLight
														icon={menuData?.icon}
														tag='a'
														to={
															menuData?.to
																? `${router.asPath.replace(
																		'#',
																		'',
																  )}/${menuData?.to(row)}`
																: ''
														}
														onClick={
															menuData?.onClick
																? () => menuData?.onClick(row)
																: undefined
														}>
														{menuData?.label}
													</Button>
												</DropdownItem>
											))}
											{checkPermission('View') && isShowView && (
												<DropdownItem>
													<Button
														color='primary'
														isLight
														icon='RemoveRedEye'
														tag='a'
														to={`${router.asPath.replace(
															'#',
															'',
														)}/view/${encryptURL(row.id)}`}>
														Detail
													</Button>
												</DropdownItem>
											)}
											{checkPermission('Edit') && (
												<DropdownItem>
													<Button
														color='primary'
														isLight
														icon='Edit'
														tag='a'
														to={`${router.asPath.replace(
															'#',
															'',
														)}/edit/${encryptURL(row.id)}`}>
														Ubah
													</Button>
												</DropdownItem>
											)}
											{checkPermission('Delete') && (
												<DropdownItem>
													<Button
														icon='Delete'
														onClick={() =>
															setModal({
																isOpen: true,
																title: 'Hapus Data',
																content: (
																	<DeleteConfirmation
																		id={row?.id}
																		apiDelete={apiDelete}
																	/>
																),
																size: 'sm',
															})
														}>
														Hapus
													</Button>
												</DropdownItem>
											)}
										</DropdownMenu>
									</Dropdown>
								</td>
							);
						})}
					</tr>
				))
			) : (
				<tr>
					<td className='text-center' colSpan={table.length}>
						Data tidak ditemukan
					</td>
				</tr>
			)}
		</tbody>
	);
};

TBody.defaultProps = {
	isShowView: true,
};

export default TBody;
