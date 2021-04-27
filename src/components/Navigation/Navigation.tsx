import React from 'react';
import { Drawer, Toolbar, Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

interface Props {
	open: boolean;
	children: React.ReactNode;
	onClose: () => void;
}

const Navigation: React.FC<Props> = ({ open, children, onClose }) => {
	const theme = useTheme();

	return (
		<Drawer
			open={open}
			anchor="left"
			onClose={onClose}
			style={{ zIndex: theme.zIndex.appBar - 1 }} // inline for specificity
		>
			<Toolbar />
			<Box pt={3}>{children}</Box>
		</Drawer>
	);
};

export default Navigation;
