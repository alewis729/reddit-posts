export interface Post {
	id: string;
	title: string;
	thumbnail: string | null;
	image: string | null;
	author: string;
	time: string;
	comments: number;
	viewed: boolean;
}

export interface PostsState {
	loading: boolean;
	error: false | unknown;
	data: null | Post[];
	active: null | Post;
}
