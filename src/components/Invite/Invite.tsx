import { useEffect, useState } from "react";

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
  
  const urlParams = new URLSearchParams(window.location.search);
  const startParam = urlParams.get('startapp');
  
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