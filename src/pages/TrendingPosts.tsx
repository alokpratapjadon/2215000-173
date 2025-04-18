import React from 'react';
import { TrendingUp } from 'lucide-react';
import Layout from '../components/common/Layout';
import PostCard from '../components/posts/PostCard';
import Loading from '../components/common/Loading';
import ErrorDisplay from '../components/common/ErrorDisplay';
import { useTrendingPosts } from '../hooks/useDataFetching';

const TrendingPosts: React.FC = () => {
  const { trendingPosts, loading, error } = useTrendingPosts();

  return (
    <Layout>
      <div className="mb-8">
        <div className="flex items-center">
          <TrendingUp className="text-accent-500 h-8 w-8 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">Trending Posts</h1>
        </div>
        <p className="text-gray-600 mt-1">
          Posts with the highest engagement
        </p>
      </div>
      
      {loading ? (
        <Loading message="Finding trending posts..." />
      ) : error ? (
        <ErrorDisplay message={error.message} retry={() => window.location.reload()} />
      ) : (
        <div className="space-y-6">
          {trendingPosts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-lg text-gray-600">No trending posts available yet.</p>
            </div>
          ) : (
            trendingPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </div>
      )}
    </Layout>
  );
};

export default TrendingPosts;