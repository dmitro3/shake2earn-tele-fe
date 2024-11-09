import { useFaucetJettonContract } from 'hooks/contract/useFaucetJettonContract';
import { useTonConnect } from 'hooks/ton/useTonConnect';

import {
  Button,
  Card,
  Ellipsis,
  FlexBoxCol,
  FlexBoxRow,
} from '../../styled/styled';

export function Jetton() {
  const { connected } = useTonConnect();
  const { mint, jettonWalletAddress, balance } = useFaucetJettonContract();

  return (
    <Card title="Jetton">
      <FlexBoxCol>
        <h3>Faucet Jetton</h3>
        <FlexBoxRow>
          Wallet
          <Ellipsis>{jettonWalletAddress}</Ellipsis>
        </FlexBoxRow>
        <FlexBoxRow>
          Balance
          <div>{balance ?? 'Loading...'}</div>
        </FlexBoxRow>
        <Button
          disabled={!connected}
          onClick={async () => {
            mint();
          }}
        >
          Get jettons from faucet
        </Button>
      </FlexBoxCol>
    </Card>
  );
}
