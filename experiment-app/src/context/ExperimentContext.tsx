import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { ButtonClick, ExperimentData, ButtonType } from '../types/experiment';
import { getCurrentUTCTimestamp } from '../utils/time';
import { saveCompletedExperiment } from '../utils/storage';

interface ExperimentContextType {
	currentExperiment: ExperimentData | null;
	startNewExperiment: () => void;
	recordFirstClick: () => void;
	recordClick: (buttonValue: string, buttonType: ButtonType) => void;
	completeExperiment: () => void;
	resetExperiment: () => void;
}

const ExperimentContext = createContext<ExperimentContextType | undefined>(undefined);

export function ExperimentProvider({ children }: { children: ReactNode }) {
	const [currentExperiment, setCurrentExperiment] = useState<ExperimentData | null>(null);

	const startNewExperiment = useCallback(() => {
		const newExperiment: ExperimentData = {
			experimentId: uuidv4(),
			firstClickTimestamp: null,
			buttonClicks: [],
			completedAt: null,
		};
		setCurrentExperiment(newExperiment);
	}, []);

	const recordFirstClick = useCallback(() => {
		setCurrentExperiment((prev) => {
			if (!prev || prev.firstClickTimestamp) return prev;
			
			return {
				...prev,
				firstClickTimestamp: getCurrentUTCTimestamp(),
			};
		});
	}, []);

	const recordClick = useCallback((buttonValue: string, buttonType: ButtonType) => {
		setCurrentExperiment((prev) => {
			if (!prev) return prev;

			const timestamp = getCurrentUTCTimestamp();
			const newClick: ButtonClick = {
				timestamp,
				buttonValue,
				buttonType,
			};

			// Set first click timestamp if this is the first click
			const firstClickTimestamp = prev.firstClickTimestamp ?? timestamp;

			return {
				...prev,
				firstClickTimestamp,
				buttonClicks: [...prev.buttonClicks, newClick],
			};
		});
	}, []);

	const completeExperiment = useCallback(() => {
		if (!currentExperiment) return;

		const completedExperiment = {
			...currentExperiment,
			completedAt: getCurrentUTCTimestamp(),
		};

		saveCompletedExperiment(completedExperiment);
		setCurrentExperiment(null);
	}, [currentExperiment]);

	const resetExperiment = useCallback(() => {
		setCurrentExperiment(null);
	}, []);

	return (
		<ExperimentContext.Provider
			value={{
				currentExperiment,
				startNewExperiment,
				recordFirstClick,
				recordClick,
				completeExperiment,
				resetExperiment,
			}}
		>
			{children}
		</ExperimentContext.Provider>
	);
}

export function useExperiment() {
	const context = useContext(ExperimentContext);
	if (context === undefined) {
		throw new Error('useExperiment must be used within an ExperimentProvider');
	}
	return context;
}
