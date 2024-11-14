const config = {
  apiUrl: import.meta.env.VITE_APP_API_URL || '',
  requestPublicKey: import.meta.env.VITE_APP_REQUEST_PUBLIC_KEY || '',
  aeonAppId: import.meta.env.VITE_APP_AEON_APP_ID || '',
};

export default Object.freeze(config);
