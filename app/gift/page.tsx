'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'

export default function Gift() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketDetails, setTicketDetails] = useState(false);
  const [imageError, setImageError] = useState({
    banner: false,
    barcode: false
  });
  const router = useRouter();
  const { user } = useAuth();

  // Data tiket (contoh)
  const ticketData = {
    eventName: "Konser 90's Festival 2025",
    artist: "Sheila on 7, Javajive, Lingua, Be3, Bunga, The Moffats Reunion",
    venue: "Gambir Expo Kemayoran",
    date: "25 Maret 2025",
    time: "17:00 WIB",
    seat: "FESTIVAL STANDING AREA - GOLD",
    ticketId: "SP-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
    qrValue: "https://example.com/ticket/SP123456",
    bannerImage: "/images/tickets/banner-tiket.jpg",
    barcodeImage: "/images/barcode/barcode.jpg"
  };

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    // Animasi untuk memunculkan hadiah
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [user, router]);

  const handleRedeemClick = () => {
    setIsModalOpen(true);
    setTicketDetails(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white p-2 sm:p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <header className="text-center mb-4 sm:mb-8 pt-4 sm:pt-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-spotify-green" style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif", textShadow: '0 0 1px #1DB954, 0 0 2px #1DB954' }}>FOR YOU!</h1>
          <p className="text-spotify-gray mt-2 font-light" style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}>Ayo kita nonton konser!</p>
        </header>

        {/* Card Hadiah */}
        <div className={`max-w-2xl mx-auto transform transition-all duration-1000 ${isRevealed ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
          <div className="bg-gradient-to-r from-[#1E3264] to-[#056952] rounded-xl shadow-2xl overflow-hidden">
            {/* Card Header */}
            <div className="bg-[#056952] p-4 sm:p-6 text-center">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-white mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 00-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 12 7.4l3.38 4.6L17 10.83 14.92 8H20v6z"/>
              </svg>
              <h2 className="text-2xl sm:text-3xl font-bold">Tiket Konser</h2>
              <p className="text-xs sm:text-sm opacity-80">90's Festival 2025</p>
            </div>
            
            {/* Banner Konser - Mengganti section kosong dengan gambar banner */}
            <div className="w-full overflow-hidden" style={{ height: "150px", maxHeight: "187px" }}>
              {imageError.banner ? (
                <div className="w-full h-full bg-[#056952] flex items-center justify-center">
                  <p className="text-white text-center font-bold">90's Festival 2025</p>
                </div>
              ) : (
                <img 
                  src={ticketData.bannerImage}
                  alt="90's Festival 2025" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error("Error loading image:", ticketData.bannerImage);
                    setImageError(prev => ({...prev, banner: true}));
                  }}
                />
              )}
            </div>
            
            {/* Card Content */}
            <div className="p-4 sm:p-8 bg-[#1E3264] bg-opacity-90">
              <div className="bg-[#121212] bg-opacity-50 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-1">{ticketData.eventName}</h3>
                <p className="text-base sm:text-lg text-spotify-gray">{ticketData.artist}</p>
                <div className="flex flex-wrap mt-4">
                  <div className="w-1/2 mb-3">
                    <p className="text-xs text-spotify-gray">LOKASI</p>
                    <p className="font-medium text-sm sm:text-base">{ticketData.venue}</p>
                  </div>
                  <div className="w-1/2 mb-3">
                    <p className="text-xs text-spotify-gray">TANGGAL</p>
                    <p className="font-medium text-sm sm:text-base">{ticketData.date}</p>
                  </div>
                  <div className="w-1/2">
                    <p className="text-xs text-spotify-gray">WAKTU</p>
                    <p className="font-medium text-sm sm:text-base">{ticketData.time}</p>
                  </div>
                  <div className="w-1/2">
                    <p className="text-xs text-spotify-gray">TEMPAT DUDUK</p>
                    <p className="font-medium text-sm sm:text-base">{ticketData.seat}</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <button 
                  onClick={handleRedeemClick}
                  className="spotify-button py-3 sm:py-4 px-6 sm:px-8 text-base sm:text-lg animate-pulse-slow"
                >
                  Redeem Tiket
                </button>
                <p className="mt-2 text-xs sm:text-sm text-spotify-gray">
                  Klik untuk melihat detail tiket dan QR code
                </p>
              </div>
            </div>
            
            {/* Card Footer */}
            <div className="bg-[#056952] p-3 sm:p-4 text-center border-t border-[#1e1e1e]">
              <p className="text-xs sm:text-sm opacity-80">Ticket ID: {ticketData.ticketId}</p>
              <p className="text-xs mt-1 opacity-60">Hubungi pengirim kalau sudah reedem tiket nya</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Tiket */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-start justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-[#121212] rounded-lg shadow-2xl max-w-md w-full p-4 sm:p-6 relative my-12 mt-16 sm:mt-12">
            <button 
              onClick={handleCloseModal}
              className="absolute right-4 top-4 text-spotify-gray hover:text-white"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4 mt-4">Detail Tiket</h3>
              
              {/* QR Code - Mengganti dengan gambar barcode asli */}
              <div className="bg-white p-4 rounded-lg inline-block mb-4">
                {imageError.barcode ? (
                  <div className="w-40 h-40 sm:w-48 sm:h-48 bg-gray-200 flex items-center justify-center">
                    <div className="text-black text-center">
                      <p className="font-bold">QR Code</p>
                      <p className="text-xs mt-2">Ticket ID: {ticketData.ticketId}</p>
                    </div>
                  </div>
                ) : (
                  <img 
                    src={ticketData.barcodeImage}
                    alt="Scan this barcode"
                    className="w-40 h-40 sm:w-48 sm:h-48 object-contain"
                    onError={(e) => {
                      console.error("Error loading barcode:", ticketData.barcodeImage);
                      setImageError(prev => ({...prev, barcode: true}));
                    }}
                  />
                )}
                <div className="text-black font-bold mt-3 animate-pulse bg-gradient-to-r from-[#1DB954] to-[#056952] bg-clip-text text-transparent text-lg sm:text-xl">
                  SCAN ME
                </div>
              </div>
              
              <div className="text-left border border-[#333] rounded-lg p-3 sm:p-4 mb-4 text-xs sm:text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-spotify-gray">Event:</p>
                    <p className="font-bold">{ticketData.eventName}</p>
                  </div>
                  <div>
                    <p className="text-spotify-gray">Artist:</p>
                    <p className="font-bold">{ticketData.artist}</p>
                  </div>
                  <div>
                    <p className="text-spotify-gray">Date:</p>
                    <p className="font-bold">{ticketData.date}</p>
                  </div>
                  <div>
                    <p className="text-spotify-gray">Time:</p>
                    <p className="font-bold">{ticketData.time}</p>
                  </div>
                  <div>
                    <p className="text-spotify-gray">Venue:</p>
                    <p className="font-bold">{ticketData.venue}</p>
                  </div>
                  <div>
                    <p className="text-spotify-gray">Seat:</p>
                    <p className="font-bold">{ticketData.seat}</p>
                  </div>
                </div>
              </div>
              
              <p className="text-spotify-green font-medium mt-4 text-sm sm:text-base">
                Ticket ID: {ticketData.ticketId}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 