"use client"
import { useEffect, useState } from 'react';

//detects if screen is mobile or not
export function MobileDetect() {
   // set 375 px by default (mobile width)
   const isBrowser = typeof window !== 'undefined';
   const [width, setWidth] = useState(isBrowser ? window.innerWidth : 375);
 
   const handleResize = () => setWidth(window.innerWidth);
 
   useEffect(() => {
     handleResize();
   }, []);
 
   useEffect(() => {
     window.addEventListener('resize', handleResize);
     return () => window.removeEventListener('resize', handleResize);
   }, [width]);
 
   return width;
}

export default MobileDetect;
