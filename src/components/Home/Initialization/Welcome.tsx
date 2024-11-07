import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Box, Button, Callout, Heading } from '@radix-ui/themes';

import AppPageContainer from 'components/Common/Page/AppPageContainer';
import { getAppAssetSrc } from 'context/app/utils';

interface WelcomeProps {
  onStart: () => void;
  starting: boolean;
  error: string | null;
}

const imgSrc = getAppAssetSrc('background-welcome');

export default function Welcome({ onStart, starting, error }: WelcomeProps) {
  return (
    <AppPageContainer
      style={{ background: imgSrc ? `url(${imgSrc})` : undefined }}
    >
      <Box className="flex flex-col content-center flex-grow">
        <Heading
          as="h1"
          size="8"
          className="text-amber-5 text-center mt-32"
        >
          Pirate Treausure
        </Heading>
      </Box>

      <Box className="p-8 mb-8 flex flex-col items-center">
        <Button
          onClick={onStart}
          disabled={starting}
          size="4"
          className="w-full font-bold"
        >
          {!starting ? 'Start' : 'Starting...'}
        </Button>

        {error && (
          <Callout.Root
            color="amber"
            className="w-full bg-amber-3 mt-4"
            size="1"
          >
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
      </Box>
    </AppPageContainer>
  );
}
