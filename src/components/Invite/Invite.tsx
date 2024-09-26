import { useEffect, useState } from "react";

declare global {
  interface Window {
    Telegram: any;
  }
}

export const Invite = () => {
  const [startParam, setStartParam] = useState(null);

  const copyInviteLink = () => {
    console.log("Invite link copied");
    navigator.clipboard.writeText(`https://t.me/botvjp1_bot/join?startapp=${123}`);
  };
  
  useEffect(() => {
    // Ensure that the Telegram WebApp SDK is loaded
    const loadTelegramSDK = () => {
      if (window.Telegram) {
        // Mark the Web App as ready
        window.Telegram.WebApp.ready();

        // Get the initData and start parameter
        const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
        const startParamValue = initDataUnsafe.query_id || initDataUnsafe.start_param;

        // Set the start parameter in the component state
        setStartParam(startParamValue);
      }
    };

    loadTelegramSDK();
  }, []); // Run once on mount
  return (
    <>
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