import { Box, Button, Heading, Link } from '@radix-ui/themes';

import AppPageContainer from 'components/Common/Page/AppPageContainer';
import { useAppContext } from 'context/app';

export default function Rules() {
  const { onUIChange } = useAppContext();

  return (
    <AppPageContainer>
      <Box className=" bg-whiteA-10 w-full h-full p-8 space-y-8">
        <Button onClick={() => onUIChange('home')}>Back</Button>
        <Heading>Rules</Heading>
        <Box className=" space-y-8">
          <p>
            Follow Telegram&apos;s content rules and policies whenever possible.
            Targeted hate or harassment of private individuals and protected
            groups are violations of our policy and will be removed. In
            addition, posts, comments, and imagery that are hateful, graphic,
            sexually-explicit, and/or offensive are violations of our policy and
            will be removed.
          </p>
          <p>
            Use of third-party software, code reversal, any automation of canvas
            painting, use of bugs – may result in user lockout without the right
            to recover.
          </p>
          <p>Lay off the pineapple pizza.</p>
          <p>Be creative and have fun, Piratetreasure.</p>
        </Box>
        <Button
          className="w-full py-2"
          size="4"
        >
          <Link
            href="https://t.me/pirate_treasure_channel"
            underline="hover"
            className=" text-whiteA-12"
          >
            Telegram Channel
          </Link>
        </Button>
      </Box>
    </AppPageContainer>
  );
}
