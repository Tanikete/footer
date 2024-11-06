"use client" 
import { useEffect, useState } from 'react';
import { Profile } from '@milka/organism';
import styles from './page.module.scss';
import data from '../../../data/myaccount.json';

const myaccount = {
  title: data?.account?.title,
  subtitle: data?.account?.subtitle,
  mainkonto: {
    url: data?.account?.mainkonto?.url,
    children: data?.account?.mainkonto?.children,
  },
  footer: data?.account?.footer,
  images: {
    desktop: data?.account?.images?.desktop,
    mobile: data?.account?.images?.mobile,
  },
  infomation: data?.account?.infomation,
  kontoinformation: {
    url: data?.account?.kontoinformation?.url,
    children: data?.account?.kontoinformation?.children,
  },
  passwordcta: {
    url: data?.account?.passwordcta?.url,
    children: data?.account?.passwordcta?.children,
  },
  password_title: data?.account?.password_title,
  password_subtitle: data?.account?.password_subtitle,
  delete_title: data?.account?.delete_title,
  deletecta: {
    url: data?.account?.deletecta?.url,
    children: data?.account?.deletecta?.children,
  },
  instruction: data?.account?.instruction,
};

export default function MyAccount() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.container}>
      <Profile account={myaccount} />
    </div>
  );
}
