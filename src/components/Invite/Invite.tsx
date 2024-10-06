import React, { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKey } from '../../api/queryKey';
import { getUser, createUser } from '../../api/user';

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
  const id = '1';
  const searchParams = new URLSearchParams(window.location.search);
  const referBy = searchParams.get('id'); // Get the value of 'myParam'
  console.log("referBy", referBy);

  const { data: user, error, isFetched } = useQuery(
    [queryKey.getUser, id],
    () => getUser(id),
    {
      enabled: !!id,
      retry: false, // Prevent auto-retry on error
    }
  );
  
  const createUserMutation = useMutation(
    (variables: { id: string; referBy: string | null }) => createUser(variables.id, variables.referBy),
    {
      onSuccess: (data) => {
        console.log('User created successfully:', data);
      },
      onError: (error) => {
        console.error('Error creating user:', error);
      }
    }
  );
  
  useEffect(() => {
    if (error && (error as any).response?.status === 404 && isFetched) {
      createUserMutation.mutate({ id, referBy });
    }
  }, [error, isFetched]);
  

  console.log("user", user);
  // console.log("createUser", newUser);
  
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
      <p>
        point: {user?.point}
      </p>
    </>
  );
};