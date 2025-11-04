import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROUTES, APP_NAME } from '../../config/constants';

export const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-5xl font-bold text-gray-900 mb-6">
        Welcome to {APP_NAME}
      </h1>
      
      <p className="text-xl text-gray-600 mb-8">
        Sistema de gestión de información de miembros del capítulo L.A.M.A. Medellín
      </p>

      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Características Principales
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">🔐 Autenticación Segura</h3>
            <p className="text-gray-600">
              Integración con Azure Active Directory B2C y redes sociales
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">👥 Gestión de Miembros</h3>
            <p className="text-gray-600">
              Administra la información de los miembros de forma centralizada
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">🔍 Búsqueda y Filtrado</h3>
            <p className="text-gray-600">
              Encuentra información rápidamente con búsqueda avanzada
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">📊 Exportación de Datos</h3>
            <p className="text-gray-600">
              Exporta e importa datos en diferentes formatos
            </p>
          </div>
        </div>
      </div>

      {!isAuthenticated && (
        <div className="mt-8">
          <Link
            to={ROUTES.LOGIN}
            className="inline-block px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Iniciar Sesión
          </Link>
        </div>
      )}
    </div>
  );
};
