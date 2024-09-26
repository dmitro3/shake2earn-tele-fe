import { useEffect, useState } from "react";
<script src="https://telegram.org/js/telegram-web-app.js"></script>

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
  const tg = window.Telegram.WebApp;

// Parse the initialization data (initData) which contains 'start_param'
const initData = tg.initData;
const initDataUnsafe = tg.initDataUnsafe;

// 'start_param' will be inside 'initDataUnsafe.query_id'
console.log("Telegram Init Data:", initData);
console.log("Telegram Init Data Unsafe:", initDataUnsafe);

// Extract 'start_param' if available
const startParam = initDataUnsafe.start_param || null;

console.log("Start Param:", startParam);

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