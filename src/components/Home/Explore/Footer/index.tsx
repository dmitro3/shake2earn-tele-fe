import { Box, Button, Card, Flex } from '@radix-ui/themes';

import { useAppContext } from 'context/app';

export default function Footer() {
  const { onUIChange } = useAppContext();
  return (
    <Flex
      justify="center"
      className="py-4 space-x-4"
    >
      <Button onClick={() => onUIChange('rules')}>Rules</Button>
      <Button onClick={() => onUIChange('rules')}>Support</Button>
      <Button onClick={() => onUIChange('rules')}>Terms</Button>
      <Button onClick={() => onUIChange('rules')}>Privacy</Button>
    </Flex>
  );
}
