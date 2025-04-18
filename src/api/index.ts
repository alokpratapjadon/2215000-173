import axios from 'axios';
import { UsersResponse, PostsResponse, CommentsResponse } from '../types';

const API_BASE_URL = 'http://20.244.56.144/evaluation-service';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions
export const fetchUsers = async () => {
  try {
    const response = await api.get<UsersResponse>('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchUserPosts = async (userId: string) => {
  try {
    const response = await api.get<PostsResponse>(`/users/${userId}/posts`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error);
    throw error;
  }
};

export const fetchPostComments = async (postId: number) => {
  try {
    const response = await api.get<CommentsResponse>(`/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    throw error;
  }
};