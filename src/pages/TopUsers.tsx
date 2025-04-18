import React from 'react';
import { Trophy } from 'lucide-react';
import Layout from '../components/common/Layout';
import UserCard from '../components/users/UserCard';
import Loading from '../components/common/Loading';
import ErrorDisplay from '../components/common/ErrorDisplay';
import { useTopUsers } from '../hooks/useDataFetching';

const TopUsers: React.FC = () => {
  const { topUsers, loading, error } = useTopUsers();

  return (
    <Layout>
      <div className="mb-8">
        <div className="flex items-center">
          <Trophy className="text-yellow-500 h-8 w-8 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">Top Users</h1>
        </div>
        <p className="text-gray-600 mt-1">
          Users with the most commented posts
        </p>
      </div>
      
      {loading ? (
        <Loading message="Calculating top users..." />
      ) : error ? (
        <ErrorDisplay message={error.message} retry={() => window.location.reload()} />
      ) : (
        <div className="space-y-4">
          {topUsers.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-lg text-gray-600">No user data available yet.</p>
            </div>
          ) : (
            topUsers.map((user, index) => (
              <UserCard key={user.id} user={user} rank={index + 1} />
            ))
          )}
        </div>
      )}
    </Layout>
  );
};

export default TopUsers;