import { CHAIN } from '@tonconnect/protocol';
import { TonConnectButton } from '@tonconnect/ui-react';
import '@twa-dev/sdk';
import styled from 'styled-components';

import './App.css';
import OceanBackgroundImg from './assets/app/ocean-background.png';
import { Counter } from './components/Counter';
import Home from './components/Home';
import { Invite } from './components/Invite/Invite';
import { Jetton } from './components/Jetton';
import { TransferTon } from './components/TransferTon';
import { Button, FlexBoxCol, FlexBoxRow } from './components/styled/styled';
import { useTonConnect } from './hooks/useTonConnect';

const StyledApp = styled.div`
  background-color: #e8e8e8;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
`;

const AppContainer = styled.div`
  max-width: 768px;
  margin: 0 auto;
  min-height: 100vh;
`;

function App() {
  return (
    <StyledApp>
      <AppContainer>
        <Home />
      </AppContainer>
    </StyledApp>
  );
}

export default App;
