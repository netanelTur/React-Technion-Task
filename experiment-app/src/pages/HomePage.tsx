import React, { useState, useEffect } from 'react';
import {
	Box,
	Container,
	Typography,
	Button,
	Card,
	CardContent,
	Grid,
} from '@mui/material';
import { colors } from '../theme/colors';
import { getCompletionCount, getCompletedExperiments } from '../utils/storage';

const HomePage: React.FC = () => {
	const [completionCount, setCompletionCount] = useState(0);

	useEffect(() => {
		setCompletionCount(getCompletionCount());
		getCompletedExperiments();
	}, []);

	const handleStartExperiment = () => {
		alert('Experiment flow coming soon!');
	};

	const handleViewResults = () => {
		alert('Results viewer coming soon!');
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
			</Container>
		</Box>
	);
};

export default HomePage;