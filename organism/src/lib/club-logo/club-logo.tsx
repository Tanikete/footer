import { useEffect, useState } from "react";
import styles from './club-logo.module.scss';
import Cookies from 'js-cookie';
import logosData from '../../../../apps/milka/data/logos.json';

interface ClubLogoProps {
  favclub: string;
}

export function ClubLogo() {
  const [logo, setLogo] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [favClub, setFavClub] = useState<string | null>(null);
  const [selectedClub, setSelectedClub] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('Bundesliga');

  const fetchLogo = async () => {
    const token = Cookies.get('token');
    try {
      const res = await fetch("https://api.fcmilka.de/UserManagement/GetProfileInfoPromo", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ token }),
      });

      if (!res.ok) throw new Error("Failed to fetch logo");

      const data: ClubLogoProps = await res.json();
      setFavClub(data.favclub);
      setLogo(`/images/logos/${data.favclub}.png`);
    } catch (error: any) {
      setError(error.message || "An error occurred while fetching the logo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogo();
  }, []);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  const handleLogoSelect = (clubName: string) => {
    setSelectedClub(clubName);
  };

  const handleSaveSelection = async () => {
    if (selectedClub) {
      setFavClub(selectedClub);
      setLogo(`/images/logos/${selectedClub}.png`);
      setShowOverlay(false);

      const token = Cookies.get('token');
      const formData = new FormData();
      formData.append('team1', selectedClub);
      formData.append('token', token || '');

      try {
        const res = await fetch("https://api.fcmilka.de/UserManagement/UpdateProfileInfo", {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });

        if (!res.ok) throw new Error("Failed to update favorite club");

        console.log("Favorite club updated successfully.");
      } catch (error: any) {
        setError(error.message || "An error occurred while updating the favorite club");
      }
    }
  };

  // Access the two lists in the new format (registerClubIconsOne and registerClubIconsTwo)
  const bundesligaLogos = logosData.registerClubIconsOne;
  const secondBundesligaLogos = logosData.registerClubIconsTwo;

  const logosToDisplay = activeTab === 'Bundesliga' ? bundesligaLogos : secondBundesligaLogos;

  return (
    <div>
      <div
        className={`${styles['container']} rounded-md flex justify-between items-center bg-[var(--milka-100,#4f3d82)] p-4 max-w-md mx-auto`}
      >
        <div className="flex flex-col">
          <h1 className="text-[var(--White,#FFF)] text-2xl condensed lg:text-lg">
            MEIN CLUB
          </h1>
          <span
            className="bg-[var(--milka-100, #7D69AC)] pt-1 text-2xl condensed lg:text-lg"
            style={{ color: '#7D69AC' }}
          >
            ÄNDERN
          </span>
        </div>
        <div onClick={toggleOverlay} className="cursor-pointer">
          {loading ? (
            <div className="w-24 h-24 bg-gray-300 animate-pulse"></div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : logo ? (
            <img
              src={logo}
              alt="Club Logo"
              className="w-24 h-24 object-contain"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-300"></div>
          )}
        </div>
      </div>
      <p className="mt-4 text-left text-[var(--White,#FFF)] relative z-10">
        Die Gewinnvergabe erfolgt unabhängig von deiner Clubauswahl.
      </p>

      {/* Overlay */}
      {showOverlay && (
        <div className={styles.overlay} onClick={toggleOverlay}>
          <div
            className={styles.overlayContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-4">
              <div className="flex justify-center mb-4 sm:hidden" >
                <button
                  onClick={handleSaveSelection}
                  className="bg-green-500 text-white py-2 px-6 rounded"
                >
                  FERTIG
                </button>
              </div>
              <div className="flex justify-center space-x-4 mb-6">
                <button
                  className={`font-bold text-xl ${activeTab === 'Bundesliga' ? 'text-[var(--milka-light)]' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('Bundesliga')}
                >
                  BUNDESLIGA
                </button>
                <button
                  className={`font-bold text-xl ${activeTab === '2. Bundesliga' ? 'text-[var(--milka-light)]' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('2. Bundesliga')}
                >
                  2. BUNDESLIGA
                </button>
              </div>

              <div
                className={`grid gap-4 mb-6 ${
                  activeTab === 'Bundesliga' ? 'grid-cols-2 sm:grid-cols-6' : 'grid-cols-2 sm:grid-cols-6'
                }`}
              >
                {logosToDisplay.map((logo, index) => (
                  <div key={index}
                       onClick={() => handleLogoSelect(logo.name)}
                       className={`flex justify-center items-center cursor-pointer rounded-lg p-1 ${selectedClub === logo.name ? 'shadow-lg ring-2 ring-[var(--milka-light)]' : ''}`}
                  >
                    <img
                      src={`${logo.imageUrl}`}
                      alt={logo.alt}
                      className="w-12 h-12 lg:w-16 lg:h-16"
                    />
                  </div>
                ))}
              </div>

              <div className="lg:block hidden flex justify-center ">
                <button
                  onClick={handleSaveSelection}
                  className="bg-green-500 text-white py-2 px-6 rounded"
                >
                  FERTIG
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClubLogo;
