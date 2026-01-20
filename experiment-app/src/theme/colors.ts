/**
 * Color palette for the Experiment Data Collection System
 */
export const colors = {
	// Background colors
	bgApp: '#F8FAFC',
	bgCard: '#FFFFFF',
	borderCard: '#E2E8F0',

	// Text colors
	textPrimary: '#0F172A',
	textBody: '#64748B',

	// Accent colors (Green)
	accentText: '#166534',
	badgeBg: '#7ADEA0',     

	// Button colors
	btnBg: '#1E293B',
	btnText: '#FFFFFF',
	btnHover: '#0F172A',

	// Misc
	shadowSubtle: 'rgba(0,0,0,0.05)',
} as const;

export type ColorKey = keyof typeof colors;