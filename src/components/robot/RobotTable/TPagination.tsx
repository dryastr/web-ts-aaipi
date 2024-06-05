import React, { FC } from 'react';
import { CardFooter, CardFooterLeft, CardFooterRight } from 'src/components/bootstrap/Card';
import Option from 'src/components/bootstrap/Option';
import Pagination, { PaginationItem } from 'src/components/bootstrap/Pagination';
import Select from 'src/components/bootstrap/forms/Select';

interface TPaginationType {
	setCurrentPage(...args: unknown[]): unknown;
	currentPage: number;
	perPage: number;
	setPerPage(...args: unknown[]): unknown;
	label: string;
	total: number;
}
const TPagination: FC<TPaginationType> = ({
	setCurrentPage,
	currentPage,
	perPage,
	setPerPage,
	label,
	total,
}) => {
	const totalPage = Math.ceil(total / perPage);
	const perCount = {
		10: 10,
		25: 25,
		50: 50,
		100: 100,
	};

	const changePage = (page: number) => {
		setCurrentPage(page);
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	const pagination = () => {
		let items = [];

		let i = currentPage - 1;
		while (i >= currentPage - 1 && i > 0) {
			items.push(
				<PaginationItem key={i} onClick={() => changePage(currentPage - 1)}>
					{i}
				</PaginationItem>,
			);

			i -= 1;
		}

		items = items.reverse();

		items.push(
			<PaginationItem key={currentPage} isActive onClick={() => changePage(currentPage)}>
				{currentPage}
			</PaginationItem>,
		);

		i = currentPage + 1;
		while (i <= currentPage + 1 && i <= totalPage) {
			items.push(
				<PaginationItem key={i} onClick={() => changePage(currentPage + 1)}>
					{i}
				</PaginationItem>,
			);

			i += 1;
		}

		return items;
	};

	return (
		<CardFooter>
			<CardFooterLeft>
				<span className='text-muted'>
					<span className='pagination__desc'>Showing {total === 0 ? 0 : (currentPage === 1 ? 1 : ((currentPage - 1) * perPage) + 1)} to {currentPage * perPage >= total ? total : currentPage * perPage} of {total} {label}</span>
				</span>
			</CardFooterLeft>

			<CardFooterRight className='d-flex'>
				{/* {totalPage > 1 && ( */}
				<Pagination ariaLabel={label}>
					<PaginationItem
						isFirst
						isDisabled={!(currentPage - 1 > 0)}
						onClick={() => changePage(1)}
					/>
					<PaginationItem
						isPrev
						isDisabled={!(currentPage - 1 > 0)}
						onClick={() => changePage(currentPage - 1)}
					/>
					{currentPage - 1 > 1 && (
						<PaginationItem onClick={() => changePage(currentPage - 2)}>
							...
						</PaginationItem>
					)}
					{pagination()}
					{currentPage + 1 < totalPage && (
						<PaginationItem onClick={() => changePage(currentPage + 2)}>
							...
						</PaginationItem>
					)}
					<PaginationItem
						isNext
						isDisabled={!(currentPage + 1 <= totalPage)}
						onClick={() => changePage(currentPage + 1)}
					/>
					<PaginationItem
						isLast
						isDisabled={!(currentPage + 1 <= totalPage)}
						onClick={() => changePage(totalPage)}
					/>
				</Pagination>
				{/* )} */}

				<Select
					size='sm'
					ariaLabel='Per'
					onChange={(e: { target: { value: string } }) => {
						setPerPage(parseInt(e.target.value, 10));
						changePage(1);
					}}
					value={perPage.toString()}>
					{Object.keys(perCount).map((i) => (
						<Option key={i} value={i}>
							{i}
						</Option>
					))}
				</Select>
			</CardFooterRight>
		</CardFooter>
	);
};
export default TPagination;
