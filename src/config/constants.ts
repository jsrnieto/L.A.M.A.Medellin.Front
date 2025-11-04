/**
 * Application constants
 */
export const APP_NAME = 'L.A.M.A. Medellín';
export const APP_VERSION = '1.0.0';

/**
 * API Configuration
 */
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
} as const;

/**
 * Azure AD B2C Configuration
 */
export const AUTH_CONFIG = {
  CLIENT_ID: import.meta.env.VITE_AZURE_AD_CLIENT_ID || '',
  AUTHORITY: import.meta.env.VITE_AZURE_AD_AUTHORITY || '',
  REDIRECT_URI: import.meta.env.VITE_AZURE_AD_REDIRECT_URI || window.location.origin,
  KNOWN_AUTHORITIES: [import.meta.env.VITE_AZURE_AD_KNOWN_AUTHORITIES || ''],
} as const;

/**
 * Routes
 */
export const ROUTES = {
  HOME: '/',
  MEMBERS: '/members',
  LOGIN: '/login',
  PROFILE: '/profile',
} as const;
