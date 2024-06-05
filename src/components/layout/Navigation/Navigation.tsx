import React, {
	FC,
	forwardRef,
	HTMLAttributes,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useWindowSize } from 'react-use';
import { Manager, Popper, Reference } from 'react-popper';
import { useRouter } from 'next/router';
import Link from 'next/link';
import getMenu from 'src/service/menu';
import { useQuery } from '@tanstack/react-query';
import useDarkMode from 'src/hooks/useDarkMode';
import useEventOutside from 'src/hooks/useEventOutside';
import { Icon } from '@iconify/react';
import ThemeContext from 'src/context/themeContext';
import Tooltips from 'src/components/bootstrap/Tooltips';

import Collapse from '../../bootstrap/Collapse';

interface IListProps extends HTMLAttributes<HTMLUListElement> {
	id?: any;
	children?: ReactNode;
	className?: string;
	ariaLabelledby?: string;
	parentId?: any;
	rootId?: string;
	horizontal?: boolean;
}
export const List = forwardRef<HTMLUListElement, IListProps>(
	({ id, children, className, ariaLabelledby, parentId, rootId, horizontal, ...props }, ref) => {
		return (
			<ul
				ref={ref}
				id={id}
				className={classNames('navigation', { 'navigation-menu': horizontal }, className)}
				aria-labelledby={ariaLabelledby}
				data-bs-parent={
					parentId === `${rootId}__${rootId}`
						? `#${rootId}`
						: (parentId && `#${parentId}`) || null
				}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}>
				{children}
			</ul>
		);
	},
);
List.displayName = 'List';
List.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	ariaLabelledby: PropTypes.string,
	rootId: PropTypes.string,
	horizontal: PropTypes.bool,
};
List.defaultProps = {
	id: undefined,
	children: null,
	className: undefined,
	ariaLabelledby: undefined,
	parentId: undefined,
	rootId: undefined,
	horizontal: false,
};

