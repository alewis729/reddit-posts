import React from 'react';

import { DefaultLayout } from 'src/layouts';

const PostsPage: React.FC = () => {
	return (
		<DefaultLayout
			title="Top 50 Reddit posts"
			pages={[
				{ route: '/', name: 'Posts' },
				{ route: '/gallery', name: 'Gallery' }
			]}
			sideContentNode={<div>posts go here</div>}
		>
			content of the post
		</DefaultLayout>
	);
};

export default PostsPage;
