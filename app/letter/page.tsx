'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'

export default function Letter() {
  const [currentTime, setCurrentTime] = useState(0); // Dimulai dari 0 bukan 34
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const router = useRouter();
  const { user } = useAuth();
  
  // Menggunakan useRef untuk audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Data lagu
  const songData = {
    title: "Chasing Pavements",
    artist: "Adele",
    duration: 210, // 3:30 in seconds
    coverArt: "/images/letter/letter-cover.jpg?v=1",
    audioFile: "/audio/laguletter.mp3?v=1" // Tambahkan parameter query untuk menghindari caching
  };

  // Pesan dalam bentuk lirik bergaya Gen Z (mengikuti format lirik di gambar)
  const letterLines = [
    "That I feel but",
    "All these things don't",
    "Happen to anybody like",
    "you",
    "These things don't matter",
    "To anybody but",
    "Oh, you seemed so happy",
    "To everybody"
  ];

  // Pesan personal tambahan
  const personalMessage = `Halo, bal!

Kalau ngga salah, lo lagi suka lagu-lagu 90's gitu kan? kebetulan gue denger-denger sih lagi mau ada konser 90's gitu, sebenernya gue mau ngajakin dari lama, cuma takut lo sibuk aja. Tapi, pasti lo suka deh sama konser yang ini!

Jangan lupa klik tombol selanjutnya ya, bal! 

See you!`;

  // Efek untuk inisialisasi audio saat komponen mount
  useEffect(() => {
    // Buat elemen audio saat komponen mount
    audioRef.current = new Audio(songData.audioFile);
    
    // Konfigurasi audio untuk performa optimal
    if (audioRef.current) {
      audioRef.current.preload = 'auto';
      audioRef.current.currentTime = 0; // Selalu mulai dari awal (0 detik)
      
      // Set event listener untuk update currentTime
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    }
    
    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current = null;
      }
    };
  }, []);
  
  // Handle timeupdate event
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(Math.floor(audioRef.current.currentTime));
    }
  };

  // Tambah fungsi untuk mengontrol timeline
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value, 10);
    setCurrentTime(newTime);
    
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  // Efek untuk navigasi jika tidak login
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  // Efek untuk kontrol play/pause
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Playback error:', error);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);
  
  // Efek untuk mengubah lirik
  useEffect(() => {
    if (!isPlaying) return;
    
    const lyricsTimer = setInterval(() => {
      setCurrentLineIndex(prev => {
        if (prev >= letterLines.length - 1) {
          clearInterval(lyricsTimer);
          return letterLines.length - 1;
        }
        return prev + 1;
      });
    }, 4000);
    
    return () => clearInterval(lyricsTimer);
  }, [isPlaying, letterLines.length]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleContinue = () => {
    router.push('/gift');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black overflow-auto py-4 sm:py-8 px-2 sm:px-4">
      <div className="max-w-md mx-auto">
        {/* Portrait container dengan border mockup HP */}
        <div className="w-full bg-black text-white flex flex-col h-auto min-h-[600px] sm:min-h-[800px] border-l-4 border-r-4 border-t-4 border-b-4 sm:border-l-8 sm:border-r-8 sm:border-t-8 sm:border-b-8 border-gray-800 rounded-2xl sm:rounded-3xl relative overflow-hidden">
          {/* Header small image strip */}
          <div className="w-full">
            <img 
              src="/images/letter/letterbanner.jpg?v=1" 
              alt="Lyrics Banner" 
              className="w-full h-40 sm:h-60 object-cover opacity-80"
            />
          </div>
          
          {/* Song title and artist */}
          <div className="px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex items-center">
              <div className="flex-grow">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">{songData.title}</h1>
                <p className="text-xl sm:text-2xl text-white mt-2">{songData.artist}</p>
              </div>
              <div className="text-spotify-green ml-4">
                <svg className="w-8 h-8 sm:w-10 sm:h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Player timeline */}
          <div className="px-4 sm:px-6 pt-4 sm:pt-8">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <span className="text-spotify-gray text-xs sm:text-sm">{formatTime(currentTime)}</span>
              <div className="relative w-full mx-2 sm:mx-4 h-1">
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#535353] rounded-full w-full"></div>
                <div 
                  className="absolute top-0 left-0 h-1 bg-white rounded-full pointer-events-none"
                  style={{ width: `${(currentTime / songData.duration) * 100}%` }}
                >
                  <div className="absolute -right-1.5 -top-1.5 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white shadow-md"></div>
                </div>
                <input
                  type="range"
                  min="0"
                  max={songData.duration}
                  value={currentTime}
                  onChange={handleSeek}
                  className="absolute top-0 left-0 right-0 w-full h-1 appearance-none bg-transparent cursor-pointer z-10 opacity-0"
                />
              </div>
              <span className="text-spotify-gray text-xs sm:text-sm">{formatTime(songData.duration)}</span>
            </div>
            
            {/* Player controls */}
            <div className="flex justify-between items-center px-0 sm:px-2 mb-6 sm:mb-8">
              {/* Shuffle */}
              <button className="text-spotify-green opacity-50">
                <svg className="w-4 h-4 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 4L14 8M14 4L18 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 20L10 16M10 20L6 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 9V13C18 16.866 14.866 20 11 20H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 4H7C10.866 4 14 7.13401 14 11V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              {/* Previous */}
              <button className="text-white">
                <svg className="w-8 h-8 sm:w-12 sm:h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 5L9 12L19 19V5Z" fill="currentColor"/>
                  <rect x="7" y="5" width="2" height="14" fill="currentColor"/>
                </svg>
              </button>
              
              {/* Play/Pause */}
              <button 
                onClick={handlePlayPause}
                className="bg-white rounded-full p-3 sm:p-4 text-black"
              >
                {isPlaying ? (
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor"/>
                    <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor"/>
                  </svg>
                ) : (
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 4L20 12L6 20V4Z" fill="currentColor"/>
                  </svg>
                )}
              </button>
              
              {/* Next */}
              <button className="text-white">
                <svg className="w-8 h-8 sm:w-12 sm:h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 5L15 12L5 19V5Z" fill="currentColor"/>
                  <rect x="17" y="5" width="2" height="14" fill="currentColor"/>
                </svg>
              </button>
              
              {/* Repeat */}
              <button className="text-spotify-green">
                <svg className="w-4 h-4 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 1L21 5L17 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 11V9C3 7.89543 3.89543 7 5 7H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 23L3 19L7 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 13V15C21 16.1046 20.1046 17 19 17H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Bottom controls */}
          <div className="flex justify-between items-center px-4 sm:px-6 mb-4 sm:mb-6">
            <button className="text-white">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
                <rect x="8" y="2" width="8" height="5" rx="1" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
            
            <button
              onClick={handleContinue}
              className="bg-spotify-green text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold"
            >
              Join With Me
            </button>
            
            <button className="text-white">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Pesan personal di dalam mockup */}
          <div className="px-4 sm:px-6 pb-6 sm:pb-10 pt-2 sm:pt-4 flex-grow overflow-auto">
            <div className="w-full bg-[#2c3747] bg-opacity-90 rounded-lg p-4 sm:p-8">
              <h2 className="text-xs sm:text-sm font-normal tracking-wider text-gray-300 mb-4 sm:mb-6 text-left">MESSAGE</h2>
              <div className="text-white text-base sm:text-lg whitespace-pre-line font-light leading-relaxed text-justify" style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}>
                {personalMessage}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 