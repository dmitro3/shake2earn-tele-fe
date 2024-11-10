import '@twa-dev/sdk';
import { useEffect, useState } from 'react';

import { useAppContext } from 'context/app';

import Explore from './Explore';
import DeviceNotSupported from './Initialization/DeviceNotSupported';
import Loading from './Initialization/Loading';
import Welcome from './Initialization/Welcome';
import Main from './Main';
import Rules from './Rules';
import Settings from './Settings';

const WELCOME_SCREEN_DELAY_MS = 1250;

export default function Home() {
  const {
    initialized,
    deviceSupported,
    error,
    onStart,
    started,
    starting,
    curUI,
  } = useAppContext();
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowWelcomeScreen(false), WELCOME_SCREEN_DELAY_MS);
  }, []);

  if (!deviceSupported) {
    return <DeviceNotSupported />;
  }

  if (showWelcomeScreen || !initialized) {
    return <Loading />;
  }

  if (!started) {
    return (
      <Welcome
        onStart={onStart}
        starting={starting}
        error={error}
      />
    );
  }

  if (curUI === 'settings') {
    return <Settings />;
  }

  if (curUI === 'explore') {
    return <Explore />;
  }

  if (curUI === 'rules') {
    return <Rules />;
  }

  return <Main />;
}
