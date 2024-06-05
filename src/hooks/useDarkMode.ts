import { useContext } from 'react';
import ThemeContext from 'src/context/themeContext';

export default function useDarkMode() {
	const { darkModeStatus, setDarkModeStatus } = useContext(ThemeContext);

	const themeStatus: 'dark' | 'light' = darkModeStatus ? 'dark' : 'light';

	return { themeStatus, darkModeStatus, setDarkModeStatus };
}