interface IItemProps {
	children?: ReactNode;
	to?: any;
	as?: any;
	title?: string;
	icon?: any;
	id?: any;
	parentId?: any;
	rootId: string;
	isHorizontal?: boolean;
	notification?: boolean | string;
	isMore?: boolean;
	hide?: boolean;
	activeItem?: string;
	isChildren?: any;
	setActiveItem?(...args: unknown[]): unknown;
	setActiveParent?(...args: unknown[]): unknown;
	handleInitialMenu?: boolean;
}
export const Item: FC<IItemProps> = ({
	children,
	to,
	as,
	title,
	icon,
	id,
	parentId,
	rootId,
	isHorizontal,
	notification,
	isMore,
	hide,
	handleInitialMenu,
	setActiveParent,
	...props
}) => {
	const { darkModeStatus } = useDarkMode();
	const { width } = useWindowSize();
	const { setAsideStatus, setLeftMenuStatus, setRightMenuStatus } = useContext(ThemeContext);

	// eslint-disable-next-line react/prop-types
	const ACTIVE = props.activeItem === id;

	const handleClick = () => {
		if (typeof props.setActiveItem !== 'undefined') {
			if (ACTIVE) {
				props.setActiveItem(null);
			} else {
				props.setActiveItem(id);
			}
		}
	};

	const linkHandleClick = () => {
		// For Mobile Design
		if (width < Number(process.env.NEXT_PUBLIC_MOBILE_BREAKPOINT_SIZE)) setAsideStatus(false);
		setLeftMenuStatus(false);
		setRightMenuStatus(false);
	};

	const ANCHOR_LINK_PATTERN = /^#/i;
	const router = useRouter();

	// console.log('hasilnya', router.pathname, to, router.pathname.includes(to));

	// For top menu
	const match =
		(to !== '/' && router.pathname === to) ||
		(router.pathname === '/' && router.pathname === to);

	useEffect(() => {
		if (match && handleInitialMenu) {
			setActiveParent?.();
		}
	}, [match, setActiveParent, handleInitialMenu]);

	const LINK_CLASS = classNames('navigation-link', 'navigation-link-pill', {
		collapsed: !!children && !isHorizontal,
		active: match,
	});

	const INNER = (
		<>
			<span className='navigation-link-info'>
				{icon && <Icon className='navigation-icon' icon={icon} />}
				{title && <span className='navigation-text'>{title}</span>}
			</span>
			{(!!children || !!notification) && (
				<span className='navigation-link-extra'>
					{!!notification && (
						<Icon
							icon='mdi:bell-notification'
							className={classNames(
								'navigation-notification',
								{
									[`text-${notification}`]: typeof notification === 'string',
									'text-danger': typeof notification !== 'string',
								},
								'animate__animated animate__heartBeat animate__infinite animate__slower',
							)}
						/>
					)}
					{!!children && <Icon className='navigation-arrow' icon='mingcute:right-line' />}
				</span>
			)}
		</>
	);

	const WITHOUT_CHILD =
		!children &&
		!hide &&
		((typeof to === 'string' && ANCHOR_LINK_PATTERN.test(to) && (
			<Link href={to} className={LINK_CLASS} onClick={linkHandleClick}>
				{INNER}
			</Link>
		)) || (
			<Link
				href={to}
				as={typeof as !== 'undefined' ? as : to}
				className={classNames(LINK_CLASS)}
				onClick={linkHandleClick}>
				{INNER}
			</Link>
		));

	// Dropdown
	const dropdownRef = useRef(null);

	const dropdownButtonRef = useRef(null);
	const setButtonRef = useCallback((node: null, ref: (arg0: any) => any) => {
		dropdownButtonRef.current = node;
		return ref(node);
	}, []);

	const dropdownListRef = useRef(null);
	const setListRef = useCallback((node: null, ref: (arg0: any) => any) => {
		dropdownListRef.current = node;
		return ref(node);
	}, []);

	const [dropdownStatus, setDropdownStatus] = useState(false);

	const dropdownButtonHandleClick = () => {
		setDropdownStatus(!dropdownStatus);
	};

	// Clicking outside to close
	const closeMenu = useCallback(() => {
		setDropdownStatus(false);
	}, []);
	useEventOutside(dropdownRef, 'mousedown', closeMenu);
	useEventOutside(dropdownRef, 'touchstart', closeMenu);

	if (children) {
		// submenu && in header
		if (isHorizontal) {
			return (
				<Manager>
					<li
						ref={dropdownRef}
						className={classNames('navigation-item', 'dropdown', {
							'navigation-item-more': isMore,
						})}>
						<Reference>
							{({ ref }) => (
								<span
									// @ts-ignore
									ref={(node) => setButtonRef(node, ref)}
									id={`${rootId}__${id}--link`}
									className={LINK_CLASS}
									// data-bs-toggle='dropdown'
									// data-bs-target={`#${rootId}__${id}`}
									aria-expanded={dropdownStatus}
									aria-controls={`${rootId}__${id}`}
									role='button'
									tabIndex={-1}
									onClick={dropdownButtonHandleClick}
									onKeyDown={dropdownButtonHandleClick}>
									{INNER}
								</span>
							)}
						</Reference>
						{dropdownStatus && (
							<Popper
								placement='bottom-start'
								modifiers={[
									{
										name: 'flip',
										options: {
											fallbackPlacements: [`bottom-end`, `bottom-start`],
										},
									},
								]}>
								{({ ref, style, placement }) => (
									<List
										// @ts-ignore
										ref={(node) => setListRef(node, ref)}
										style={style}
										data-placement={placement}
										id={`${rootId}__${id}`}
										className={classNames(
											'dropdown-menu',
											{
												'dropdown-menu-dark': darkModeStatus,
											},
											'show',
										)}
										ariaLabelledby={`${rootId}__${id}--link`}
										rootId={rootId}
										parentId={`${rootId}__${parentId}`}
										onMouseLeave={() => setDropdownStatus(false)}>
										{children}
									</List>
								)}
							</Popper>
						)}
					</li>
				</Manager>
			);
		}
		// submenu && in aside
		return (
			<li className='navigation-item'>
				<span
					id={`${rootId}__${id}--link`}
					className={LINK_CLASS}
					// data-bs-toggle='collapse'
					// data-bs-target={`#${rootId}__${id}`}
					aria-expanded={ACTIVE}
					aria-controls={`${rootId}__${id}`}
					role='button'
					tabIndex={-1}
					onClick={handleClick}
					onKeyDown={handleClick}>
					{INNER}
				</span>
				<Collapse isOpen={ACTIVE} isChildClone>
					<List
						id={`${rootId}__${id}`}
						ariaLabelledby={`${rootId}__${id}--link`}
						rootId={rootId}
						parentId={`${rootId}__${parentId}`}
						onMouseLeave={closeMenu}>
						{children}
					</List>
				</Collapse>
			</li>
		);
	}
	// without submenu
	return (
		<Tooltips title={title} placement='auto'>
			<li className='navigation-item'>{WITHOUT_CHILD}</li>
		</Tooltips>
	);
};
Item.propTypes = {
	children: PropTypes.node,
	to: PropTypes.string,
	title: PropTypes.string,
	icon: PropTypes.string,
	rootId: PropTypes.string.isRequired,
	isHorizontal: PropTypes.bool,
	notification: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	isMore: PropTypes.bool,
	hide: PropTypes.bool,
};
Item.defaultProps = {
	children: null,
	to: undefined,
	title: undefined,
	icon: undefined,
	id: undefined,
	parentId: undefined,
	isHorizontal: false,
	notification: false,
	isMore: false,
	hide: false,
	handleInitialMenu: true,
};

