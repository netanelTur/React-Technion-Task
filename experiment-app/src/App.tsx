import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme/theme';
import { ExperimentProvider } from './context/ExperimentContext';
import HomePage from './pages/HomePage';
import ExperimentPage1 from './pages/ExperimentPage1';
import ExperimentPage2 from './pages/ExperimentPage2';

const App: React.FC = () => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<ExperimentProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/experiment/1" element={<ExperimentPage1 />} />
						<Route path="/experiment/2" element={<ExperimentPage2 />} />
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</BrowserRouter>
			</ExperimentProvider>
		</ThemeProvider>
	);
};

export default App;
