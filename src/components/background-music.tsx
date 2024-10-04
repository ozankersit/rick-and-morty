"use client"
import Image from 'next/image';
import { useRef, useState } from 'react';

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/rick-and-morty-theme-song.mp3');
      audioRef.current.loop = true;
    }

    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handlePauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className='container mx-auto'>
      {!isPlaying ? (
        <Image src={"/morty.png"} alt='rick and morty' width={100} height={100} onClick={handlePlayMusic} className='animate-wiggle'/>
      ) : (
        <Image src={"/morty.png"} alt='rick and morty' width={100} height={100} onClick={handlePauseMusic}/>
      )}
    </div>
  );
};

export default BackgroundMusic;
