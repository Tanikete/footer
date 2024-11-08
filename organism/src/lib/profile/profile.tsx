import { useState, useEffect } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { MeinKonto, accountProps } from '../account/account';
import KontoInformationen from '../account-information/account-information';
import PasswortAendern from '../change-password/change-password';
import AccountLoeschen from '../delete-account/delete-account';
import Logout from '../logout/logout';
import ClubLogo from '../club-logo/club-logo';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';


export interface ProfileProps {
  account: accountProps;
}

const ProfileData = {
  links: [
    { name: 'MEIN KONTO', href: '/my-account', component: MeinKonto },
    {
      name: 'KONTO INFORMATIONEN',
      href: '/my-account/konto-information',
      component: KontoInformationen,
    },
    {
      name: 'PASSWORT ÄNDERN',
      href: '/my-account/change-password',
      component: PasswortAendern,
    },
    { name: 'ACCOUNT LÖSCHEN', href: '/my-account/delete-account', component: AccountLoeschen },
    { name: 'LOGOUT', href: '#', component: Logout },
  ],
};

export function Profile({ account }: ProfileProps) {
  const [selectedComponent, setSelectedComponent] = useState(() => getInitialComponent(account).component);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(getInitialComponent(account).name);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token'); 
    if (!token) {
      router.push('/account'); 
    }
  }, [router]);

  function getInitialComponent(account: accountProps) {
    const currentPath = window.location.pathname;
    const matchingLink = ProfileData.links.find(link => link.href === currentPath);

    if (matchingLink && matchingLink.component) {
      return {
        component: <matchingLink.component {...account} />,
        name: matchingLink.name,
      };
    }

    // Default to MEIN KONTO if no match is found
    return {
      component: <MeinKonto {...account} />,
      name: 'MEIN KONTO',
    };
  }

  const handleLinkClick = (name: string, Component: React.ComponentType<any>, url: string) => {
    setSelectedComponent(<Component {...account} />);
    setActiveLink(name);
    setIsMenuOpen(false);
    
    // Update the browser URL without reloading the page
    window.history.pushState({}, '', url);
  };

  return (
    <div className="2xl:h-[918px] bg-[var(--milka-dark)] text-white">
      {/* Mobile Navigation Toggle */}
      <div className="md:hidden p-4 bg-[var(--milka-dark)]">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-full text-left  condensed text-2xl p-2 bg-[var(--milka-dark)] rounded-md flex justify-between items-center"
        >
          {activeLink}
          {isMenuOpen ? (
            <ChevronUpIcon className="w-5 h-5" />
          ) : (
            <ChevronDownIcon className="w-5 h-5" />
          )}
        </button>
        <div className="w-full h-[1px] bg-white mx-auto mt-1"></div>
      </div>

      {/* Sidebar (Desktop) or Dropdown (Mobile) */}
      <div className="flex flex-col md:flex-row lg:pt-[72px]">
        {/* Navigation Links */}
        <div className={`md:w-1/5 p-4 bg-[var(--milka-dark)] ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
          <ul className="space-y-4 leading- text-2xl">
            {ProfileData.links.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className={`condensed text-3xl text-[32px] ${
                    activeLink === link.name
                      ? 'text-[var(--Milka-grn,#8EE12D)]' // Active link color
                      : 'text-[var(--White,#FFF)]' // Inactive link color
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.name, link.component, link.href); // Pass URL
                  }}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="w-full h-[1px] bg-white mx-auto mt-1 md:hidden"></div>
          {/* MEIN CLUB Section - Visible for Desktop and Tablet */}
          <div className="mt-4 hidden md:block">
            <ClubLogo /> {/* Logo here */}
          </div>
        </div>

        {/* Content Display */}
        <div className="md:w-3/4 w-full p-8">{selectedComponent}</div>
      </div>

      {/* MEIN CLUB Section - Place this at the end of the page for mobile view */}
      <div className="mt-4 rounded-md md:hidden w-[335px] h-[106px] flex justify-center items-center mx-auto">
        <ClubLogo /> {/* Logo here */}
      </div>
    </div>
  );
}

export default Profile;
