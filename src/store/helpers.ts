type TransformPosts<D> = ({
	data
}: {
	data: D;
}) => {
	id: string;
	title: string;
	thumbnail: string | null;
	image: string | null;
	author: string;
	time: string;
	comments: number;
	viewed: boolean;
};

export const transformPost: TransformPosts<any> = ({ data }) => ({
	id: data.id,
	title: data.title,
	thumbnail: data.thumbnail === 'default' ? null : data.thumbnail,
	image: data.preview?.images?.[0]?.source?.url?.replace(/&amp;/g, '&') ?? null,
	author: data.author,
	time: data.created_utc,
	comments: data.num_comments,
	viewed: false
});
