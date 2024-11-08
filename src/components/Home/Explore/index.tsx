import { Box, Flex } from '@radix-ui/themes';

import AppPageContainer from 'components/Common/Page/AppPageContainer';
import { useAppContext } from 'context/app';

import Footer from './Footer';
import Header from './Header';
import Quest from './Quest';
import User from './User';

export default function Explore() {
  const { onUIChange } = useAppContext();

  return (
    <AppPageContainer>
      <Header />
      <Box className="text-left">
        <Box className="flex justify-center mt-10">
          <User />
        </Box>
      </Box>
      <Flex
        direction="column"
        flexGrow="1"
        justify="center"
        height="100%"
      >
        <Quest />
      </Flex>
      <Footer />
    </AppPageContainer>
  );
}
