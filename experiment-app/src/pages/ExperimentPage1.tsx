import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, ButtonGroup, Card, CardContent } from '@mui/material';
import { useExperiment } from '../context/ExperimentContext';
import { colors } from '../theme/colors';

const WORD_API_URL = "https://random-word-api.herokuapp.com/word";
const WORD_API_PARAMS = { number: 3 };

const IMAGE_API_URL = "https://picsum.photos/400/300";

export default function ExperimentPage1() {
	const navigate = useNavigate();
	const { currentExperiment, recordFirstClick, recordClick } = useExperiment();
	const [selectedLikert, setSelectedLikert] = useState<number | null>(null);
	const [randomWords, setRandomWords] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	// Redirect to home if no experiment is active
	useEffect(() => {
		if (!currentExperiment) {
			navigate('/');
		}
	}, [currentExperiment, navigate]);

	// Fetch random words from API
	useEffect(() => {
		async function fetchRandomWords() {
			try {
				const response = await fetch(`${WORD_API_URL}?number=${WORD_API_PARAMS.number}`);
				const words = await response.json();
				setRandomWords(words);
			} catch (error) {
				console.error('Failed to fetch random words:', error);
				setRandomWords(['Apple', 'Banana', 'Cherry']); // Fallback words
			} finally {
				setIsLoading(false);
			}
		}
		fetchRandomWords();
	}, []);

	// Handle any click on the page to record first click timestamp
	useEffect(() => {
		function handlePageClick() {
			recordFirstClick();
		}
		document.addEventListener('click', handlePageClick);
		return () => document.removeEventListener('click', handlePageClick);
	}, [recordFirstClick]);

	const handleLikertClick = (value: number) => {
		setSelectedLikert(value);
		recordClick(value.toString(), 'likert');
	};

	const handleWordClick = (word: string) => {
		recordClick(word, 'random-word');
	};

	const handleSubmit = () => {
		if (selectedLikert === null) {
			alert('Please select a Likert scale value before submitting.');
			return;
		}
		recordClick('Submit', 'submit');
		navigate('/experiment/2');
	};

	const handleReturnHome = () => {
		if (window.confirm('Are you sure you want to return home? Your experiment data will not be saved.')) {
			navigate('/');
		}
	};

	if (!currentExperiment) {
		return null;
	}

	return (
		<Box
			sx={{
				minHeight: '100vh',
				bgcolor: colors.bgApp,
				py: 4,
			}}
		>
			<Container maxWidth="md">
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
						Experiment – Page 1
					</Typography>
					<Typography
						sx={{
							color: colors.textBody,
							fontSize: '1rem',
						}}
					>
						Please interact with the elements below and complete the experiment.
					</Typography>
				</Box>

				{/* Main Card */}
				<Card
					sx={{
						border: `1px solid ${colors.borderCard}`,
						borderRadius: '20px',
						boxShadow: 'none',
					}}
				>
					<CardContent sx={{ p: 4 }}>
						{/* Image Section */}
						<Box
							sx={{
								mb: 4,
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<Box
								component="img"
								src={IMAGE_API_URL}
								alt="Experiment image"
								sx={{
									maxWidth: '100%',
									height: 'auto',
									borderRadius: '12px',
									boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
								}}
							/>
						</Box>

						{/* Likert Scale Section */}
						<Box sx={{ mb: 4 }}>
							<Typography
								variant="h6"
								sx={{
									fontWeight: 600,
									color: colors.textPrimary,
									mb: 2,
								}}
							>
								Rate your impression (1-4):
							</Typography>
							<ButtonGroup fullWidth size="large">
								{[1, 2, 3, 4].map((value) => (
									<Button
										key={value}
										onClick={() => handleLikertClick(value)}
										variant={selectedLikert === value ? 'contained' : 'outlined'}
										sx={{
											py: 2,
											fontSize: '1.2rem',
											fontWeight: 600,
											...(selectedLikert === value && {
												bgcolor: colors.btnBg,
												color: colors.btnText,
												'&:hover': {
													bgcolor: colors.btnBg,
													opacity: 0.9,
												},
											}),
										}}
									>
										{value}
									</Button>
								))}
							</ButtonGroup>
						</Box>

						{/* Random Words Section */}
						<Box sx={{ mb: 4 }}>
							<Typography
								variant="h6"
								sx={{
									fontWeight: 600,
									color: colors.textPrimary,
									mb: 2,
								}}
							>
								Click on any word:
							</Typography>
							{isLoading ? (
								<Typography sx={{ color: colors.textBody }}>Loading words...</Typography>
							) : (
								<Box
									sx={{
										display: 'flex',
										gap: 2,
										flexWrap: 'wrap',
									}}
								>
									{randomWords.map((word, index) => (
										<Button
											key={index}
											onClick={() => handleWordClick(word)}
											variant="outlined"
											sx={{
												flex: '1 1 calc(33.333% - 16px)',
												minWidth: '120px',
												py: 2,
												fontSize: '1rem',
												textTransform: 'capitalize',
											}}
										>
											{word}
										</Button>
									))}
								</Box>
							)}
						</Box>

						{/* Action Buttons */}
						<Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
							<Button
								variant="contained"
								fullWidth
								onClick={handleSubmit}
								disabled={selectedLikert === null}
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
								Submit & Continue
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
								Return Home
							</Button>
						</Box>
					</CardContent>
				</Card>
			</Container>
		</Box>
	);
}
