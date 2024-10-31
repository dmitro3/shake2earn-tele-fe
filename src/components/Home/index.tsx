import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Box, Callout, Heading } from '@radix-ui/themes';
import '@twa-dev/sdk';

import PageContainer from 'components/Common/PageContainer';
import { Button } from 'components/styled/styled';
import { useAppContext } from 'context/app';

import Main from './Main';

export default function Home() {
  const { error, onStart, started, starting, deviceSupported } =
    useAppContext();

  if (!deviceSupported) {
    return (
      <PageContainer>
        <Box className="p-16 m-auto">
          <Callout.Root
            color="yellow"
            className="w-full bg-yellow-3 mt-4"
            size="1"
          >
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>{`Your device doesn't support motion. Please use TON app or using another device.`}</Callout.Text>
          </Callout.Root>
        </Box>
      </PageContainer>
    );
  }

  if (!started) {
    return (
      <PageContainer>
        <Box className="flex flex-col content-center flex-grow">
          <Heading
            as="h1"
            size="8"
            className="text-whiteA-12 text-center mt-32"
          >
            PIRATE TREASURE
          </Heading>
        </Box>

        <Box className="p-16 flex flex-col items-center">
          <Button
            onClick={onStart}
            disabled={starting}
            className="w-full h-12"
          >
            {!starting ? 'Start' : 'Starting...'}
          </Button>

          {error && (
            <Callout.Root
              color="yellow"
              className="w-full bg-yellow-3 mt-4"
              size="1"
            >
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}
        </Box>
      </PageContainer>
    );
  }

  return <Main />;
}
