export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${
      import.meta.env.VITE_TENANT_ID
    }`, // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    redirectUri: import.meta.env.VITE_REDIRECT_URI || window.location.origin,
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: "localStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    allowRedirectInIframe: true,
    windowHashTimeout: 60000,
    iframeHashTimeout: 6000,
    loadFrameTimeout: 0,
  },
};

// Helper to get additional scopes from environment if needed
const getScopes = () => {
  const envScopes = import.meta.env.VITE_ADDITIONAL_SCOPES;
  if (typeof envScopes === "string" && envScopes.length > 0) {
    return envScopes
      .split(",")
      .map((scope) => scope.trim())
      .filter(Boolean);
  }
  return [];
};

// Ensure scopes are properly formatted as an array of strings
export const loginRequest = {
  scopes: getScopes(), // Default scope for Microsoft Graph
};
