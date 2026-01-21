import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Box,
	Container,
	Typography,
	Button,
	Card,
	CardContent,
	Grid,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@mui/material';
import { colors } from '../theme/colors';
import { getCompletionCount, getCompletedExperiments } from '../utils/storage';
import { useExperiment } from '../context/ExperimentContext';
import { formatTimestamp } from '../utils/time';
import type { CompletedExperiment } from '../types/experiment';

const HomePage: React.FC = () => {
	const navigate = useNavigate();
	const { startNewExperiment } = useExperiment();
	const [completionCount, setCompletionCount] = useState(0);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [completedExperiments, setCompletedExperiments] = useState<CompletedExperiment[]>([]);

	useEffect(() => {
		setCompletionCount(getCompletionCount());
		setCompletedExperiments(getCompletedExperiments());
	}, []);

	const handleStartExperiment = () => {
		startNewExperiment();
		navigate('/experiment/1');
	};

	const handleViewResults = () => {
		setCompletedExperiments(getCompletedExperiments());
		setDialogOpen(true);
	};

	const cardStyle = {
		bgcolor: colors.bgCard,
		border: `1px solid ${colors.borderCard}`,
		borderRadius: '20px',
		boxShadow: `0px 4px 20px ${colors.shadowSubtle}`,
		height: '100%',
		// Height: smaller on mobile, tall on desktop
		minHeight: { xs: '380px', md: '550px' },
		// Width: full width on mobile, fixed 320px on desktop to allow 'auto' packing
		width: { xs: '100%', md: '320px' },
		display: 'flex',
		flexDirection: 'column',
		transition: 'transform 0.2s',
		'&:hover': {
			transform: 'translateY(-5px)',
		}
	};

	const badgeStyle = {
		display: 'inline-block',
		bgcolor: colors.badgeBg,
		color: colors.accentText,
		px: 2,
		py: 0.5,
		borderRadius: '6px',
		fontSize: '0.875rem',
		fontWeight: 600,
		mb: 3,
		width: 'fit-content',
	};

	const buttonStyle = {
		bgcolor: colors.btnBg,
		color: colors.btnText,
		py: 2,
		fontSize: '1.1rem',
		fontWeight: 500,
		textTransform: 'none',
		borderRadius: '12px',
		'&:hover': {
			bgcolor: colors.btnHover,
		},
	};

	return (
		<Box
			sx={{
				minHeight: '100vh',
				bgcolor: colors.bgApp,
				display: 'flex',
				alignItems: 'center',
				py: 8,
			}}
		>
			<Container maxWidth="xl">
				{/* Hero Section */}
				<Box sx={{ textAlign: 'center', mb: 8 }}>
					<Typography
						sx={{
							fontSize: { xs: '2.5rem', md: '3.5rem' },
							fontWeight: 600,
							color: colors.textPrimary,
							mb: 2,
							lineHeight: 1.2,
						}}
					>
						Quantifying Human{' '}
						<Box component="span" sx={{ fontWeight: 300, fontStyle: 'italic' }}>
							Intuition
						</Box>
					</Typography>

					<Typography
						sx={{
							fontSize: { xs: '1rem', md: '1.125rem' },
							color: colors.textBody,
							maxWidth: '700px',
							mx: 'auto',
							lineHeight: 1.6,
						}}
					>
						A micro-experiment designed to measure visual association and reaction times.
						Participate in a short session to help us map decision-making patterns.
					</Typography>
				</Box>

				{/* Grid Section */}
				<Grid 
					container 
					// Spacing: 32px on mobile, 16px on desktop
					spacing={{ xs: 4, md: 2 }} 
					justifyContent="center" 
					alignItems="stretch"
				>
					
					{/* Card 1 */}
					<Grid size={{ xs: 12, md: 'auto' }}>
						<Card sx={cardStyle}>
							<CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', flex: 1 }}>
								<Box sx={badgeStyle}>
									Action
								</Box>

								<Typography variant="h5" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 2 }}>
									Start New Experiment
								</Typography>

								<Typography sx={{ color: colors.textBody, fontSize: '0.95rem', mb: 4, flex: 1 }}>
									Begin a new session to test your visual associations and reaction times.
								</Typography>

								<Box sx={{ mt: 'auto' }}>
									<Button
										variant="contained"
										fullWidth
										onClick={handleStartExperiment}
										sx={buttonStyle}
									>
										Start Experiment
									</Button>
								</Box>
							</CardContent>
						</Card>
					</Grid>
					
					{/* Card 2 */}
					<Grid size={{ xs: 12, md: 'auto' }}>
						<Card sx={cardStyle}>
							<CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', flex: 1 }}>
								<Box sx={badgeStyle}>
									History
								</Box>

								<Typography variant="h5" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 2 }}>
									View Past Results
								</Typography>

								<Typography sx={{ color: colors.textBody, fontSize: '0.95rem', mb: 4, flex: 1 }}>
									Review detailed data from your previous experiment sessions.
								</Typography>

								<Box sx={{ mt: 'auto' }}>
									<Button
										variant="contained"
										fullWidth
										onClick={handleViewResults}
										sx={buttonStyle}
									>
										View Results
									</Button>
								</Box>
							</CardContent>
						</Card>
					</Grid>

					{/* Card 3 */}
					<Grid size={{ xs: 12, md: 'auto' }}>
						<Card sx={cardStyle}>
							<CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', flex: 1 }}>
								<Box sx={badgeStyle}>
									Status
								</Box>

								<Typography variant="h5" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 2 }}>
									Experiments Completed
								</Typography>

								<Typography sx={{ color: colors.textBody, fontSize: '0.95rem', mb: 4, flex: 1 }}>
									Total number of experiments you've successfully completed on this device.
								</Typography>

								<Typography sx={{ fontSize: '4rem', fontWeight: 600, color: colors.textPrimary, textAlign: 'center' }}>
									{completionCount}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>

				{/* Results Dialog */}
				<Dialog
					open={dialogOpen}
					onClose={() => setDialogOpen(false)}
					maxWidth="lg"
					fullWidth
				>
					<DialogTitle sx={{ fontWeight: 600, color: colors.textPrimary }}>
						Past Experiment Results
					</DialogTitle>
					<DialogContent>
						{completedExperiments.length === 0 ? (
							<Typography sx={{ color: colors.textBody, py: 4, textAlign: 'center' }}>
								No completed experiments yet. Start your first experiment!
							</Typography>
						) : (
							<TableContainer component={Paper} elevation={0} sx={{ border: `1px solid ${colors.borderCard}` }}>
								<Table>
									<TableHead>
										<TableRow sx={{ bgcolor: colors.bgApp }}>
											<TableCell sx={{ fontWeight: 600 }}>#</TableCell>
											<TableCell sx={{ fontWeight: 600 }}>Experiment ID</TableCell>
											<TableCell sx={{ fontWeight: 600 }}>First Click</TableCell>
											<TableCell sx={{ fontWeight: 600 }}>Likert Rating</TableCell>
											<TableCell sx={{ fontWeight: 600 }}>Completed At</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{completedExperiments.map((exp, index) => {
											const likertClicks = exp.buttonClicks.filter(click => click.buttonType === 'likert');
											const finalLikert = likertClicks.length > 0 ? likertClicks[likertClicks.length - 1] : null;
											
											return (
												<TableRow key={exp.experimentId} sx={{ '&:last-child td': { border: 0 } }}>
													<TableCell>{index + 1}</TableCell>
													<TableCell sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
														{exp.experimentId.substring(0, 8)}...
													</TableCell>
													<TableCell>
														{exp.firstClickTimestamp ? formatTimestamp(exp.firstClickTimestamp) : 'N/A'}
													</TableCell>
													<TableCell>
														{finalLikert ? finalLikert.buttonValue : 'N/A'}
													</TableCell>
													<TableCell>
														{formatTimestamp(exp.completedAt)}
													</TableCell>
												</TableRow>
											);
										})}
									</TableBody>
								</Table>
							</TableContainer>
						)}
					</DialogContent>
					<DialogActions sx={{ p: 2 }}>
						<Button
							onClick={() => setDialogOpen(false)}
							variant="contained"
							sx={{
								bgcolor: colors.btnBg,
								color: colors.btnText,
								'&:hover': {
									bgcolor: colors.btnBg,
									opacity: 0.9,
								},
							}}
						>
							Close
						</Button>
					</DialogActions>
				</Dialog>
			</Container>
		</Box>
	);
};

export default HomePage;