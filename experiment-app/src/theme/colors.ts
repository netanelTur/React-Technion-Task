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

	// Accent colors
	accentBg: '#DCFCE7',
	accentText: '#166534',

	// Button colors
	btnBg: '#1E293B',
	btnText: '#FFFFFF',
} as const;

export type ColorKey = keyof typeof colors;
