

export const Invite = () => {
  const copyInviteLink = () => {
    console.log("Invite link copied");
    navigator.clipboard.writeText(`https://t.me/botvjp1/join?startapp=${123}`);
  };
  let startParam = window.Telegram.WebApp.initDataUnsafe.start_param

  return (
    <>
      <h1>Invite</h1>
      <button onClick={copyInviteLink}>
        Copy invite link
      </button>
      <p>
        startapp: {startParam}
      </p>
    </>
  );
};