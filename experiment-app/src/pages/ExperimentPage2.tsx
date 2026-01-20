import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import { useExperiment } from '../context/ExperimentContext';
import { colors } from '../theme/colors';
import { formatTimestamp } from '../utils/time';

export default function ExperimentPage2() {
	const navigate = useNavigate();
	const { currentExperiment, completeExperiment, resetExperiment } = useExperiment();

	// Redirect to home if no experiment is active
	useEffect(() => {
		if (!currentExperiment) {
			navigate('/');
		}
	}, [currentExperiment, navigate]);

	const handleFinish = () => {
		completeExperiment();
		navigate('/');
	};

	const handleReturnHome = () => {
		if (window.confirm('Are you sure you want to return home? Your experiment data will not be saved.')) {
			resetExperiment();
			navigate('/');
		}
	};

	if (!currentExperiment) {
		return null;
	}

	const likertClicks = currentExperiment.buttonClicks.filter((click) => click.buttonType === 'likert');

	return (
		<Box
			sx={{
				minHeight: '100vh',
				bgcolor: colors.bgApp,
				py: 4,
			}}
		>
			<Container maxWidth="lg">
				{/* Header */}
				<Box sx={{ mb: 4, textAlign: 'center' }}>
					<Typography
						variant="h4"
						sx={{
							fontWeight: 600,
							color: colors.textPrimary,
							mb: 2,
						}}
					>
						Experiment Results
					</Typography>
					<Typography
						sx={{
							color: colors.textBody,
							fontSize: '1rem',
						}}
					>
						Review your experiment data below
					</Typography>
				</Box>

				{/* Experiment ID Card */}
				<Card
					sx={{
						border: `1px solid ${colors.borderCard}`,
						borderRadius: '20px',
						boxShadow: 'none',
						mb: 3,
					}}
				>
					<CardContent sx={{ p: 3 }}>
						<Typography
							sx={{
								color: colors.textBody,
								fontSize: '0.875rem',
								mb: 0.5,
							}}
						>
							Experiment ID
						</Typography>
						<Typography
							sx={{
								fontWeight: 600,
								color: colors.textPrimary,
								fontFamily: 'monospace',
								fontSize: '1rem',
							}}
						>
							{currentExperiment.experimentId}
						</Typography>
					</CardContent>
				</Card>

				{/* First Click Timestamp Card */}
				<Card
					sx={{
						border: `1px solid ${colors.borderCard}`,
						borderRadius: '20px',
						boxShadow: 'none',
						mb: 3,
					}}
				>
					<CardContent sx={{ p: 3 }}>
						<Typography
							sx={{
								color: colors.textBody,
								fontSize: '0.875rem',
								mb: 0.5,
							}}
						>
							First Click Timestamp (UTC)
						</Typography>
						<Typography
							sx={{
								fontWeight: 600,
								color: colors.textPrimary,
								fontSize: '1rem',
							}}
						>
							{currentExperiment.firstClickTimestamp
								? formatTimestamp(currentExperiment.firstClickTimestamp)
								: 'No clicks recorded'}
						</Typography>
					</CardContent>
				</Card>

				{/* Likert Scale Data */}
				{likertClicks.length > 0 && (
					<Card
						sx={{
							border: `1px solid ${colors.borderCard}`,
							borderRadius: '20px',
							boxShadow: 'none',
							mb: 3,
						}}
					>
						<CardContent sx={{ p: 3 }}>
							<Typography
								variant="h6"
								sx={{
									fontWeight: 600,
									color: colors.textPrimary,
									mb: 2,
								}}
							>
								Likert Scale Ratings
							</Typography>
							<TableContainer component={Paper} elevation={0} sx={{ border: `1px solid ${colors.borderCard}` }}>
								<Table>
									<TableHead>
										<TableRow sx={{ bgcolor: colors.bgApp }}>
											<TableCell sx={{ fontWeight: 600 }}>Rating Value</TableCell>
											<TableCell sx={{ fontWeight: 600 }}>Timestamp (UTC)</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{likertClicks.map((click, index) => (
											<TableRow key={index} sx={{ '&:last-child td': { border: 0 } }}>
												<TableCell>{click.buttonValue}</TableCell>
												<TableCell>{formatTimestamp(click.timestamp)}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</CardContent>
					</Card>
				)}

				{/* Action Buttons */}
				<Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
					<Button
						variant="contained"
						fullWidth
						onClick={handleFinish}
						sx={{
							py: 2,
							fontSize: '1rem',
							fontWeight: 600,
							bgcolor: colors.btnBg,
							color: colors.btnText,
							'&:hover': {
								bgcolor: colors.btnBg,
								opacity: 0.9,
							},
						}}
					>
						Save & Return Home
					</Button>
					<Button
						variant="outlined"
						fullWidth
						onClick={handleReturnHome}
						sx={{
							py: 2,
							fontSize: '1rem',
						}}
					>
						Discard & Return Home
					</Button>
				</Box>
			</Container>
		</Box>
	);
}
