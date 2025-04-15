'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import MediaPlayer from '../components/MediaPlayer'

// Data playlist (menggunakan path file sesuai struktur folder)
const playlistData = {
  title: "Playlist 90's Festival",
  description: "Top 5 Lagu favorite lo!",
  coverImage: "/images/covers/playlistcover.jpg", // Lokasi gambar cover playlist
  songs: [
    {
      id: 1,
      title: "Kau Yang Terindah",
      artist: "Java Jive",
      duration: "3:05",
      listeners: "323,490,766",
      url: "/audio/lagu1.mp3", // Lokasi file audio
      coverArt: "/images/songs/foto1.jpeg" // Lokasi gambar cover lagu
    },
    {
      id: 2,
      title: "Dan...",
      artist: "Sheila On 7",
      duration: "4:48",
      listeners: "209,895,185",
      url: "/audio/lagu2.mp3",
      coverArt: "/images/songs/foto2.jpeg"
    },
    {
      id: 3,
      title: "Kasih Jangan Pergi",
      artist: "Bunga",
      duration: "4:27",
      listeners: "227,906,530",
      url: "/audio/lagu3.mp3",
      coverArt: "/images/songs/foto3.jpg"
    },
    {
      id: 4,
      title: "Sakura",
      artist: "Fariz RM",
      duration: "6:25",
      listeners: "243,595,824",
      url: "/audio/lagu4.mp3",
      coverArt: "/images/songs/foto4.jpeg"
    },
    {
      id: 5,
      title: "Cinta",
      artist: "Vina Panduwinata",
      duration: "4:03",
      listeners: "147,694,615",
      url: "/audio/lagu5.mp3",
      coverArt: "/images/songs/foto5.jpeg"
    }
  ]
};

export default function Playlist() {
  const [currentSong, setCurrentSong] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  // Cek apakah pengguna sudah login
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  // Handler untuk memainkan lagu
  const playSong = (song: any) => {
    // Jika sudah memainkan lagu yang sama, toggle play/pause
    if (currentSong && currentSong.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      // Jika memainkan lagu yang berbeda, set lagu baru dan mulai putar
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  // Handler untuk menuju ke halaman letter
  const goToLetter = () => {
    router.push('/letter');
  };

  if (!user) {
    return null; // atau loading spinner
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-spotify-black to-[#121212]">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center">
          <svg className="w-8 h-8 text-spotify-green mr-2" viewBox="0 0 2931 2931" fill="currentColor">
            <path d="M1465.5 0C656.1 0 0 656.1 0 1465.5S656.1 2931 1465.5 2931 2931 2274.9 2931 1465.5C2931 656.2 2274.9.1 1465.5 0zm672.1 2113.6c-26.3 43.2-82.6 56.7-125.6 30.4-344.1-210.3-777.3-257.8-1287.4-141.3-49.2 11.3-98.2-19.5-109.4-68.7-11.3-49.2 19.4-98.2 68.7-109.4 558.2-127.5 1037.7-72.6 1428 163.3 43 26.5 56.7 82.6 30.4 125.6l-4.7.1zm179.3-398.9c-33.1 53.8-103.5 70.6-157.2 37.6-394.2-242.3-994.9-312.8-1460.3-171.3-60.4 18.3-124.2-15.8-142.6-76.1-18.2-60.4 15.9-124.1 76.2-142.5 532.2-161.5 1193.9-83.3 1646.2 194.7 53.8 33.1 70.8 103.4 37.7 157.6zm15.4-415.6c-472.4-280.5-1251.6-306.3-1702.6-169.5-72.4 22-149-18.9-170.9-91.3-21.9-72.4 18.9-149 91.4-171 517.7-157.1 1378.2-126.8 1922 196 65.1 38.7 86.5 122.8 47.9 187.8-38.5 65.2-122.8 86.7-187.8 48z"/>
          </svg>
          <h1 className="text-xl font-bold text-white">Spotify</h1>
        </div>
        <div className="flex items-center">
          <div className="mr-4 text-white">
            Halo, {user?.name}
          </div>
          <button 
            onClick={logout}
            className="text-spotify-gray hover:text-white"
          >
            Keluar
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className={`container mx-auto px-4 ${currentSong ? 'pb-32' : 'pb-8'}`}>
        {/* Playlist Header */}
        <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6 bg-gradient-to-b from-[#303030] to-[#121212] p-6 rounded-lg">
          <div className="w-48 h-48 min-w-48 shadow-lg">
            <img 
              src={playlistData.coverImage} 
              alt="Playlist Cover" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h5 className="uppercase text-xs text-spotify-gray font-bold">Playlist</h5>
            <h2 className="text-5xl font-bold text-white mt-2 mb-4">{playlistData.title}</h2>
            <p className="text-spotify-gray">{playlistData.description}</p>
            <div className="flex items-center mt-4">
              <button 
                className="spotify-button mr-4"
                onClick={() => {
                  if (playlistData.songs.length > 0) {
                    playSong(playlistData.songs[0]);
                  }
                }}
              >
                Putar
              </button>
              <button 
                className="text-spotify-gray hover:text-white border border-spotify-gray hover:border-white px-4 py-2 rounded-full"
                onClick={goToLetter}
              >
                Click Me
              </button>
            </div>
          </div>
        </div>

        {/* Song List */}
        <div className="mt-8">
          <table className="w-full text-left text-spotify-gray">
            <thead className="text-sm uppercase border-b border-[#282828]">
              <tr>
                <th className="pl-4 pr-2 py-2">#</th>
                <th className="px-2 py-2">Judul</th>
                <th className="px-2 py-2 hidden md:table-cell">Artis</th>
                <th className="px-2 py-2 hidden md:table-cell">Pendengar</th>
                <th className="pl-2 pr-4 py-2 text-right">Durasi</th>
              </tr>
            </thead>
            <tbody>
              {playlistData.songs.map((song, index) => (
                <tr 
                  key={song.id} 
                  className={`hover:bg-[#282828] ${currentSong?.id === song.id ? 'text-spotify-green' : 'text-spotify-gray'}`}
                  onClick={() => playSong(song)}
                >
                  <td className="pl-4 pr-2 py-2">{index + 1}</td>
                  <td className="px-2 py-2">
                    <div className="flex items-center">
                      <img src={song.coverArt} alt={song.title} className="w-10 h-10 mr-3" />
                      <span className="font-bold">{song.title}</span>
                    </div>
                  </td>
                  <td className="px-2 py-2 hidden md:table-cell">{song.artist}</td>
                  <td className="px-2 py-2 hidden md:table-cell">{song.listeners}</td>
                  <td className="pl-2 pr-4 py-2 text-right">{song.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Media Player */}
      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0">
          <MediaPlayer 
            song={currentSong} 
            isPlaying={isPlaying} 
            onPlayPause={() => setIsPlaying(!isPlaying)} 
            onNext={() => {
              const currentIndex = playlistData.songs.findIndex(s => s.id === currentSong.id);
              const nextIndex = (currentIndex + 1) % playlistData.songs.length;
              setCurrentSong(playlistData.songs[nextIndex]);
            }}
            onPrevious={() => {
              const currentIndex = playlistData.songs.findIndex(s => s.id === currentSong.id);
              const prevIndex = currentIndex === 0 ? playlistData.songs.length - 1 : currentIndex - 1;
              setCurrentSong(playlistData.songs[prevIndex]);
            }}
          />
        </div>
      )}
    </div>
  );
} 