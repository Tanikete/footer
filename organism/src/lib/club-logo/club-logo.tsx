import { useEffect, useState } from 'react';
import styles from './club-logo.module.scss';
import Cookies from 'js-cookie';
import logosData from '../../../../apps/milka/data/registrationClub.json';
import { Button } from '@milka/shared-ui';

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
      const res = await fetch(
        'https://api.fcmilka.de/UserManagement/GetProfileInfoPromo',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ token }),
        }
      );

      if (!res.ok) throw new Error('Failed to fetch logo');

      const data: ClubLogoProps = await res.json();
      setFavClub(data.favclub);
      setLogo(`/images/logos/${data.favclub}.png`);
    } catch (error: any) {
      setError(error.message || 'An error occurred while fetching the logo');
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
        const res = await fetch(
          'https://api.fcmilka.de/UserManagement/UpdateProfileInfo',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (!res.ok) throw new Error('Failed to update favorite club');

        console.log('Favorite club updated successfully.');
      } catch (error: any) {
        setError(
          error.message || 'An error occurred while updating the favorite club'
        );
      }
    }
  };

  const bundesligaLogos = logosData.registerClubIconsOne;
  const secondBundesligaLogos = logosData.registerClubIconsTwo;

  const logosToDisplay =
    activeTab === 'Bundesliga' ? bundesligaLogos : secondBundesligaLogos;

  return (
    <div>
      <div
        className={`${styles['container']} rounded-md flex justify-between items-center bg-[var(--milka-100,#4f3d82)] p-4 max-w-md mx-auto`}
      >
        <div className="flex flex-col lg:block md:hidden sm:block">
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
        {logosData.subfooter}
      </p>

      {showOverlay && (
        <div className={styles.overlay} onClick={toggleOverlay}>
          <div
            className={styles.overlayContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-4">
              <div className="flex justify-center mb-4 sm:hidden">
                <Button type="submit" onClick={handleSaveSelection}>
                  {logosData.overButtontext}
                </Button>
              </div>
              <div className="flex items-center justify-center gap-x-8 text-xl md:text-3xl lg:text-5xl mb-6">
                <button
                  className={`font-bold ${
                    activeTab === 'Bundesliga'
                      ? 'text-[var(--milka-dark)] border-b-4 border-[var(--milka-dark)]'
                      : 'text-gray-500'
                  }`}
                  onClick={() => setActiveTab('Bundesliga')}
                >
                  BUNDESLIGA
                </button>
                <button
                  className={`font-bold ${
                    activeTab === '2. Bundesliga'
                      ? 'text-[var(--milka-dark)] border-b-4 border-[var(--milka-dark)]'
                      : 'text-gray-500'
                  }`}
                  onClick={() => setActiveTab('2. Bundesliga')}
                >
                  2. BUNDESLIGA
                </button>
              </div>

              <div
                className={`grid gap-4 mb-6 ${
                  activeTab === 'Bundesliga'
                    ? 'grid-cols-2 sm:grid-cols-6'
                    : 'grid-cols-2 sm:grid-cols-6'
                }`}
              >
                {logosToDisplay.map((logo, index) => (
                  <div
                    key={index}
                    onClick={() => handleLogoSelect(logo.name)}
                    className={`flex flex-col justify-center items-center cursor-pointer rounded-lg p-1 ${
                      selectedClub === logo.name
                        ? 'shadow-lg ring-2 ring-[var(--milka-dark)]'
                        : ''
                    }`}
                  >
                    <img
                      src={`${logo.imageUrl}`}
                      alt={logo.alt}
                      className="w-12 h-12 lg:w-16 lg:h-16"
                    />

                    <div className="text-sm text-center pb-4 font-GHPBlack uppercase mx-auto text-[var(--milka-dark)]">
                      {logo.name}
                    </div>
                  </div>
                ))}
              </div>

              <div className="hidden sm:flex justify-center">
                <Button type="submit" onClick={handleSaveSelection}>
                  {logosData.overButtontext}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClubLogo;
