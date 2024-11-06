import { useEffect, useState } from "react";
import styles from './club-logo.module.scss';
import Cookies from 'js-cookie';

interface ClubLogoProps {
  favclub: string;
}

export function ClubLogo() {
  const [logo, setLogo] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogo = async () => {
    const token = Cookies.get('token');
    try {
      const res = await fetch("https://api.fcmilka.de/UserManagement/GetProfileInfoPromo", {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`, 
        },
        body: JSON.stringify({token}), 
      });

      if (!res.ok) throw new Error("Failed to fetch logo");

      const data: ClubLogoProps = await res.json();
      setLogo(`/images/Footer/${data.favclub}.png`);
      console.log(data.favclub);
    } catch (error: any) {
      setError(error.message || "An error occurred while fetching the logo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogo();
  }, []);

  return (
    <div>
      <div className={`${styles['container']} rounded-md flex justify-between items-center bg-[var(--milka-100,#4f3d82)] p-4 max-w-md mx-auto`}>
        <div className="flex flex-col">
          <h1 className="text-[var(--White,#FFF)] text-2xl condensed lg:text-lg">MEIN CLUB</h1>
          <span className="bg-[var(--milka-100, #7D69AC)] pt-1 text-2xl condensed lg:text-lg" style={{ color: '#7D69AC' }}>ÄNDERN</span>
        </div>
        <div>
          {loading ? (
            <div className="w-24 h-24 bg-gray-300 animate-pulse"></div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : logo ? (
            <img src={logo} alt="Club Logo" className="w-24 h-24 object-contain" />
          ) : (
            <div className="w-24 h-24 bg-gray-300"></div>
          )}
        </div>
      </div>
      <p className="mt-4 text-left text-[var(--White,#FFF)] relative z-10">
        Die Gewinnvergabe erfolgt unabhängig von deiner Clubauswahl.
      </p>
    </div>
  );
}

export default ClubLogo;