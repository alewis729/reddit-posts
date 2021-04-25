import React from 'react';
import { Container, Paper, useMediaQuery, Theme } from '@material-ui/core';
import { isEmpty, isNil, map } from 'lodash';

import { useStyles } from './style';
import { Link } from 'src/components';

interface Props {
	title?: string;
	pages?: {
		route: string;
		name: string;
	}[];
	sideContentNode?: React.ReactNode;
	children: React.ReactNode;
}

const DefaultLayout: React.FC<Props> = props => {
	const { title, pages = [], sideContentNode, children } = props;
	const classes = useStyles();
	const isMdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

	return (
		<Container className={classes.root}>
			{!isMdUp ? (
				<div>{children}</div>
			) : (
				<Container maxWidth="lg">
					<Paper>
						<div className={classes.header}>
							<div>{title}</div>
							{!isEmpty(pages) && (
								<div>
									{map(pages, ({ route, name }) => (
										<Link key={route} to={route}>
											{name}
										</Link>
									))}
								</div>
							)}
						</div>
						<div className={classes.content}>
							{!isNil(sideContentNode) && (
								<div className={classes.sideContent}>{sideContentNode}</div>
							)}
							<div className={classes.mainContent}>{children}</div>
						</div>
					</Paper>
				</Container>
			)}
		</Container>
	);
};

export default DefaultLayout;
