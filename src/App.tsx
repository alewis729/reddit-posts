import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { ModalProvider } from 'react-modal-hook';
import { TransitionGroup } from 'react-transition-group';

import store from './store';
import { theme } from 'src/lib/theme';
import Routes from 'src/lib/Routes';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<ModalProvider rootComponent={TransitionGroup}>
						<Route component={Routes} />
					</ModalProvider>
				</ThemeProvider>
			</Provider>
		</BrowserRouter>
	);
};

export default App;
