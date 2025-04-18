import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import Layout from '../components/common/Layout';
import PostCard from '../components/posts/PostCard';
import Loading from '../components/common/Loading';
import ErrorDisplay from '../components/common/ErrorDisplay';
import { useFeed } from '../hooks/useDataFetching';

const Feed: React.FC = () => {
  const { feed, loading, error } = useFeed();
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  
  // Update last refresh time when feed changes
  useEffect(() => {
    if (!loading && feed.length > 0) {
      setLastRefresh(new Date());
    }
  }, [feed, loading]);
  
  const getRefreshText = () => {
    const seconds = Math.floor((new Date().getTime() - lastRefresh.getTime()) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    return `${Math.floor(seconds / 3600)} hours ago`;
  };
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Feed</h1>
        <p className="text-gray-600">
          See the latest posts from our community
        </p>
      </div>
      
      {/* Last refresh indicator */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">
          Last updated: {getRefreshText()}
        </p>
        <button 
          className="flex items-center text-sm text-primary-600 hover:text-primary-800"
          onClick={() => window.location.reload()}
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          Refresh
        </button>
      </div>
      
      {loading ? (
        <Loading message="Loading your feed..." />
      ) : error ? (
        <ErrorDisplay message={error.message} retry={() => window.location.reload()} />
      ) : (
        <div className="space-y-6">
          {feed.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-lg text-gray-600">No posts to display yet.</p>
            </div>
          ) : (
            feed.map(post => (
              <PostCard key={post.id} post={post} showCommentCount={false} />
            ))
          )}
        </div>
      )}
    </Layout>
  );
};

export default Feed;