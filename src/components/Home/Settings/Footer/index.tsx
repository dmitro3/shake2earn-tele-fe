import {
  Button,
  Dialog,
  Flex,
  FlexProps,
  Heading,
  Link,
  Text,
} from '@radix-ui/themes';
import { useState } from 'react';

import Privacy from './Privacy';
import Terms from './Terms';

const getDialogList = () => [
  {
    type: DialogType.RULES,
    name: 'Rules',
    content: (
      <Flex direction="column">
        <Text
          mb="2"
          size="2"
        >
          Follow Telegram&apos;s content rules and policies whenever possible.
          Targeted hate or harassment of private individuals and protected
          groups are violations of our policy and will be removed. In addition,
          posts, comments, and imagery that are hateful, graphic,
          sexually-explicit, and/or offensive are violations of our policy and
          will be removed.
        </Text>
        <Text
          mb="2"
          size="2"
        >
          Use of third-party software, code reversal, any automation of canvas
          painting, use of bugs – may result in user lockout without the right
          to recover.
        </Text>
        <Text
          mb="2"
          size="2"
        >
          Lay off the pineapple pizza.
        </Text>
        <Text size="2">Be creative and have fun, Pirate Treasure.</Text>
      </Flex>
    ),
  },
  {
    type: DialogType.SUPPORT,
    name: 'Support',
    content: '',
  },
  {
    type: DialogType.TERMS,
    name: 'Terms',
    content: <Terms />,
  },
  {
    type: DialogType.PRIVACY,
    name: 'Privacy',
    content: <Privacy />,
  },
];

enum DialogType {
  RULES = 'rules',
  SUPPORT = 'support',
  TERMS = 'terms',
  PRIVACY = 'privacy',
}

type FooterProps = FlexProps;

export default function Footer(props: FooterProps) {
  const [openDialog, setOpenDialog] = useState<DialogType | null>(null);

  const dialogs = getDialogList();

  const renderDialog = () => {
    if (!openDialog) return null;

    const dialog = dialogs.find(({ type }) => type === openDialog);

    if (!dialog) {
      return null;
    }

    return (
      <Dialog.Root open>
        <Dialog.Content
          size="2"
          className="bg-amber-1"
        >
          <Dialog.Title className="text-center">{dialog.name}</Dialog.Title>
          <Dialog.Description
            my="4"
            size="1"
          >
            {dialog.content}
          </Dialog.Description>

          <Dialog.Close
            className="w-full"
            onClick={() => setOpenDialog(null)}
          >
            <Button
              color="amber"
              size="4"
            >
              Ok
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    );
  };

  return (
    <Flex
      wrap="wrap"
      gap="2"
      {...props}
    >
      {dialogs.map(({ type, name }) =>
        type === DialogType.SUPPORT ? (
          <Link
            key={type}
            href="https://t.me/pirate_treasure_channel"
            target="_blank"
            rel="noopener noreferrer"
            size="3"
            // variant="ghost"
          >
            {name}
          </Link>
        ) : (
          <Button
            key={type}
            size="3"
            variant="ghost"
            onClick={() => setOpenDialog(type)}
          >
            {name}
          </Button>
        ),
      )}
      {renderDialog()}
    </Flex>
  );
}
