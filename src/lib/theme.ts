import {
	createMuiTheme,
	responsiveFontSizes,
	ThemeOptions
} from '@material-ui/core/styles';

const options: ThemeOptions = {
	palette: {
		type: 'dark',
		primary: {
			dark: '#ff4500',
			main: '#ff5700',
			contrastText: '#fff'
		},
		secondary: {
			dark: '#336699',
			main: '#5f99cf',
			light: '#cee3f8',
			contrastText: '#111'
		}
	},
	typography: {
		fontFamily: 'Poppins',
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700,
		button: {
			textTransform: 'none'
		}
	}
};

export const theme = responsiveFontSizes(createMuiTheme(options));
