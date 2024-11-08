import { Box } from '@radix-ui/themes';
import WebApp from '@twa-dev/sdk';
import { useEffect, useRef, useState } from 'react';

export default function ViewDevInfo() {
  // A. WebApp
  const webAppRef = useRef(WebApp.initDataUnsafe.user); // 1. Directly
  const [user, setUser] = useState<any>(); // 2. After mounted
  useEffect(() => {
    if (WebApp.initDataUnsafe) {
      setUser(WebApp.initDataUnsafe.user);
    }
  }, []);

  // B. Env
  const nodeEnv = process.env.NODE_ENV;
  const viteEnv = import.meta.env.MODE;
  // Local storage
  const isLocalStorageInWindow = 'localStorage' in window;

  const [res, setRes] = useState<string | null>(); // 2. After mounted
  useEffect(() => {
    localStorage.setItem('test', 'test');
    setRes(localStorage.getItem('test'));

    return () => {
      localStorage.removeItem('test');
    };
  }, []);

  return (
    <>
      <Box>
        A. WebApp:{' '}
        <Box style={{ fontSize: 8 }}>
          {JSON.stringify(WebApp.initDataUnsafe.user)} ||{' '}
          {JSON.stringify(webAppRef.current)} ||| {JSON.stringify(user)}
        </Box>
      </Box>
      <Box>
        B. Env: {nodeEnv} {viteEnv} {import.meta.env.VITE_APP_ENV}
      </Box>
      <Box>
        C. Storage: {isLocalStorageInWindow.toString()}, {res?.toString()}
      </Box>
    </>
  );
}
