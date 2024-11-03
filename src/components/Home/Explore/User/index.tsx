import { Box, Button, Card, Heading } from '@radix-ui/themes';
import WebApp from '@twa-dev/sdk';
import { useEffect, useState } from 'react';

export default function User() {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    if (WebApp.initDataUnsafe) {
      setUser(WebApp.initDataUnsafe.user);
    }
  }, []);

  return (
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
      <Button>Copy</Button>
    </Card>
  );
}