interface INavigationLineProps {
	className?: string;
}
export const NavigationLine: FC<INavigationLineProps> = ({ className }) => {
	return <hr className={classNames('navigation-line', className)} />;
};
NavigationLine.propTypes = {
	className: PropTypes.string,
};
NavigationLine.defaultProps = {
	className: undefined,
};

interface INavigationTitleProps extends HTMLAttributes<HTMLSpanElement> {
	className?: string;
	children: ReactNode;
}
export const NavigationTitle: FC<INavigationTitleProps> = ({ className, children, ...props }) => {
	return (
		<li className='navigation-item'>
			{/* eslint-disable-next-line react/jsx-props-no-spreading */}
			<span className={classNames('navigation-title', className)} {...props}>
				{children}
			</span>
		</li>
	);
};
NavigationTitle.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};
NavigationTitle.defaultProps = {
	className: undefined,
};

interface FillMenuProps {
	data: any;
	parentId: undefined;
	rootId: string;
	isHorizontal: boolean | undefined;
	isMore: boolean | undefined;
	setActiveParent?(...args: unknown[]): unknown;
}
const FillMenu: FC<FillMenuProps> = ({
	data,
	parentId,
	rootId,
	isHorizontal,
	isMore,
	setActiveParent,
}) => {
	const [activeItem, setActiveItem] = useState(undefined);
	const [handleInitialMenu, setHandleInitialMenu] = useState(true);
	return data?.map((item: any, index: any) =>
		item?.path || item?.children ? (
			<Item
				key={`menu-${item.id}-${index}` || `menu-${index}`}
				rootId={rootId}
				id={item.id}
				title={item.title}
				icon={item.icon}
				to={item?.children ? '-' : item.path}
				parentId={parentId}
				isHorizontal={isHorizontal}
				setActiveItem={setActiveItem}
				activeItem={activeItem}
				notification={item.notification}
				hide={item.hide}
				handleInitialMenu={handleInitialMenu}
				setActiveParent={() => {
					setHandleInitialMenu(false);
					setActiveItem?.(parentId);
					setActiveParent?.(parentId);
				}}>
				{!!item?.children && (
					<FillMenu
						data={item.children}
						parentId={item.id}
						rootId={rootId}
						isHorizontal={isHorizontal}
						isMore={undefined}
						setActiveParent={() => {
							setHandleInitialMenu(false);
							setActiveItem?.(item.id);
							setActiveParent?.(item.id);
						}}
					/>
				)}
			</Item>
		) : (
			!isMore &&
			!isHorizontal && (
				<NavigationTitle key={item?.sectionTitle}>{item?.sectionTitle}</NavigationTitle>
			)
		),
	);
};

