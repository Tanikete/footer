"use client";

import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@milka/shared-ui";

import { MobileDetect } from "@milka/organism";

interface MenuItem {
  itemImg: string;
  itemText: string;
  itemLink: string;
}

export interface HeaderProps{
  logo: {
    url: string;
    alt: string;
    logoLink: string;
  };
  gif: {
    url: string;
    alt: string;
    link: string;
  }
  menuItems: MenuItem[];
}

const hamburgerSvg = (
  <svg role="img" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <title>Hamburger Menu</title>
    <path d="M5.33398 9.33301H26.6673M5.33398 15.9997H26.6673M5.33398 22.6663H26.6673" stroke="white" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const closeSvg = (
  <svg role="img" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
     <title>Close Menu</title>
    <path d="M8 8L24 24M24 8L8 24" stroke="white" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const profileSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M22.666 26.6663C24.1388 26.6663 25.3933 25.4529 25.0595 24.0185C24.2291 20.4504 21.4523 18.6663 15.9993 18.6663C10.5464 18.6663 7.76961 20.4504 6.93924 24.0185C6.60542 25.4529 7.85992 26.6663 9.33268 26.6663H22.666Z" stroke="white" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
    <path fillRule="evenodd" clipRule="evenodd" d="M15.9993 14.6663C18.666 14.6663 19.9993 13.333 19.9993 9.99967C19.9993 6.66634 18.666 5.33301 15.9993 5.33301C13.3327 5.33301 11.9993 6.66634 11.9993 9.99967C11.9993 13.333 13.3327 14.6663 15.9993 14.6663Z" stroke="white" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);


export function Header({logo, gif, menuItems}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = MobileDetect() < 992;

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    // Allow scrolling in landscape mode
    if (isOpen && isMobile && window.innerHeight < window.innerWidth) {
      document.body.style.overflow = 'unset';
    } else {
      document.body.style.overflow = isOpen && isMobile ? 'hidden' : 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isMobile]);

  return (
    <div className="relative">
      <NavigationMenu className="w-full h-28  bg-[var(--milka-light)] justify-center shadow-[0px_2px_2px_0px_rgba(59,39,116,0.2)]">
        <NavigationMenuList className="flex justify-between items-center h-28">
          <NavigationMenuItem>
            <NavigationMenuLink href={logo?.logoLink}>
              <img src={logo?.url} alt={logo?.alt} className="ml-4 w-[55px] h-[62px] lg:ml-8 lg:w-[73px] lg:h-[82px]" />
            </NavigationMenuLink>

          </NavigationMenuItem>
          {(isMobile && !isOpen) || !isMobile ? (
            <NavigationMenuLink href={gif?.link} target="_blank">
              <img src={gif?.url} alt={gif?.alt} className="w-[142px] h-11 md:w-[242px] md:h-[70px]" />
            </NavigationMenuLink>
          ) : null}


          <NavigationMenuItem className="flex items-center">
            <button className="flex items-center mr-5 lg:mr-10" onClick={toggleMenu}>
              <span className="hidden lg:block text-lg text-[var(--milka-white)] font-bold mr-2 ">MENU</span>
              {isOpen ? closeSvg : hamburgerSvg}
            </button>
            {/* <NavigationMenuLink className="mx-4 lg:mx-8">
              {profileSvg}
            </NavigationMenuLink> */}
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>

      {isOpen && (
              <>
          <div className="fixed w-screen h-screen z-10" onClick={toggleMenu}></div>
          <div className="absolute w-full h-screen bg-[var(--milka-light)] z-10 flex gap-6 pl-6 md:h-[500px] lg:h-[400px] lg:overflow-auto lg:justify-start xl:justify-center pt-[128px] lg:pt-[0px] text-lg shadow-[0px_18px_24px_0px_rgba(0,0,0,0.25)]">
            <div className="flex flex-col lg:flex-row lg:space-x-6 lg:items-center">
              {menuItems.map((item, index) => (
                isMobile ? (
                  <div key={index} className="condensed text-[var(--milka-white)] text-4xl mb-8">
                    <a href={item.itemLink}>{item.itemText}</a>
                  </div>
                ) : (
                  <div key={index} className="relative overflow-hidden group">
                    <a href={item.itemLink} className="flex relative lg:justify-center lg:w-[250px] lg:h-[300px]">
                      <img
                        src={item.itemImg}
                        alt={item.itemText}
                        className="hidden lg:block w-full h-full object-cover rounded transition-transform duration-300 ease-in-out transform group-hover:scale-110" />
                      <div className="hidden lg:block absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-50"></div>
                      <span className="text-[var(--milka-white)] w-[218px] font-GHPBlack leading-6 scale-y-150 absolute bottom-0 text-3xl text-center flex items-center justify-center mb-6 transition-transform duration-300 ease-in-out group-hover:-translate-y-2">
                        {item.itemText}
                      </span>
                    </a>
                  </div>
                )
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Header;