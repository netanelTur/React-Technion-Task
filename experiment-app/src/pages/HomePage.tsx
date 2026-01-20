import React, { useState, useEffect } from 'react';
import {
	Box,
	Container,
	Typography,
	Button,
	Card,
	CardContent,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Collapse,
} from '@mui/material';
import { colors } from '../theme/colors';
import { getCompletionCount, getCompletedExperiments } from '../utils/storage';
import { formatTimestamp } from '../utils/time';
import type { CompletedExperiment } from '../types/experiment';

const HomePage: React.FC = () => {
	const [completionCount, setCompletionCount] = useState(0);
	const [showResults, setShowResults] = useState(false);
	const [completedExperiments, setCompletedExperiments] = useState<CompletedExperiment[]>([]);

	useEffect(() => {
		setCompletionCount(getCompletionCount());
		setCompletedExperiments(getCompletedExperiments());
	}, []);

	const handleStartExperiment = () => {
		alert("Experiment flow coming soon!");
	};

	const toggleResults = () => {
		setShowResults(!showResults);
	};

	return (
		<Box
			sx={{
				minHeight: '100vh',
				bgcolor: colors.bgApp,
				py: 6,
			}}
		>
			<Container maxWidth="md">
				{/* Header */}
				<Box sx={{ mb: 6, textAlign: 'center' }}>
					<Typography
						variant="h4"
						sx={{
						fontWeight: 600,
						color: colors.textPrimary,
						mb: 2,
						}}
					>
						Experiment Data Collection System
					</Typography>
					<Typography
						variant="body1"
						sx={{
						color: colors.textBody,
						fontSize: '16px',
						}}
					>
						Welcome to the experiment. Track your interactions and view results.
					</Typography>
				</Box>

				{/* Stats Card */}
				<Card sx={{ mb: 4 }}>
					<CardContent sx={{ p: 4 }}>
						<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							gap: 2,
						}}
						>
							<Box>
								<Typography
								variant="body2"
								sx={{
									color: colors.textBody,
									mb: 1,
									fontSize: '14px',
								}}
								>
								Experiments Completed
								</Typography>
								<Typography
								variant="h4"
								sx={{
									fontWeight: 600,
									color: colors.textPrimary,
								}}
								>
								{completionCount}
								</Typography>
							</Box>
							<Box
								sx={{
								bgcolor: colors.accentBg,
								color: colors.accentText,
								px: 3,
								py: 1.5,
								borderRadius: '8px',
								fontWeight: 600,
								fontSize: '14px',
								}}
							>
								Total Runs
							</Box>
						</Box>
					</CardContent>
				</Card>

				{/* Action Buttons */}
				<Box
					sx={{
						display: 'flex',
						gap: 2,
						mb: 4,
					}}
				>
					<Button
						variant="contained"
						onClick={handleStartExperiment}
						sx={{
						flex: 1,
						py: 1.5,
						fontSize: '16px',
						fontWeight: 500,
						}}
					>
						Start New Experiment
					</Button>
					<Button
						variant="outlined"
						onClick={toggleResults}
						sx={{
						flex: 1,
						py: 1.5,
						fontSize: '16px',
						fontWeight: 500,
						borderColor: colors.borderCard,
						color: colors.textPrimary,
						'&:hover': {
							borderColor: colors.btnBg,
							bgcolor: 'rgba(30, 41, 59, 0.04)',
						},
						}}
					>
						{showResults ? 'Hide Results' : 'View Results'}
					</Button>
				</Box>

				{/* Results Table */}
				<Collapse in={showResults}>
					<Card>
						<CardContent sx={{ p: 0 }}>
							{completedExperiments.length === 0 ? (
								<Box sx={{ p: 4, textAlign: 'center' }}>
								<Typography variant="body1" color="text.secondary">
									No experiments completed yet. Start your first experiment!
								</Typography>
								</Box>
							) : (
								<TableContainer component={Paper} elevation={0}>
									<Table>
										<TableHead>
											<TableRow sx={{ bgcolor: colors.bgApp }}>
												<TableCell sx={{ fontWeight: 600, color: colors.textPrimary }}>
												Experiment ID
												</TableCell>
												<TableCell sx={{ fontWeight: 600, color: colors.textPrimary }}>
												Completed At
												</TableCell>
												<TableCell sx={{ fontWeight: 600, color: colors.textPrimary }} align="right">
												Total Clicks
												</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{completedExperiments.map((experiment) => (
												<TableRow
													key={experiment.experimentId}
													sx={{
														'&:last-child td, &:last-child th': { border: 0 },
														'&:hover': { bgcolor: colors.bgApp },
													}}
												>
												<TableCell sx={{ color: colors.textBody, fontSize: '14px' }}>
													{experiment.experimentId.slice(0, 8)}...
												</TableCell>
												<TableCell sx={{ color: colors.textBody, fontSize: '14px' }}>
													{formatTimestamp(experiment.completedAt)}
												</TableCell>
												<TableCell align="right" sx={{ color: colors.textBody, fontSize: '14px' }}>
													{experiment.buttonClicks.length}
												</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
							)}
						</CardContent>
					</Card>
				</Collapse>
			</Container>
		</Box>
	);
};

export default HomePage;
