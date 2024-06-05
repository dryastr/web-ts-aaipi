import dayjs, { Dayjs } from 'dayjs';
import UserImage from 'src/assets/img/wanna/wanna1.png';
import UserImage2 from 'src/assets/img/wanna/wanna2.png';
import UserImage3 from 'src/assets/img/wanna/wanna3.png';
import UserImage4 from 'src/assets/img/wanna/wanna4.png';
import UserImage5 from 'src/assets/img/wanna/wanna5.png';
import UserImage6 from 'src/assets/img/wanna/wanna6.png';
import UserImage7 from 'src/assets/img/wanna/wanna7.png';
import PAYMENTS from './enumPaymentMethod';

const data: {
	id: number;
	name: string;
	email: string;
	type: string;
	membershipDate: Dayjs;
	balance: number;
	payout: string;
	src: string;
	isOnline?: boolean;
	streetAddress: string;
	streetAddress2: string;
	city: string;
	state: string;
	stateFull: string;
	zip: string;
	streetAddressDelivery: string;
	streetAddress2Delivery: string;
	cityDelivery: string;
	stateDelivery: string;
	stateFullDelivery: string;
	zipDelivery: string;
	phone: string;
	latitude: string;
	longitude: string;
}[] = [
	{
		id: 1,
		name: 'Jennifer Ferriera',
		email: 'JenniferFerriera@dayrep.com',
		type: 'Author',
		membershipDate: dayjs().add(-1, 'month'),
		balance: 580,
		payout: PAYMENTS.PAYPAL.name,
		src: UserImage3,
		streetAddress: '245 May Street',
		streetAddress2: '',
		city: 'Ashland',
		state: 'KY',
		stateFull: 'Kentucky',
		zip: '41101',
		streetAddressDelivery: '245 May Street',
		streetAddress2Delivery: '',
		cityDelivery: 'Ashland',
		stateDelivery: 'KY',
		stateFullDelivery: 'Kentucky',
		zipDelivery: '41101',
		phone: '606-694-1746',
		latitude: '38.573860',
		longitude: '-82.636566',
	},
	{
		id: 2,
		name: 'Ashley M. Maclin',
		email: 'AshleyMMaclin@dayrep.com',
		type: 'Author',
		membershipDate: dayjs().add(-2, 'month'),
		balance: 124,
		payout: PAYMENTS.SWIFT.name,
		src: UserImage5,
		streetAddress: '1296 Sunny Glen Lane',
		streetAddress2: '',
		city: 'Cleveland',
		state: 'OH',
		stateFull: 'Ohio',
		zip: '44114',
		streetAddressDelivery: '1296 Sunny Glen Lane',
		streetAddress2Delivery: '',
		cityDelivery: 'Cleveland',
		stateDelivery: 'OH',
		stateFullDelivery: 'Ohio',
		zipDelivery: '44114',
		phone: '216-835-3496',
		latitude: '41.493382',
		longitude: '-81.703659',
	},
	{
		id: 3,
		name: 'Katie A. Ruiz',
		email: 'KatieARuiz@rhyta.com',
		type: 'Elite Author',
		membershipDate: dayjs().add(-2, 'month'),
		balance: 1089,
		payout: PAYMENTS.PAYPAL.name,
		src: UserImage6,
		streetAddress: '2463 Daffodil Lane',
		streetAddress2: '',
		city: 'Lorton',
		state: 'VA',
		stateFull: 'Virginia',
		zip: '22079',
		streetAddressDelivery: '2463 Daffodil Lane',
		streetAddress2Delivery: '',
		cityDelivery: 'Lorton',
		stateDelivery: 'VA',
		stateFullDelivery: 'Virginia',
		zipDelivery: '22079',
		phone: '703-446-6588',
		latitude: '38.752754',
		longitude: '-77.172539',
	},
	{
		id: 4,
		name: 'Felix L. Harley',
		email: 'FelixLHarley@rhyta.com',
		type: 'Author',
		membershipDate: dayjs().add(-2, 'month'),
		balance: 120,
		payout: PAYMENTS.PAYONEER.name,
		src: UserImage4,
		isOnline: true,
		streetAddress: '3785 Boone Crockett Lane',
		streetAddress2: '',
		city: 'Bremerton',
		state: 'WA',
		stateFull: 'Washington',
		zip: '98337',
		streetAddressDelivery: '3785 Boone Crockett Lane',
		streetAddress2Delivery: '',
		cityDelivery: 'Bremerton',
		stateDelivery: 'WA',
		stateFullDelivery: 'Washington',
		zipDelivery: '98337',
		phone: '360-478-3198',
		latitude: '47.565636',
		longitude: '-122.731689',
	},
	{
		id: 5,
		name: 'Frances Berry',
		email: 'FrancesBerry@armyspy.com',
		type: 'Author',
		membershipDate: dayjs().add(-2, 'month'),
		balance: 890,
		payout: PAYMENTS.SWIFT.name,
		src: UserImage7,
		streetAddress: '4941 Petunia Way',
		streetAddress2: '',
		city: 'Hueytown',
		state: 'AL',
		stateFull: 'Alabama',
		zip: '35023',
		streetAddressDelivery: '4941 Petunia Way',
		streetAddress2Delivery: '',
		cityDelivery: 'Hueytown',
		stateDelivery: 'AL',
		stateFullDelivery: 'Alabama',
		zipDelivery: '35023',
		phone: '205-744-3577',
		latitude: '33.471535',
		longitude: '-86.999886',
	},
	{
		id: 6,
		name: 'Jonathan B. Richardson',
		email: 'JonathanBRichardson@teleworm.us',
		type: 'Author',
		membershipDate: dayjs().add(-2, 'month'),
		balance: 437,
		payout: PAYMENTS.PAYPAL.name,
		src: UserImage,
		streetAddress: '2248 Sigley Road',
		streetAddress2: '',
		city: 'Topeka',
		state: 'KS',
		stateFull: 'Kansas',
		zip: '66608',
		streetAddressDelivery: '2248 Sigley Road',
		streetAddress2Delivery: '',
		cityDelivery: 'Topeka',
		stateDelivery: 'KS',
		stateFullDelivery: 'Kansas',
		zipDelivery: '66608',
		phone: '785-575-8814',
		latitude: '39.049568',
		longitude: '-95.731155',
	},
	{
		id: 7,
		name: 'Patrick M. Whitaker',
		email: 'PatrickMWhitaker@armyspy.com',
		type: 'Author',
		membershipDate: dayjs().add(-2, 'month'),
		balance: 678,
		payout: PAYMENTS.PAYONEER.name,
		src: UserImage4,
		streetAddress: '3392 Melm Street',
		streetAddress2: '',
		city: 'Wellborn',
		state: 'FL',
		stateFull: 'Florida',
		zip: '32094',
		streetAddressDelivery: '3392 Melm Street',
		streetAddress2Delivery: '',
		cityDelivery: 'Wellborn',
		stateDelivery: 'FL',
		stateFullDelivery: 'Florida',
		zipDelivery: '32094',
		phone: '386-963-2938',
		latitude: '30.145744',
		longitude: '-82.792900',
	},
	{
		id: 8,
		name: 'Arthur S. Meyer',
		email: 'ArthurSMeyer@rhyta.com',
		type: 'Author',
		membershipDate: dayjs().add(-2, 'month'),
		balance: 703,
		payout: PAYMENTS.PAYONEER.name,
		src: UserImage2,
		streetAddress: '4558 Dancing Dove Lane',
		streetAddress2: '',
		city: 'New York',
		state: 'NY',
		stateFull: 'New York',
		zip: '10013',
		streetAddressDelivery: '4558 Dancing Dove Lane',
		streetAddress2Delivery: '',
		cityDelivery: 'New York',
		stateDelivery: 'NY',
		stateFullDelivery: 'New York',
		zipDelivery: '10013',
		phone: '347-584-6730',
		latitude: '40.731033',
		longitude: '-73.981125',
	},
	{
		id: 9,
		name: 'Frances L. Wilson',
		email: 'FrancesLWilson@jourrapide.com',
		type: 'Author',
		membershipDate: dayjs().add(-2, 'month'),
		balance: 389,
		payout: PAYMENTS.PAYPAL.name,
		src: UserImage6,
		streetAddress: '1946 Juniper Drive',
		streetAddress2: '',
		city: 'Mount Pleasant',
		state: 'MI',
		stateFull: 'Michigan',
		zip: '48858',
		streetAddressDelivery: '1946 Juniper Drive',
		streetAddress2Delivery: '',
		cityDelivery: 'Mount Pleasant',
		stateDelivery: 'MI',
		stateFullDelivery: 'Michigan',
		zipDelivery: '48858',
		phone: '989-817-2934',
		latitude: '43.598652',
		longitude: '-84.722626',
	},
	{
		id: 10,
		name: 'Jayden Holloway',
		email: 'JaydenHolloway@rhyta.com',
		type: 'Author',
		membershipDate: dayjs().add(-2, 'month'),
		balance: 943,
		payout: PAYMENTS.PAYPAL.name,
		src: UserImage2,
		streetAddress: '4904 Cerullo Road',
		streetAddress2: '',
		city: 'Louisville',
		state: 'KY',
		stateFull: 'Kentucky',
		zip: '40299',
		streetAddressDelivery: '4904 Cerullo Road',
		streetAddress2Delivery: '',
		cityDelivery: 'Louisville',
		stateDelivery: 'KY',
		stateFullDelivery: 'Kentucky',
		zipDelivery: '40299',
		phone: '502-475-8381',
		latitude: '38.118217',
		longitude: '-85.580116',
	},
	{
		id: 11,
		name: 'Leon Moran',
		email: 'LeonMoran@teleworm.us',
		type: 'Author',
		membershipDate: dayjs().add(-2, 'month'),
		balance: 738,
		payout: PAYMENTS.SWIFT.name,
		src: UserImage4,
		streetAddress: '111 Brannon Street',
		streetAddress2: '',
		city: 'City Of Commerce',
		state: 'CA',
		stateFull: 'California',
		zip: '90040',
		streetAddressDelivery: '111 Brannon Street',
		streetAddress2Delivery: '',
		cityDelivery: 'City Of Commerce',
		stateDelivery: 'CA',
		stateFullDelivery: 'California',
		zipDelivery: '90040',
		phone: '213-280-6792',
		latitude: '34.001846',
		longitude: '-118.092308',
	},
];
export default data;
