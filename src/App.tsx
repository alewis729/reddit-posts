import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import { theme } from 'src/lib/theme';
import Routes from 'src/lib/Routes';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Route component={Routes} />
			</ThemeProvider>
		</BrowserRouter>
	);
};

export default App;
