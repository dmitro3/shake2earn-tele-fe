import '@twa-dev/sdk';
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

const AppContainer = styled.div`
  max-width: 768px;
  margin: 0 auto;
  min-height: 100vh;

  background: url(${OceanBackgroundImage});
  object-fit: fill;
`;

function App() {
  return (
    <StyledApp>
      <AppContainer className="relative flex flex-col">
        <div className="text-gray-1 font-medium">Pirest chest bot</div>
        <Home />
      </AppContainer>
    </StyledApp>
  );
}

export default App;
