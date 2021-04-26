import React from 'react';
import { isEmpty, isNil, map } from 'lodash';
import {
	Container,
	Paper,
	LinearProgress,
	Tooltip,
	IconButton,
	useMediaQuery,
	Theme
} from '@material-ui/core';

import { useStyles } from './style';
import { externalLinks } from './defaults';
import { Link } from 'src/components';

interface Props {
	title?: string;
	pages?: {
		route: string;
		name: string;
	}[];
	sideContentNode?: React.ReactNode;
	loading?: boolean;
	children: React.ReactNode;
}

const DefaultLayout: React.FC<Props> = props => {
	const { title, pages = [], sideContentNode, loading, children } = props;
	const classes = useStyles();
	const isMdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

	return (
		<Container className={classes.root}>
			<div className={classes.loader}>{loading && <LinearProgress />}</div>
			{!isMdUp ? (
				<div>{children}</div>
			) : (
				<Container maxWidth="lg">
					<Paper className={classes.paper}>
						<div className={classes.header}>
							<div className={classes.title}>{title}</div>
							{!isEmpty(pages) && (
								<div className={classes.links}>
									{map(pages, ({ route, name }) => (
										<Link key={route} to={route}>
											{name}
										</Link>
									))}
								</div>
							)}
							<div className={classes.externalLinks}>
								{map(externalLinks, obj => (
									<Tooltip key={obj.id} title={obj.tooltip} placement="bottom">
										<>
											<Link to={obj.url} target="_blank" rel="noreferrer">
												<IconButton>{obj.icon}</IconButton>
											</Link>
										</>
									</Tooltip>
								))}
							</div>
						</div>
						<div className={classes.content}>
							{!isNil(sideContentNode) && (
								<div className={classes.sideContent}>{sideContentNode}</div>
							)}
							<div className={classes.mainContent}>
								<div className={classes.children}>{children}</div>
							</div>
						</div>
					</Paper>
				</Container>
			)}
		</Container>
	);
};

export default DefaultLayout;
