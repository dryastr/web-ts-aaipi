import { RobotResponseType } from './robot-response-type';

export interface FormType {
	/**
	 * Props "defaultValue" merupakan sebuah props yang digunakan untuk merender nilai default pada suatu input.
	 *
	 * Nilainya bisa statis seperti script di bawah ini:
	 * @example
	 * defaultValue: 'Nilai custom'
	 *
	 * Atau nilainya bisa dinamis dari data API BE seperti script di bawah ini:
	 * @example
	 * defaultValue: ({ responseBE }) => {
	 * 	return responseBE.description;
	 * }
	 */
	defaultValue?: (data: RobotResponseType) => any;
	query?: (data: RobotResponseType) => any;
	[key: string]: any;
}
