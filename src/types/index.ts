export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  commentCount?: number;
}

export interface Post {
  id: number;
  userid: number;
  content: string;
  imageUrl?: string;
  userName?: string;
  commentCount?: number;
}

export interface Comment {
  id: number;
  postid: number;
  content: string;
  userId?: number;
  userName?: string;
}

export interface UsersResponse {
  users: Record<string, string>;
}

export interface PostsResponse {
  posts: Post[];
}

export interface CommentsResponse {
  comments: Comment[];
}