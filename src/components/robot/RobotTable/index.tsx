import Head from 'next/head';
import React, { FC, useContext, useState } from 'react';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from 'src/components/bootstrap/Card';
import Page from 'src/components/layout/Page/Page';
import PageWrapper from 'src/components/layout/PageWrapper/PageWrapper';
import useDarkMode from 'src/hooks/useDarkMode';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
} from 'src/components/layout/SubHeader/SubHeader';
import Button from 'src/components/bootstrap/Button';
import Icon from 'src/components/icon/Icon';
import Input from 'src/components/bootstrap/forms/Input';
import { useRouter } from 'next/router';
import { AxiosResponse } from 'axios';
import GeneralContext from 'src/context/generalContext';
import classNames from 'classnames';
import { RobotType } from 'src/type/robot-type';
import Tooltips from 'src/components/bootstrap/Tooltips';
import useCheckPermission from 'src/hooks/useCheckPermission';

import TBody from './TBody';
import THead from './THead';
import TPagination from './TPagination';
import FilterForm from './FilterForm';

interface RobotTableType {
	type: RobotType;
	icon?: string;
	title: string;
	table?: any[];
	filter?: any[];
	apiList: (params?: any) => Promise<AxiosResponse<any, any>>;
	apiDelete?: (id: any) => Promise<AxiosResponse<any, any>>;
	isShowView?: boolean;
}

const RobotTable: FC<RobotTableType> = ({
	type,
	title,
	table,
	icon,
	filter,
	apiList,
	apiDelete,
	isShowView,
}) => {
	const { darkModeStatus } = useDarkMode();
	const { setModal } = useContext(GeneralContext);
	const router = useRouter();
	const checkPermission = useCheckPermission();

	const [sortQuery, setSortQuery] = useState({});
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [total, setTotal] = useState(0);
	const [search, setSearch] = useState('');
	const [query, setQuery] = useState({});

	const arr: any = query;
	const keys = Object.keys(arr).filter((key: any) => arr[key] !== '');

	const formFilter: any[] = filter
		? filter?.map((item: any) => ({
				...item,
				defaultValue: arr[item.name],
		  }))
		: [];
	const activeFilter = formFilter.filter((key: any) => arr[key.name] !== '');

	if (type === 'component') {
		return (
			<Card>
				<CardHeader borderSize={3} borderColor={darkModeStatus ? 'dark' : 'light'}>
					<CardLabel icon={icon} iconColor='dark'>
						<CardTitle tag='h4' className='h4 mb-0 pb-0'>
							{title}
						</CardTitle>
					</CardLabel>
				</CardHeader>

				<CardBody className='table-responsive' isScrollable>
					<table className='table table-modern table-hover'>
						<THead table={table} setSortQuery={setSortQuery} />
						<TBody
							title={title}
							apiList={apiList}
							table={table || []}
							sortQuery={sortQuery}
							setTotal={setTotal}
							currentPage={currentPage}
							perPage={perPage}
							search={search}
							apiDelete={apiDelete}
							query={query}
							checkPermission={checkPermission}
						/>
					</table>
				</CardBody>
				<TPagination
					label='items'
					setCurrentPage={setCurrentPage}
					currentPage={currentPage}
					perPage={perPage}
					setPerPage={setPerPage}
					total={total}
				/>
			</Card>
		);
	}
	return (
		<PageWrapper>
			<Head>
				<title>Telaah Sejawat | {title}</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<label
						className='border-0 bg-transparent cursor-pointer me-0'
						htmlFor='searchInput'>
						<Icon icon='Search' size='2x' color='primary' />
					</label>
					<Input
						id='searchInput'
						type='search'
						className='border-0 shadow-none bg-transparent'
						placeholder='Search...'
						onChange={(e: any) => setSearch(e.target.value)}
						value={search}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					{filter && filter.length > 0 && (
						<Button
							color='info'
							isLight
							icon='FilterAlt'
							onClick={() =>
								setModal({
									isOpen: true,
									title: 'Filter',
									content: <FilterForm form={formFilter} setQuery={setQuery} />,
								})
							}
							className='mx-2 position-relative'>
							Filter
							{keys.length > 0 && (
								<Tooltips
									title={
										<div>
											Active filter by{' '}
											<b>
												{activeFilter
													.map((obj: any) => obj.label)
													.join(', ')
													.replace(/,([^,]*)$/, ' & $1')}
											</b>
										</div>
									}
									placement='top'>
									<span
										className={classNames(
											'position-absolute',
											'top-0 end',
											'translate-middle',
											'badge',
											'rounded-pill',
											'bg-danger',
											'border border-2',
											{
												'border-white': !darkModeStatus,
												'border-dark': darkModeStatus,
											},
										)}>
										{keys?.length}

										<span className='visually-hidden'>filter</span>
									</span>
								</Tooltips>
							)}
						</Button>
					)}
					{checkPermission('Create') === true && (
						<Button
							icon='Add'
							color='primary'
							isLight
							tag='a'
							to={`${router.asPath}/add`}>
							Tambah
						</Button>
					)}
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				<Card style={{ minHeight: '100%' }}>
					<CardHeader borderSize={3} borderColor={darkModeStatus ? 'dark' : 'light'}>
						<CardLabel icon={icon} iconColor='dark'>
							<CardTitle tag='h4' className='h4 mb-0 pb-0'>
								{title}
							</CardTitle>
						</CardLabel>
					</CardHeader>

					<CardBody className='table-responsive'>
						<table className='table table-modern table-hover'>
							<THead table={table} setSortQuery={setSortQuery} />
							<TBody
								title={title}
								apiList={apiList}
								table={table || []}
								sortQuery={sortQuery}
								setTotal={setTotal}
								currentPage={currentPage}
								perPage={perPage}
								search={search}
								apiDelete={apiDelete}
								query={query}
								checkPermission={checkPermission}
								isShowView={isShowView}
							/>
						</table>
					</CardBody>
					<TPagination
						label='items'
						setCurrentPage={setCurrentPage}
						currentPage={currentPage}
						perPage={perPage}
						setPerPage={setPerPage}
						total={total}
					/>
				</Card>
			</Page>
		</PageWrapper>
	);
};
export default RobotTable;
