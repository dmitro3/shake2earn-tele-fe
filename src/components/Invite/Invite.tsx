import React, { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';

// Declare the Telegram WebApp object so TypeScript doesn't complain
declare global {
  interface Window {
    Telegram: any;
  }
}

export const Invite = () => {
  const [startParam, setStartParam] = React.useState<string | null>(null);
  const [userId, setUserId] = React.useState<number | undefined>(undefined);

  const copyInviteLink = () => {
    console.log("Invite link copied");
    navigator.clipboard.writeText(`https://t.me/botvjp1_bot/join?startapp=${123}`);
  };

  
  useEffect(() => {
    if (WebApp.initDataUnsafe && WebApp.initDataUnsafe.start_param) {
      setStartParam(WebApp.initDataUnsafe.start_param);
    }
    if (WebApp.initDataUnsafe) {
      setUserId(WebApp.initDataUnsafe.user?.id);
    }
  }, []);
  
  return (
    <>
      <script src="https://telegram.org/js/telegram-web-app.js"></script>    
      <h1>Invite</h1>
      <button onClick={copyInviteLink}>
        Copy invite link
      </button>
      <p>
        startapp: {startParam ? startParam : "N/A"}
      </p>
      <p>
        user id: {userId ? userId : "N/A"}
      </p>
    </>
  );
};