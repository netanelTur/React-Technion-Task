/**
 * Type definitions for experiment data collection
 */
export type ButtonType = 'likert' | 'random-word' | 'submit';

export interface ButtonClick {
	timestamp: string; // UTC ISO string
	buttonValue: string;
	buttonType: ButtonType;
}

export interface ExperimentData {
	experimentId: string;
	firstClickTimestamp: string | null; // UTC ISO string
	buttonClicks: ButtonClick[];
	completedAt: string | null; // UTC ISO string
}

export interface CompletedExperiment extends ExperimentData {
	completedAt: string; // Required for completed experiments
}

export interface StorageData {
	completionCount: number;
	completedExperiments: CompletedExperiment[];
}