interface INavigationProps {
	horizontal?: boolean;
	menu: {
		[key: string]: {
			id?: string | number;
			text?: string;
			path?: string;
			icon?: any;
			isDisable?: boolean;
			subMenu?: {
				[key: string]: {
					id?: string | number;
					text?: string;
					path?: string;
					icon?: any;
					isDisable?: boolean;
				};
			} | null;
		};
	};
	id: string;
	className?: string;
}
const Navigation = forwardRef<HTMLElement, INavigationProps>(
	({ menu, horizontal, id, className, ...props }, ref) => {
		const { setBreadcrumbs, breadcrumbs } = useContext(ThemeContext);

		const { isLoading, isFetched, data } = useQuery({
			queryKey: ['menu'],
			queryFn: getMenu,
			refetchOnWindowFocus: false,
		});

		useEffect(() => {
			if (isFetched && breadcrumbs === null) {
				let arr: any = {
					'/profile/my-profile': { breadcrumbs: ['Profil Saya'] },
					'/profile/change-password': { breadcrumbs: ['Ubah Password'] },
				};
				const setBreadcrumbsFunc = async (dataBreadCrumbs: any, newParent: any) => {
					await dataBreadCrumbs?.map(async (item: any) => {
						if (item.children) {
							const newArr = await setBreadcrumbsFunc(item.children, [
								...newParent,
								item.title,
							]);
							return newArr;
						}
						if (item.path) {
							arr = {
								...arr,
								...{
									[item.path]: {
										breadcrumbs: [...newParent, item.title],
										permissions: item?.permissions,
									},
								},
							};
						}
						return false;
					});
					return arr;
				};

				const getFunc = async () => {
					const newParent: any = [];
					const finalArr = await setBreadcrumbsFunc(data?.data, newParent);
					setBreadcrumbs(finalArr);
				};

				getFunc();
			}
		}, [data, isFetched, setBreadcrumbs, breadcrumbs]);

		const parentId: undefined = undefined;

		return (
			// @ts-ignore
			// eslint-disable-next-line react/jsx-props-no-spreading
			<nav ref={ref} aria-label={id} className={className} {...props}>
				{isLoading && 'Loading'}
				{!isLoading && isFetched && (
					<List id={id} horizontal={horizontal}>
						<FillMenu
							data={data?.data}
							parentId={parentId}
							rootId='rootId'
							isHorizontal={horizontal}
							isMore={undefined}
						/>
					</List>
				)}
			</nav>
		);
	},
);
Navigation.displayName = 'Navigation';
Navigation.propTypes = {
	horizontal: PropTypes.bool,
	// @ts-ignore
	menu: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		text: PropTypes.string,
		path: PropTypes.string,
		icon: PropTypes.string,
		isDisable: PropTypes.bool,
		subMenu: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
				text: PropTypes.string,
				path: PropTypes.string,
				icon: PropTypes.string,
				isDisable: PropTypes.bool,
			}),
		),
	}).isRequired,
	id: PropTypes.string.isRequired,
	className: PropTypes.string,
};
Navigation.defaultProps = {
	horizontal: false,
	className: undefined,
};

export default Navigation;
