import { Button, Flex, FlexProps } from '@radix-ui/themes';

import { useAppContext } from 'context/app';

type FooterProps = FlexProps;

export default function Footer(props: FooterProps) {
  const { onUIChange } = useAppContext();
  return (
    <Flex
      wrap="wrap"
      gap="2"
      {...props}
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
