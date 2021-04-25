import React from 'react';

import { DefaultLayout } from 'src/layouts';

const GalleryPage: React.FC = () => {
	return (
		<DefaultLayout
			title="Gallery"
			pages={[
				{ route: '/', name: 'Posts' },
				{ route: '/gallery', name: 'Gallery' }
			]}
		>
			gallery
		</DefaultLayout>
	);
};

export default GalleryPage;
