import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@material-ui/core';
import { LinkProps } from '@material-ui/core/Link';

interface Props extends LinkProps {
	to: string;
}

const Link: React.FC<Props> = props => (
	<MuiLink component={RouterLink} {...props} />
);

export default Link;
