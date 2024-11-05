import * as Toast from '@radix-ui/react-toast';
import { Box, Button, Card, Heading } from '@radix-ui/themes';
import WebApp from '@twa-dev/sdk';
import { useEffect, useState } from 'react';

export default function User() {
  const [user, setUser] = useState<any>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (WebApp.initDataUnsafe) {
      setUser(WebApp.initDataUnsafe.user);
    }
  }, []);

  const copyInviteLink = () => {
    console.log('Invite link copied');
    navigator.clipboard.writeText(
      `t.me/PirateTreasureBot/join?startapp=${user?.id || '123456'}`,
    );
    setOpen(true);
  };

  return (
    <Toast.Provider swipeDirection="right">
      <Card className=" flex space-x-4">
        <Box className="flex flex-col">
          <Heading
            as="h2"
            size="3"
          >
            {user?.username || 'User Name'}
          </Heading>
          <span className=" text-1">ID: {user?.id || '123456'}</span>
        </Box>
        <Button onClick={copyInviteLink}>Copy Invite</Button>
      </Card>
      <Toast.Root
        open={open}
        onOpenChange={setOpen}
      >
        <Toast.Title>Invite Link Copied</Toast.Title>
      </Toast.Root>
      <Toast.Viewport />
    </Toast.Provider>
  );
}
