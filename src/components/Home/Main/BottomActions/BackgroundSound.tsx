import { SpeakerLoudIcon, SpeakerOffIcon } from '@radix-ui/react-icons';
import { IconButton, IconButtonProps } from '@radix-ui/themes';
import { useCallback, useEffect, useRef, useState } from 'react';

import BackgroundAudio from 'assets/music/soundtrack.mp3';

type BackgroundSoundProps = IconButtonProps & {
  defaultPlay?: boolean;
};

export default function BackgroundSound({
  defaultPlay = true,
  ...props
}: BackgroundSoundProps) {
  const audioRef = useRef<HTMLAudioElement>(new Audio(BackgroundAudio));
  const [isPlaying, setIsPlaying] = useState(defaultPlay);

  const onClickMusicButton = useCallback(() => {
    setIsPlaying((prevIsPlaying) => {
      const newIsPlaying = !prevIsPlaying;
      if (newIsPlaying) {
        audioRef.current?.play();
      } else {
        audioRef.current?.pause();
      }
      return newIsPlaying;
    });
  }, [audioRef]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !defaultPlay) {
      return;
    }

    audio.play();
    return () => {
      audio.pause();
    };
  }, [audioRef, defaultPlay]);

  return (
    <IconButton
      {...props}
      onClick={onClickMusicButton}
    >
      {isPlaying ? <SpeakerLoudIcon /> : <SpeakerOffIcon />}
    </IconButton>
  );
}
