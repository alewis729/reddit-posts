export interface Post {
  id: string;
  title: string;
  thumbnail: string | null;
  image: string | null;
  author: string;
  time: number;
  comments: number;
  viewed: boolean;
  inGallery: boolean;
}

export interface PostsState {
  loading: boolean;
  error: false | unknown;
  data: Post[];
  activeId: string | null;
}
