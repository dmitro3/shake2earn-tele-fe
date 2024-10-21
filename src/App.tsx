import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Counter } from "./components/Counter";
import { Jetton } from "./components/Jetton";
import { TransferTon } from "./components/TransferTon";
import styled from "styled-components";
import { Button, FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";
import { Invite } from "./components/Invite/Invite";
import Home from "./components/Home";
import OceanBackgroundImg from './assets/app/ocean-background.png'

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
