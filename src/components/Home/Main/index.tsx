import { Box, Button, Heading } from '@radix-ui/themes';
import WebApp from '@twa-dev/sdk';
import { useEffect, useState } from 'react';

import AppPageContainer from 'components/Common/Page/AppPageContainer';

// TODO: user info
// import TonWallet from 'components/Common/Wallet/TonWallet';
// import { Invite } from 'components/Invite/Invite';
import BackgroundSound from './BackgroundSound';
import ShakeChest from './ShakeChest';

export default function Main() {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    if (WebApp.initDataUnsafe) {
      setUser(WebApp.initDataUnsafe.user);
    }
  }, []);

  return (
    <AppPageContainer>
      {/* <TonWallet /> */}
      <Box className="flex justify-between">
        <Heading
          as="h2"
          size="5"
          color="amber"
        >
          Pirate Treasure
        </Heading>
        <Box className="flex flex-col">
          <Heading
            as="h2"
            size="3"
            color="amber"
          >
            {user?.username || 'Bob'}
          </Heading>
          <span className=" text-1 text-amber-9">
            ID: {user?.id || '123456'}
          </span>
        </Box>
      </Box>

      <Box>
        <ShakeChest
          userData={{
            point: 0,
            turn: 3,
          }}
          onUpdatePoint={() => {
            // dothing
          }}
          onUpdateTurn={() => {
            // dothing
          }}
        />
      </Box>

      <Box className="flex justify-between items-center mt-8">
        <Box className="flex flex-col justify-between items-center">
          <BackgroundSound />
        </Box>
        <Box className="flex">
          <Button>Explore</Button>
        </Box>
      </Box>

      {/* <Box>Testing id: 1</Box> */}
      {/* <Invite /> */}
    </AppPageContainer>
  );
}
