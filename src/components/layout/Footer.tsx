import React from 'react';
import { APP_NAME, APP_VERSION } from '../../config/constants';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            © {currentYear} {APP_NAME}. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 mt-2 md:mt-0">
            Version {APP_VERSION}
          </p>
        </div>
      </div>
    </footer>
  );
};
