export interface RobotResponseType {
	/**
	 * Props "checkPermission" merupakan sebuah fungsi yang digunakan untuk mendapatkan permission.
	 *
	 * Berikut contoh script nya:
	 * @example
	 * if (checkPermission('Edit') === true) {
	 * 		const message = 'User memiliki izin akses terhadap page ini';
	 * }
	 */
	checkPermission: boolean | string;
	/**
	 * Props "responseBE" merupakan sebuah object yang digunakan untuk mendapatkan data response dari API BE.
	 *
	 * Berikut contoh script nya:
	 * @example
	 * const name = responseBE.name;
	 */
	responseBE: any;
}
