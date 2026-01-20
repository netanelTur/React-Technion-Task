import type { StorageData, CompletedExperiment } from '../types/experiment';

const STORAGE_KEY = 'experiment_data';

const defaultData: StorageData = {
	completionCount: 0,
	completedExperiments: [],
};

/**
 * Load data from localStorage
 */
export const loadStorageData = (): StorageData => {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
	if (!stored) return defaultData;
		return JSON.parse(stored);
	} catch (error) {
		console.error("Failed to load storage data:", error);
		return defaultData;
	}
};

/**
 * Save experiment data to localStorage
 */
export const saveCompletedExperiment = (experiment: CompletedExperiment): void => {
	try {
		const data = loadStorageData();
		data.completionCount += 1;
		data.completedExperiments.push(experiment);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
	} catch (error) {
		console.error("Failed to save experiment:", error);
	}
};

/**
 * Get completion count
 */
export const getCompletionCount = (): number => {
	return loadStorageData().completionCount;
};

/**
 * Get all completed experiments
 */
export const getCompletedExperiments = (): CompletedExperiment[] => {
	return loadStorageData().completedExperiments;
};

/**
 * Clear all data (useful for testing)
 */
export const clearAllData = (): void => {
	localStorage.removeItem(STORAGE_KEY);
};
