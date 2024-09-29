import React, { useEffect } from 'react';

// Declare the Telegram WebApp object so TypeScript doesn't complain
declare global {
  interface Window {
    Telegram: any;
  }
}

export const Invite = () => {
  const copyInviteLink = () => {
    console.log("Invite link copied");
    navigator.clipboard.writeText(`https://t.me/botvjp1_bot/join?startapp=${123}`);
  };

  const [startParam, setStartParam] = React.useState<string | null>(null);
  
  useEffect(() => {
    // Dynamically load the Telegram WebApp SDK
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-web-app.js';
    script.async = true;

    script.onload = () => {
      if (window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        
        // Example: initialize and use Telegram WebApp SDK
        tg.ready();
        
        // Parse the initData to get the 'startapp' parameter
        const urlParams = new URLSearchParams(tg.initData);
        setStartParam(urlParams.get('startapp'));
        
        console.log('StartApp Parameter:', startParam);
        
        // Any other Telegram WebApp operations you need
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup the script when the component is unmounted
      document.body.removeChild(script);
    };
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
    </>
  );
};