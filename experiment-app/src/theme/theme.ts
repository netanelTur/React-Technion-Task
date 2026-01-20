import { createTheme } from '@mui/material/styles';
import { colors } from './colors';

/**
 * MUI Theme configuration
 */
export const theme = createTheme({
	palette: {
		primary: {
			main: colors.btnBg,
			contrastText: colors.btnText,
		},
			background: {
			default: colors.bgApp,
			paper: colors.bgCard,
		},
		text: {
			primary: colors.textPrimary,
			secondary: colors.textBody,
		},
	},
	typography: {
		fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
		h4: {
			fontWeight: 600,
			color: colors.textPrimary,
		},
		h6: {
			fontWeight: 600,
			color: colors.textPrimary,
		},
		body1: {
			color: colors.textBody,
		},
		body2: {
			color: colors.textBody,
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
				textTransform: 'none',
				borderRadius: '8px',
				fontWeight: 500,
				padding: '10px 24px',
				},
				contained: {
				backgroundColor: colors.btnBg,
				color: colors.btnText,
				'&:hover': {
					backgroundColor: '#0F172A',
				},
				},
			},
			},
			MuiCard: {
			styleOverrides: {
				root: {
				borderRadius: '12px',
				border: `1px solid ${colors.borderCard}`,
				boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
				},
			},
		},
	},
});
