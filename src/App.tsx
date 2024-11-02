import '@twa-dev/sdk';
import Div100vh from 'react-div-100vh';
import styled from 'styled-components';

import './App.css';
import Home from './components/Home';

const AppContainer = styled.div`
  background-color: #e8e8e8;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
  }
`;

const AppContent = styled(Div100vh)`
  max-width: 768px;
  margin: 0 auto; /* center content on large screen */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <AppContainer>
      <AppContent>
        <Home />
      </AppContent>
    </AppContainer>
  );
}

export default App;
