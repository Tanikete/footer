import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import styles from './logout.module.scss';

export function LogoutProjectOrganism() {
  const router = useRouter();

  useEffect(() => {
    
    Cookies.remove('token');
    
  
    router.push('/account');
  }, [router]); 

  return (
    <div className={styles['container']}>
      <h1 className="text-2xl condensed">Logging out...</h1>
    </div>
  );
}

export default LogoutProjectOrganism;