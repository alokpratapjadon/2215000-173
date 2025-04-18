import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2, Users, Activity } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-primary-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BarChart2 className="h-6 w-6" />
              <span className="font-bold text-xl">SocialAnalytics</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') 
                  ? 'bg-primary-700 text-white' 
                  : 'text-primary-100 hover:bg-primary-500'
              }`}
            >
              Feed
            </Link>
            <Link 
              to="/top-users" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/top-users') 
                  ? 'bg-primary-700 text-white' 
                  : 'text-primary-100 hover:bg-primary-500'
              }`}
            >
              Top Users
            </Link>
            <Link 
              to="/trending" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/trending') 
                  ? 'bg-primary-700 text-white' 
                  : 'text-primary-100 hover:bg-primary-500'
              }`}
            >
              Trending Posts
            </Link>
          </div>
          
          <div className="flex md:hidden items-center">
            <div className="flex space-x-6">
              <Link to="/" className={isActive('/') ? 'text-white' : 'text-primary-200'}>
                <Activity className="h-6 w-6" />
              </Link>
              <Link to="/top-users" className={isActive('/top-users') ? 'text-white' : 'text-primary-200'}>
                <Users className="h-6 w-6" />
              </Link>
              <Link to="/trending" className={isActive('/trending') ? 'text-white' : 'text-primary-200'}>
                <BarChart2 className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;