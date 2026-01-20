/**
 * Get current UTC timestamp in ISO format
 */
export const getCurrentUTCTimestamp = (): string => {
	return new Date().toISOString();
};

/**
 * Format UTC timestamp for display
 */
export const formatTimestamp = (isoString: string): string => {
	const date = new Date(isoString);
	return date.toLocaleString('en-US', {
		timeZone: 'UTC',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false,
	});
};
