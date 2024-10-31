import * as Tooltip from '@radix-ui/react-tooltip';
import { Box, Button, Card } from '@radix-ui/themes';

function Contact() {
  return (
    <Box className="flex flex-col items-center p-6 bg-orange-100 rounded-lg mx-auto space-y-6 shadow-lg w-full">
      {/* Wallet Connection Box */}
      <Card className="bg-amber-6 p-4 rounded-md text-center w-full">
        <p className="text-brown-800 font-bold mb-2">NO CONNECTED WALLETS</p>
        <Button className="w-full bg-orange-400 text-white font-bold py-2 rounded-md transition duration-200 hover:bg-orange-500">
          CONNECT WALLET
        </Button>
      </Card>

      {/* Links Section */}
      <Box className="flex flex-col space-y-4 text-amber-5 w-full items-start mt-8">
        <LinkItem
          icon="🌐"
          label="Website"
        />
        <LinkItem
          icon="📱"
          label="Telegram"
        />
        <LinkItem
          icon="🔗"
          label="X / Twitter"
        />
        <LinkItem
          icon="❓"
          label="FAQ"
        />
      </Box>
    </Box>
  );
}

// LinkItem Component with Tooltip from Radix UI
const LinkItem = ({ icon, label }: { icon: string; label: string }) => (
  <Tooltip.Root>
    <Tooltip.Trigger asChild>
      <div className="flex items-center space-x-2 cursor-pointer">
        <span className="text-lg">{icon}</span>
        <span className="font-bold text-brown-800">{label}</span>
      </div>
    </Tooltip.Trigger>
    <Tooltip.Content
      side="top"
      align="center"
      className="bg-gray-800 text-white p-2 rounded-md shadow-md"
    >
      {label}
      <Tooltip.Arrow className="fill-gray-800" />
    </Tooltip.Content>
  </Tooltip.Root>
);

export default Contact;
