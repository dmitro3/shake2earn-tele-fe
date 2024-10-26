import '@twa-dev/sdk';
import Div100vh from 'react-div-100vh';
import styled from 'styled-components';

import OceanBackgroundImage from 'assets/app/ocean-background.png';

import './App.css';
import Home from './components/Home';

const StyledApp = styled.div`
  background-color: #e8e8e8;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
  }
`;

const AppContainer = styled(Div100vh)`
  max-width: 768px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  background: url(${OceanBackgroundImage});
  object-fit: fill;
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
