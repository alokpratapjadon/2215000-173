import React from 'react';
import { User } from '../../types';
import { formatNumber } from '../../utils/helpers';

interface UserCardProps {
  user: User;
  rank?: number;
}

const UserCard: React.FC<UserCardProps> = ({ user, rank }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in">
      <div className="flex items-center p-4">
        {rank && (
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary-500 text-white rounded-full mr-4">
            <span className="font-bold">{rank}</span>
          </div>
        )}
        <div className="flex-shrink-0">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={user.avatarUrl}
            alt={user.name}
          />
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-medium text-gray-900 truncate">{user.name}</h3>
          {user.commentCount !== undefined && (
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-primary-600">
                {formatNumber(user.commentCount)}
              </span> comments on posts
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;