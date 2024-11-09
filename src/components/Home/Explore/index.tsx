import { Button, Card, Heading } from '@radix-ui/themes';

import AppPageContainer from 'components/Common/Page/AppPageContainer';
import { useAppContext } from 'context/app';

import Footer from './Footer';
import Quest from './Quest';
import User from './User';

export default function Explore() {
  const { onUIChange } = useAppContext();

  return (
    <AppPageContainer py="4">
      <Card>
        <Heading
          as="h1"
          size="4"
        >
          Explore
        </Heading>
        <User />
        <Quest />
        <Footer />
      </Card>
      <Button onClick={() => onUIChange('home')}>Back</Button>
    </AppPageContainer>
  );
}
