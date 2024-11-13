import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Box, Button, Callout, Heading } from '@radix-ui/themes';

import AppPageContainer from 'components/Common/Page/AppPageContainer';
import { AppAssetSrc } from 'context/app/constants';

interface WelcomeProps {
  onStart: () => void;
  starting: boolean;
  error: string | null;
}

export default function Welcome({ onStart, starting, error }: WelcomeProps) {
  return (
    <AppPageContainer
      backgroundImgSrc={AppAssetSrc.WELCOME_BG}
      dimmed={false}
    >
      <Box className="flex flex-col content-center flex-grow">
        <Heading
          as="h1"
          size="7"
          className="text-amber-12 text-center mt-32"
        >
          Pirate Treasure
        </Heading>
      </Box>

      <Box className="mb-8 px-4 flex flex-col items-center">
        <Button
          onClick={onStart}
          disabled={starting}
          size="4"
          loading={starting}
          color="amber"
          className="w-full font-bold uppercase"
        >
          Start
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
