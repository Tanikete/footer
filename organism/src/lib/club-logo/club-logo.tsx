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
  const [selectedClub, setSelectedClub] = useState<string | null>(null); // New state for temporary selection

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
      setFavClub(data.favclub); // Set the current favorite club
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
    setSelectedClub(clubName); // Set the temporary selected club
  };

  const handleSaveSelection = async () => {
    if (selectedClub) {
      setFavClub(selectedClub); // Commit the selected club to favClub
      setLogo(`/images/logos/${selectedClub}.png`); // Update the logo path
      setShowOverlay(false); // Close the overlay

      // Submit the favClub and token as FormData to the API
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

  // Separate the logos into two categories
  const bundesligaLogos = logosData.logos.filter(logo => logo.category === "Bundesliga").slice(0, 18);
  const secondBundesligaLogos = logosData.logos.filter(logo => logo.category === "2. Bundesliga").slice(0, 18);

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
              <h2 className="text-[var(--milka-light)] font-bold text-xl">
                BUNDESLIGA
              </h2>
              {/* Display Bundesliga logos */}
              <div className="grid grid-cols-5 gap-4 mb-6">
                {bundesligaLogos.map((logo, index) => (
                  <div key={index} className="flex justify-center items-center cursor-pointer" onClick={() => handleLogoSelect(logo.name)}>
                    <img
                      src={`/images/logos/${logo.image}`}
                      alt={logo.alt}
                      className="w-12 h-12 lg:w-16 lg:h-16"
                    />
                  </div>
                ))}
              </div>

              <h2 className="text-[var(--milka-light)] font-bold text-xl">
                2. BUNDESLIGA
              </h2>
              {/* Display 2. Bundesliga logos */}
              <div className="grid grid-cols-5 gap-4 mb-6">
                {secondBundesligaLogos.map((logo, index) => (
                  <div key={index} className="flex justify-center items-center cursor-pointer" onClick={() => handleLogoSelect(logo.name)}>
                    <img
                      src={`/images/logos/${logo.image}`}
                      alt={logo.alt}
                      className="w-12 h-12 lg:w-16 lg:h-16"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleSaveSelection}
              className="bg-green-500 text-white py-2 px-6 rounded"
            >
              FERTIG
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClubLogo;
