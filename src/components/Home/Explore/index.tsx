import { Box } from '@radix-ui/themes';

import AppPageContainer from 'components/Common/Page/AppPageContainer';
import { useAppContext } from 'context/app';

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

      <Quest />
    </AppPageContainer>
  );
}
