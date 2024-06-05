import React from 'react';
import { useTour } from '@reactour/tour';
import { createUseStyles } from 'react-jss';
import SusyDarkMode from './assets/img/wanna/susy/susy-dark-mode.png';
import Susy from './assets/img/wanna/susy/susy.png';
import Susy2 from './assets/img/wanna/susy/susy2.png';
import Susy3 from './assets/img/wanna/susy/susy3.png';
import Susy4 from './assets/img/wanna/susy/susy4.png';
import Susy5 from './assets/img/wanna/susy/susy5.png';
import Susy6 from './assets/img/wanna/susy/susy6.png';
import Susy7 from './assets/img/wanna/susy/susy7.png';
import Susy8 from './assets/img/wanna/susy/susy8.png';
import Susy9 from './assets/img/wanna/susy/susy9.png';
import Susy10 from './assets/img/wanna/susy/susy10.png';
import useDarkMode from './hooks/useDarkMode';
import Button from './components/bootstrap/Button';
import useMounted from './hooks/useMounted';

/**
 * Steps style
 */
export const styles = {
	/**
	 * Overlay style
	 * @param base
	 */
	maskWrapper: (base: any) => ({ ...base }),
	maskArea: (base: any) => ({
		...base,
		rx: 'var(--bs-border-radius)',
	}),
	highlightedArea: (base: any) => ({ ...base }),
	badge: (base: any) => ({ ...base }),
	popover: (base: any) => ({
		...base,
		boxShadow: '0 0 3em rgba(0, 0, 0, 0.5)',
		backgroundColor: 'var(--bs-body-bg)',
		color: 'var(--bs-body-color)',
		borderRadius: 'var(--bs-border-radius)',
	}),
};

/**
 * Image Styles
 * @type {(data?: {theme?: DefaultTheme}) => Classes<"image">}
 */
const useStyles = createUseStyles(
	{
		image: {
			maxHeight: '150px',
			objectFit: 'contain',
		},
	},
	{ link: true },
);

/**
 * Prev & Next buttons
 * @returns {JSX.Element}
 * @constructor
 */
