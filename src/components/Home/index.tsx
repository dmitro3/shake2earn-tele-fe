import { TonConnectButton } from "@tonconnect/ui-react";
import { Button, FlexBoxCol } from "../styled/styled";
import { useTonConnect } from "../../hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";
import { Invite } from "../Invite/Invite";

export default function Home () {
  const { network } = useTonConnect();
  
  return (
    <>
      <FlexBoxCol>
        <TonConnectButton />
        <Button>
          {!network && 'N/A'}
          {network && (network === CHAIN.MAINNET ? 'mainnet' : 'testnet')}
        </Button>
      </FlexBoxCol>
      <FlexBoxCol>
        <Invite />
      </FlexBoxCol>
    </>
  )
}