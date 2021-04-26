import { Post } from 'src/lib/types';

type TransformPosts<D> = ({ data }: { data: D }) => Post;

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
