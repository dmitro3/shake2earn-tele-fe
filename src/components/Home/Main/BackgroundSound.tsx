import { SpeakerLoudIcon, SpeakerOffIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import { useCallback, useEffect, useRef, useState } from 'react';

import soundtrackFile from 'assets/music/soundtrack.mp3';

interface BackgroundSoundProps {
  defaultPlay?: boolean;
}

export default function BackgroundSound({
  defaultPlay = true,
}: BackgroundSoundProps) {
  const [isPlaying, setIsPlaying] = useState(defaultPlay);
  const soundtrackRef = useRef(new Audio(soundtrackFile));

  const onClickMusicButton = useCallback(() => {
    setIsPlaying((prevIsPlaying) => {
      const newIsPlaying = !prevIsPlaying;
      if (newIsPlaying) {
        soundtrackRef.current.play();
      } else {
        soundtrackRef.current.pause();
      }
      return newIsPlaying;
    });
  }, []);

  useEffect(() => {
    const soundtrack = soundtrackRef.current;
    soundtrack.play();

    return () => {
      soundtrack.pause();
    };
  }, []);

  return (
    <IconButton onClick={onClickMusicButton}>
      {isPlaying ? <SpeakerLoudIcon /> : <SpeakerOffIcon />}
    </IconButton>
  );
}
