import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROUTES, APP_NAME } from '../../config/constants';

export const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to={ROUTES.HOME} className="text-2xl font-bold text-blue-600">
            {APP_NAME}
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to={ROUTES.HOME}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            {isAuthenticated && (
              <Link
                to={ROUTES.MEMBERS}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Members
              </Link>
            )}

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={ROUTES.PROFILE}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {user?.name}
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to={ROUTES.LOGIN}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
