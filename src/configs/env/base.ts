const config = {
  apiUrl: import.meta.env.VITE_APP_API_URL || '',
  requestPublicKey: import.meta.env.VITE_APP_REQUEST_PUBLIC_KEY || '',
};

export default Object.freeze(config);
