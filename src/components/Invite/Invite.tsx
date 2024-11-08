import { useState } from 'react';

import { useAppContext } from 'context/app';

export const Invite = () => {
  const [startParam, setStartParam] = useState<string | null>(null);
  const { userData, telegramUserData } = useAppContext();
  const userId = telegramUserData?.id;

  const copyInviteLink = () => {
    console.log('Invite link copied');
    navigator.clipboard.writeText(
      `https://t.me/botvjp1_bot/join?startapp=${userId}`,
    );
  };
  // const id = '1';
  const searchParams = new URLSearchParams(window.location.search);
  const referBy = searchParams.get('id'); // Get the value of 'myParam'

  // useEffect(() => {
  //   if (WebApp.initDataUnsafe && WebApp.initDataUnsafe.start_param) {
  //     setStartParam(WebApp.initDataUnsafe.start_param);
  //   }
  //   if (WebApp.initDataUnsafe) {
  //     setUserId(WebApp.initDataUnsafe.user?.id);
  //   }
  // }, []);

  // const { data: user, error } = useQuery(
  //   [queryKey.getUser, userId],
  //   () => getUser(),
  //   {
  //     enabled: !!userId,
  //     retry: false, // Prevent auto-retry on error
  //   },
  // );

  // const createUserMutation = useMutation(
  //   (variables: { id: string; startParam: string | null }) =>
  //     createUser(variables.id, variables.startParam),
  //   {
  //     onSuccess: (data) => {
  //       console.log('User created successfully:', data);
  //     },
  //     onError: (error) => {
  //       console.error('Error creating user:', error);
  //     },
  //   },
  // );

  // useEffect(() => {
  //   if (error && (error as any).response?.status === 404) {
  //     createUserMutation.mutate({ id: userId?.toString() || '', startParam });
  //   }
  // }, [createUserMutation, error, startParam, userId]);

  return (
    <>
      <script src="https://telegram.org/js/telegram-web-app.js"></script>
      <h1>Invite</h1>
      <button onClick={copyInviteLink}>Copy invite link</button>
      <p>startapp: {startParam ? startParam : 'N/A'}</p>
      <p>user id: {userId ? userId : 'N/A'}</p>
      <p>point: {userData ? userData.point : '0'}</p>
    </>
  );
};
