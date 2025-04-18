import { useState, useEffect, useCallback } from 'react';
import { fetchUsers, fetchUserPosts, fetchPostComments } from '../api';
import { User, Post, Comment } from '../types';
import { getRandomUserAvatar, getRandomPostImage } from '../utils/helpers';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      
      const formattedUsers = Object.entries(data.users).map(([id, name]) => ({
        id,
        name,
        avatarUrl: getRandomUserAvatar(),
        commentCount: 0,
      }));
      
      setUsers(formattedUsers);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch users'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { users, loading, error, refetch: fetchData };
};

export const useUserPosts = (userId: string) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const data = await fetchUserPosts(userId);
      
      const enhancedPosts = data.posts.map(post => ({
        ...post,
        imageUrl: getRandomPostImage(),
      }));
      
      setPosts(enhancedPosts);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(`Failed to fetch posts for user ${userId}`));
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { posts, loading, error, refetch: fetchData };
};

export const usePostComments = (postId: number) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!postId) return;
    
    try {
      setLoading(true);
      const data = await fetchPostComments(postId);
      setComments(data.comments);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(`Failed to fetch comments for post ${postId}`));
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { comments, loading, error, refetch: fetchData };
};

// Custom hook for aggregating data for the Top Users page
export const useTopUsers = () => {
  // Mock users and topUsers data for testing
  const mockUsers: User[] = [
    { id: '1', name: 'Alice', avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg', commentCount: 5 },
    { id: '2', name: 'Bob', avatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg', commentCount: 3 },
    { id: '3', name: 'Charlie', avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg', commentCount: 8 },
    { id: '4', name: 'Diana', avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg', commentCount: 6 },
    { id: '5', name: 'Ethan', avatarUrl: 'https://randomuser.me/api/portraits/men/5.jpg', commentCount: 4 },
  ];

  const mockTopUsers: User[] = mockUsers.sort((a, b) => (b.commentCount || 0) - (a.commentCount || 0)).slice(0, 5);

  const [topUsers, setTopUsers] = useState<User[]>(mockTopUsers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  return { topUsers, loading, error };
};

// Custom hook for the Feed page with real-time updates
export const useFeed = () => {
  // Mock users and posts data for testing
  const mockUsers = [
    { id: '1', name: 'Alice', avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: '2', name: 'Bob', avatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg' },
  ];

  const mockPosts = [
    {
      id: 101,
      userid: 1,
      content: 'This is a mock post by Alice',
      userName: 'Alice',
      imageUrl: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg',
    },
    {
      id: 102,
      userid: 2,
      content: 'This is a mock post by Bob',
      userName: 'Bob',
      imageUrl: 'https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg',
    },
    {
      id: 103,
      userid: 1,
      content: 'Another post by Alice',
      userName: 'Alice',
      imageUrl: 'https://images.pexels.com/photos/1236701/pexels-photo-1236701.jpeg',
    },
    {
      id: 104,
      userid: 2,
      content: 'Another post by Bob',
      userName: 'Bob',
      imageUrl: 'https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg',
    },
    {
      id: 105,
      userid: 1,
      content: 'Yet another post by Alice',
      userName: 'Alice',
      imageUrl: 'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg',
    },
  ];

  const [feed, setFeed] = useState<Post[]>(mockPosts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Simulate real-time updates
  useEffect(() => {
    if (feed.length === 0) return;
    
    const interval = setInterval(() => {
      // Simulate a new post by moving a random post to the top with a new ID
      setFeed(prevFeed => {
        if (prevFeed.length === 0) return prevFeed;
        
        const randomIndex = Math.floor(Math.random() * prevFeed.length);
        const postToUpdate = {...prevFeed[randomIndex]};
        
        // Create "new" post by updating the ID and content
        const updatedPost = {
          ...postToUpdate,
          id: prevFeed[0].id + 1000, // Ensure it's "newer"
          content: `${postToUpdate.content} (updated)`,
        };
        
        // Remove the old post and add the new one at the top
        const newFeed = [
          updatedPost,
          ...prevFeed.filter((_, index) => index !== randomIndex),
        ];
        
        return newFeed;
      });
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, [feed]);

  return { feed, loading, error };
};

// Custom hook for finding trending posts
export const useTrendingPosts = () => {
  // Mock users and trendingPosts data for testing
  const mockUsers = [
    { id: '1', name: 'Alice', avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: '2', name: 'Bob', avatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg' },
  ];

  const mockTrendingPosts: Post[] = [
    {
      id: 201,
      userid: 1,
      content: 'Trending post by Alice',
      userName: 'Alice',
      imageUrl: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg',
      commentCount: 10,
    },
    {
      id: 202,
      userid: 2,
      content: 'Trending post by Bob',
      userName: 'Bob',
      imageUrl: 'https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg',
      commentCount: 8,
    },
  ];

  const [trendingPosts, setTrendingPosts] = useState<Post[]>(mockTrendingPosts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  return { trendingPosts, loading, error };
};
