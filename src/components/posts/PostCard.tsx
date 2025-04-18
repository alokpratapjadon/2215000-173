import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Post } from '../../types';
import { formatNumber } from '../../utils/helpers';

interface PostCardProps {
  post: Post;
  showCommentCount?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, showCommentCount = true }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 transition-all duration-300 hover:shadow-lg animate-fade-in">
      <div className="p-4">
        {post.userName && (
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
              {post.userName.charAt(0)}
            </div>
            <span className="ml-2 font-medium text-gray-900">{post.userName}</span>
          </div>
        )}
        <p className="text-gray-800 mb-3">{post.content}</p>
        {post.imageUrl && (
          <img 
            src={post.imageUrl} 
            alt="Post content" 
            className="w-full h-48 object-cover rounded-md"
          />
        )}
      </div>
      
      {showCommentCount && post.commentCount !== undefined && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center">
          <MessageCircle className="h-4 w-4 text-gray-500 mr-1" />
          <span className="text-sm text-gray-600">
            {formatNumber(post.commentCount)} comments
          </span>
        </div>
      )}
    </div>
  );
};

export default PostCard;