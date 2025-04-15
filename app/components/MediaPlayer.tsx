'use client'

import { useState, useEffect, useRef } from 'react'

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
  url: string;
  coverArt: string;
}

interface MediaPlayerProps {
  song: Song;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({
  song,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Simpan referensi lagu sebelumnya untuk membandingkan
  const prevSongRef = useRef<number | null>(null);
  
  useEffect(() => {
    // Untuk menangani audio saat isPlaying berubah
    if (isPlaying) {
      // Pastikan URL audio selalu tersedia sebelum pemutaran
      if (audioRef.current && audioRef.current.src) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Playback error:', error);
            // Jika saat ini sedang diputar, hentikan pemutaran
            if (isPlaying) {
              onPlayPause();
            }
          });
        }
      } else if (audioRef.current) {
        // Jika src tidak tersedia, set ulang
        audioRef.current.src = song.url;
        audioRef.current.load();
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Playback error after reload:', error);
            // Jika saat ini sedang diputar, hentikan pemutaran
            if (isPlaying) {
              onPlayPause();
            }
          });
        }
      }
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, song.url, onPlayPause]);
  
  useEffect(() => {
    // Interval untuk memperbarui progress bar
    if (isPlaying) {
      const interval = setInterval(() => {
        if (audioRef.current) {
          setCurrentTime(Math.floor(audioRef.current.currentTime));
        }
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying]);
  
  useEffect(() => {
    // Cek apakah ini lagu baru yang berbeda dari sebelumnya
    const isNewSong = prevSongRef.current !== song.id;
    
    if (isNewSong) {
      // Reset waktu hanya jika lagu diganti
      setCurrentTime(0);
      
      // Force reload audio hanya saat lagu berubah
      if (audioRef.current) {
        audioRef.current.load();
      }
      
      // Update referensi lagu sebelumnya
      prevSongRef.current = song.id;
    }
    
    // Play lagu jika isPlaying true
    if (isPlaying && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Playback error:', error);
          // Perbarui onPlayPause disini jika diperlukan
          if (isPlaying) {
            onPlayPause();
          }
        });
      }
    }
  }, [song, isPlaying, onPlayPause]);
  
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value, 10);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };
  
  // Tambahkan handler error baru
  const handleAudioError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    console.error('Audio error:', e);
    if (audioRef.current) {
      // Coba mulai ulang audio
      audioRef.current.src = song.url;
      audioRef.current.load();
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Could not recover audio playback:', error);
            // Gunakan onPlayPause untuk menghentikan pemutaran
            if (isPlaying) {
              onPlayPause();
            }
          });
        }
      }
    }
  };
  
  return (
    <div className="bg-black border-t border-[#282828] p-4 flex items-center h-24">
      {/* Audio element (hidden but functional) */}
      <audio 
        ref={audioRef}
        src={song.url} 
        onTimeUpdate={(e) => setCurrentTime(Math.floor((e.target as HTMLAudioElement).currentTime))}
        onLoadedMetadata={(e) => {
          const audio = e.target as HTMLAudioElement;
          // Menggunakan durasi dari data lagu yang dikirim
          const timeArray = song.duration.split(':');
          const durationInSeconds = parseInt(timeArray[0]) * 60 + parseInt(timeArray[1]);
          setDuration(durationInSeconds);
          audio.volume = 0.8; // Set default volume
        }}
        onError={handleAudioError}
        onEnded={() => {
          setCurrentTime(0);
          onNext();
        }}
      />
      
      {/* Song info */}
      <div className="flex items-center w-1/3">
        <img 
          src={song.coverArt} 
          alt={song.title} 
          className="w-14 h-14 mr-3 object-cover" 
        />
        <div>
          <h4 className="text-white text-sm font-medium">{song.title}</h4>
          <p className="text-spotify-gray text-xs">{song.artist}</p>
        </div>
      </div>
      
      {/* Player controls */}
      <div className="flex flex-col items-center justify-center w-1/3">
        <div className="flex items-center justify-center mb-1">
          <button 
            onClick={onPrevious}
            className="text-white hover:text-white mx-3"
            aria-label="Previous song"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
            </svg>
          </button>
          
          <button 
            onClick={onPlayPause}
            className="bg-white rounded-full mx-4 hover:scale-105 transition text-black flex items-center justify-center w-10 h-10"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor"/>
                <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 4L20 12L6 20V4Z" fill="currentColor"/>
              </svg>
            )}
          </button>
          
          <button 
            onClick={onNext}
            className="text-white hover:text-white mx-3"
            aria-label="Next song"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798L4.555 5.168z" />
            </svg>
          </button>
        </div>
        
        <div className="w-full flex items-center">
          <span className="text-xs text-white min-w-[40px] text-right mr-2">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-[#5e5e5e] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
          />
          <span className="text-xs text-white min-w-[40px] ml-2">
            {formatTime(duration)}
          </span>
        </div>
      </div>
      
      {/* Volume control */}
      <div className="w-1/3 flex justify-end">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-spotify-gray mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
          </svg>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="80"
            onChange={(e) => {
              if (audioRef.current) {
                audioRef.current.volume = parseInt(e.target.value) / 100;
              }
            }}
            className="w-24 h-1 bg-[#5e5e5e] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer; 