const TourNavigation = () => {
	const { currentStep, setCurrentStep } = useTour();
	return (
		<div className='col-12 mt-3'>
			<div className='row'>
				<div className='col'>
					{!!currentStep && (
						<Button
							icon='ArrowBackIos'
							color='info'
							isLink
							onClick={() => setCurrentStep(currentStep - 1)}>
							Prev
						</Button>
					)}
				</div>
				<div className='col-auto'>
					<Button
						icon='ArrowForwardIos'
						color='info'
						isLight
						onClick={() => setCurrentStep(currentStep + 1)}>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
};

/**
 * Selector
 * @param name
 * @returns {`[data-tour='${string}']`}
 */
const getTargetName = (name: string): `[data-tour='${string}']` => {
	return `[data-tour='${name}']`;
};

const DarkModeTour = () => {
	const { mounted } = useMounted();
	const classes = useStyles();
	return (
		<div className='row'>
			<div className='col-md-5'>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={SusyDarkMode}
					className={mounted ? classes.image : undefined}
					width='100%'
					alt=''
				/>
			</div>
			<div className='col-md-7 d-flex align-items-center'>
				<div>
					<p className='lead'>Dark / Light Mode</p>
					<p>You can switch between dark and light mode.</p>
				</div>
			</div>
			<TourNavigation />
		</div>
	);
};

const DateRangeTour = () => {
	const { mounted } = useMounted();
	const { darkModeStatus, setDarkModeStatus } = useDarkMode();
	const classes = useStyles();

	return (
		<div className='row'>
			<div className='col-md-8 flex-wrap d-flex align-items-center'>
				<div className='row'>
					<div className='col'>
						<p className='lead'>Compatibility</p>
						<p>The designs of the added packages are compatible with "Facit".</p>
						<p>
							After clicking the <b>date button</b> above, you can test its appearance
							with the buttons below.
						</p>
					</div>
				</div>
				<div className='row'>
					<div className='col'>
						<Button
							icon='Sun'
							color='warning'
							isLight={darkModeStatus}
							onClick={() => setDarkModeStatus(false)}>
							Light
						</Button>
					</div>
					<div className='col-auto'>
						<Button
							icon='Moon'
							color='info'
							isLight={!darkModeStatus}
							onClick={() => setDarkModeStatus(true)}>
							Dark
						</Button>
					</div>
				</div>
			</div>
			<div className='col-md-4'>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={Susy3}
					className={mounted ? classes.image : undefined}
					width='100%'
					alt=''
				/>
			</div>
			<TourNavigation />
		</div>
	);
};

const ListPageTour = () => {
	const { mounted } = useMounted();
	const classes = useStyles();
	return (
		<div className='row'>
			<div className='col-md-4'>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={Susy5}
					className={mounted ? classes.image : undefined}
					width='100%'
					alt=''
				/>
			</div>
			<div className='col-md-8 d-flex align-items-center'>
				<div>
					<p className='lead'>Listing Pages</p>
					<p>Listing pages are perhaps one of the most important pages.</p>
					<p>
						Click the <b>"Boxed List"</b> button to see some details.
					</p>
				</div>
			</div>
		</div>
	);
};

const FilterTour = () => {
	const { mounted } = useMounted();
	const classes = useStyles();
	return (
		<div className='row'>
			<div className='col-md-8 d-flex align-items-center'>
				<div>
					<p className='lead'>Well thought out page structure</p>
					<p>
						Since the "Subheader" is in the same file as the page content, you can
						easily use the relevant components here.
					</p>
				</div>
			</div>
			<div className='col-md-4'>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={Susy3}
					className={mounted ? classes.image : undefined}
					width='100%'
					alt=''
				/>
			</div>
			<TourNavigation />
		</div>
	);
};

const ListTour = () => {
	const { mounted } = useMounted();
	const classes = useStyles();
	return (
		<div className='row'>
			<div className='col-md-4'>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={Susy8}
					className={mounted ? classes.image : undefined}
					width='100%'
					alt=''
				/>
			</div>
			<div className='col-md-8 d-flex align-items-center'>
				<div>
					<p className='lead'>Table & Table Hooks</p>
					<p>With hooks written specifically for tables;</p>
					<ul>
						<li>Select row and select all,</li>
						<li>Cell customization,</li>
						<li>Sorting according to the desired value in the cell,</li>
						<li>Paging and number of items on the page</li>
						<li>and more...</li>
					</ul>
					<Button
						color='info'
						isOutline
						tag='a'
						size='sm'
						// to={`../${componentsMenu.components.subMenu.table.path}`}
						target='_blank'>
						More Information
					</Button>
				</div>
			</div>
			<TourNavigation />
		</div>
	);
};

const GridPageTour = () => {
	const { mounted } = useMounted();
	const classes = useStyles();
	return (
		<div className='row'>
			<div className='col-md-4'>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={Susy5}
					className={mounted ? classes.image : undefined}
					width='100%'
					alt=''
				/>
			</div>
			<div className='col-md-8 d-flex align-items-center'>
				<div>
					<p className='lead'>Grid List</p>
					<p>You can list your items in grid form.</p>
				</div>
			</div>
			<TourNavigation />
		</div>
	);
};

const EditPageTour = () => {
	const { mounted } = useMounted();
	const classes = useStyles();
	return (
		<div className='row'>
			<div className='col-md-4'>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={Susy6}
					className={mounted ? classes.image : undefined}
					width='100%'
					alt=''
				/>
			</div>
			<div className='col-md-8 d-flex align-items-center'>
				<div>
					<p className='lead'>Edit Pages</p>
					<p>
						You can use your forms in different ways such as <b>modal</b>, <b>canvas</b>{' '}
						and <b>wizard</b> according to your needs.
					</p>
				</div>
			</div>
			<TourNavigation />
		</div>
	);
};

const AuthPageTour = () => {
	const { mounted } = useMounted();
	const classes = useStyles();
	return (
		<div className='row'>
			<div className='col-md-4'>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={Susy4}
					className={mounted ? classes.image : undefined}
					width='100%'
					alt=''
				/>
			</div>
			<div className='col-md-8 d-flex align-items-center'>
				<div>
					<p className='lead'>Auth Pages</p>
					<p>You can see the authorization sample pages here.</p>
				</div>
			</div>
			<TourNavigation />
		</div>
	);
};

const PMTour = () => {
	const { mounted } = useMounted();
	const classes = useStyles();
	return (
		<div className='row'>
			<div className='col-md-4'>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={Susy5}
					className={mounted ? classes.image : undefined}
					width='100%'
					alt=''
				/>
			</div>
			<div className='col-md-8 d-flex align-items-center'>
				<div>
					<p className='lead'>Apps Examples</p>
					<p>
						Some sample screens have been made with "Facit" and it can give you an idea
						for your project.
					</p>
					<p>
						First, let's start by clicking <b>"Projects"</b> from the accordion menu.
					</p>
				</div>
			</div>
		</div>
	);
};

const ProjectsTour = () => {
	const { mounted } = useMounted();
	const classes = useStyles();
	return (
		<div className='row'>
			<div className='col-md-4'>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={Susy5}
					className={mounted ? classes.image : undefined}
					width='100%'
					alt=''
				/>
			</div>
			<div className='col-md-8 d-flex align-items-center'>
				<div>
					<p className='lead'>Team and Project Homepage</p>
					<p>
						<b>Click</b> on a project to see the inside page.
					</p>
				</div>
			</div>
		</div>
	);
};

const ProjectItemTour = () => {
	const { mounted } = useMounted();
	const classes = useStyles();
	return (
		<div className='row'>
			<div className='col-md-4'>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={Susy5}
					className={mounted ? classes.image : undefined}
					width='100%'
					alt=''
				/>
			</div>
			<div className='col-md-8 d-flex align-items-center'>
				<div>
					<p className='lead'>Board & Task Page</p>
					<p>
						<b>Click</b> on the title of a task on the board to see detailed
						information.
					</p>
				</div>
			</div>
			<TourNavigation />
		</div>
	);
};

const KnowledgeTour = () => {
	const { mounted } = useMounted();
	const classes = useStyles();
	return (
		<div className='row'>
			<div className='col-md-4'>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={Susy8}
					className={mounted ? classes.image : undefined}
					width='100%'
					alt=''
				/>
			</div>
			<div className='col-md-8 d-flex align-items-center'>
				<div>
					<p className='lead'>Knowledge</p>
					<p>Open the menu and click "Knowledge Grid"</p>
				</div>
			</div>
		</div>
	);
};

const KnowledgeItemTour = () => {
	const { mounted } = useMounted();
	const classes = useStyles();
	return (
		<div className='row'>
			<div className='col-md-4'>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={Susy7}
					className={mounted ? classes.image : undefined}
					width='100%'
					alt=''
				/>
			</div>
			<div className='col-md-8 d-flex align-items-center'>
				<div>
					<p className='lead'>Knowledge Item</p>
					<p>
						After using the above filtering, you can click on the item and view its
						detailed information.
					</p>
				</div>
			</div>
		</div>
	);
};

const SalesTour = () => {
	const { mounted } = useMounted();
	const classes = useStyles();
	return (
		<div className='row'>
			<div className='col-md-4'>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={Susy}
					className={mounted ? classes.image : undefined}
					width='100%'
					alt=''
				/>
			</div>
			<div className='col-md-8 d-flex align-items-center'>
				<div>
					<p className='lead'>Sales pages</p>
					<p>Examples of admin screens for e-commerce are given.</p>
				</div>
			</div>
			<TourNavigation />
		</div>
	);
};

const AppointmentTour = () => {
	const { mounted } = useMounted();
	const classes = useStyles();
	return (
		<div className='row'>
			<div className='col-md-4'>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={Susy4}
					className={mounted ? classes.image : undefined}
					width='100%'
					alt=''
				/>
			</div>
			<div className='col-md-8 d-flex align-items-center'>
				<div>
					<p className='lead'>Appointment Pages</p>
					<p>Examples of admin screens are given for appointment.</p>
					<p>
						Click <b>"Employee List"</b> to continue
					</p>
				</div>
			</div>
		</div>
	);
};

const EmployeeTour = () => {
	const { mounted } = useMounted();
	const classes = useStyles();
	return (
		<div className='row'>
			<div className='col-md-4'>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={Susy}
					className={mounted ? classes.image : undefined}
					width='100%'
					alt=''
				/>
			</div>
			<div className='col-md-8 d-flex align-items-center'>
				<div>
					<p className='lead'>Employee</p>
					<p>We wanted to show an example for employee profiles.</p>
					<p>Click the button to see detailed information.</p>
				</div>
			</div>
		</div>
	);
};

const CRMPagesTour = () => {
	const { mounted } = useMounted();
	const classes = useStyles();
	return (
		<div className='row'>
			<div className='col-md-4'>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={Susy5}
					className={mounted ? classes.image : undefined}
					width='100%'
					alt=''
				/>
			</div>
			<div className='col-md-8 d-flex align-items-center'>
				<div>
					<p className='lead'>CRM pages</p>
					<p>Examples are given for CRM screens.</p>
					<small>
						With accordion, you can expand the menu and browse the pages in it.
					</small>
				</div>
			</div>
			<TourNavigation />
		</div>
	);
};

const ChatPagesTour = () => {
	const { mounted } = useMounted();
	const classes = useStyles();
	return (
		<div className='row'>
			<div className='col-md-4'>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={Susy5}
					className={mounted ? classes.image : undefined}
					width='100%'
					alt=''
				/>
			</div>
			<div className='col-md-8 d-flex align-items-center'>
				<div>
					<p className='lead'>Chat pages</p>
					<p>Examples are given for Chat screens.</p>
					<small>
						With accordion, you can expand the menu and browse the pages in it.
					</small>
				</div>
			</div>
			<TourNavigation />
		</div>
	);
};

const DocTour = () => {
	const { mounted } = useMounted();
	const classes = useStyles();
	return (
		<div className='row'>
			<div className='col-md-4'>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={Susy9}
					className={mounted ? classes.image : undefined}
					width='100%'
					alt=''
				/>
			</div>
			<div className='col-md-8 d-flex align-items-center'>
				<div>
					<p className='lead'>Documentation</p>
					<p>Here you can find detailed usage of ui and form components for Facit.</p>
				</div>
			</div>
			<TourNavigation />
		</div>
	);
};

const LastTour = () => {
	const { mounted } = useMounted();
	const { setIsOpen, setCurrentStep } = useTour();
	const classes = useStyles();
	return (
		<div className='row'>
			<div className='col-md-4'>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={Susy10}
					className={mounted ? classes.image : undefined}
					width='100%'
					alt=''
				/>
			</div>
			<div className='col-md-8 d-flex align-items-center'>
				<div>
					<p className='lead'>Thank you for following me!</p>
					<p>I know it is very long, but I have actually presented very little of it.</p>
				</div>
			</div>
		</div>
	);
};

/**
 * Tour Steps
 */
const steps = [
	/**
	 * Dark Mode
	 * @step 0
	 */
	{
		selector: getTargetName('dark-mode'),
		content: () => <DarkModeTour />,
	},
	/**
	 * Last
	 * @step 22
	 */
	{
		selector: 'body',
		content: () => <LastTour />,
	},
];

export default steps;
