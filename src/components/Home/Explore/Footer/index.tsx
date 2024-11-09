import { Button, Flex } from '@radix-ui/themes';

import { useAppContext } from 'context/app';

export default function Footer() {
  const { onUIChange } = useAppContext();
  return (
    <Flex
      wrap="wrap"
      gap="2"
    >
      <Button
        variant="ghost"
        onClick={() => onUIChange('rules')}
      >
        Rules
      </Button>
      <Button
        variant="ghost"
        onClick={() => onUIChange('rules')}
      >
        Support
      </Button>
      <Button
        variant="ghost"
        onClick={() => onUIChange('rules')}
      >
        Terms
      </Button>
      <Button
        variant="ghost"
        onClick={() => onUIChange('rules')}
      >
        Privacy
      </Button>
    </Flex>
  );
}
