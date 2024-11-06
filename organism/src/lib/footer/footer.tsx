'use client';
import React from 'react';
import css from './footer.module.scss';

interface Link {
  url: string;
  urlText: string;
}

interface Icon {
  imageUrl: string;
  alt: string;
}

export interface FooterIcon extends Icon {}

export interface SocialIcon extends Icon {
  url: string;
}

export interface QuickLink extends Link {}
export interface TermsLink extends Link {}
export interface ContactLink extends Link {}

// BrandLogo interface
export interface BrandLogo {
  image: string;
  alt: string;
  url: string;
}

export interface FooterLink {
  footerTitle?: string;
  socialIcons?: SocialIcon[];
  quickLinks?: QuickLink[];
  termsLinks?: TermsLink[];
  contactLinks?: ContactLink[];
}

export interface FooterProps {
  footerIcons: FooterIcon[];
  footerLinks: FooterLink[];
  brandLogo: BrandLogo;
}


export function Footer({ footerIcons, footerLinks, brandLogo }: FooterProps) {
  const renderIcons = () => (
    footerIcons.map((icon, index) => (
      <div key={index} className="flex w-[34px] h-[34px] lg:w-[62px] lg:h-[62px]">
        <img src={icon.imageUrl} alt={icon.alt} />
      </div>
    ))
  );

  const renderSocialIcons = (icons: SocialIcon[]) => (
    icons.map((icon, index) => (
      <div key={index} className="w-8 h-8">
        <a href={icon.url} className="text-[var(--milka-light)]">
          <img src={icon.imageUrl} alt={icon.alt} />
        </a>
      </div>
    ))
  );

  const renderLinks = (links: { url: string; urlText: string; }[]) => (
    links.map((link, index) => {
      const [isExternal, setIsExternal] = React.useState<boolean>(false);

      React.useEffect(() => {
          if (typeof window !== 'undefined') {
              setIsExternal(!link.url.includes(window.location.hostname));
          }
      }, []);

      return (
        <a 
          key={index} 
          href={link.url} 
          className="block text-[var(--milka-light)]" 
          target={isExternal ? '_blank' : '_self'} 
        >
          <span className="flex text-sm font-normal leading-[1.3rem] justify-center lg:block">
            {link.urlText}
          </span>
        </a>
      );
    })
  );

  return (
    <>
      <div className="flex justify-center items-center w-full pt-[48px] lg:pt-[64px]">
        <div className="w-full lg:w-[682px] lg:h-[40px]">
          {footerLinks.map((item, index) => item.footerTitle && (
            <h1 key={index} className="text-center condensed font-GHPBlack text-[var(--milka-light)] text-[26px] lg:text-[48px] uppercase">
              {item.footerTitle}
            </h1>
          ))}
        </div>
      </div>

      <div className="flex justify-center lg:mt-10 pt-6 lg:pt-5">
        <div className="w-[400px] lg:w-[870px] gap-2 lg:h-[202px] justify-center flex flex-row flex-wrap">
          {renderIcons()}
        </div>
      </div>

      <div className="w-full mt-12 bg-[var(--milka-dark)] py-10 lg:px-10 lg:py-14">
        <div className="flex flex-col lg:flex-row gap-4 items-center pb-10 lg:pb-8">
          <h3 className="text-[23px] not-italic font-bold text-[var(--milka-light)]">FOLGE UNS</h3>
          <div className="flex gap-6">
            {footerLinks.map(item => item.socialIcons && renderSocialIcons(item.socialIcons))}
          </div>
        </div>

        <div className="flex-col lg:flex lg:flex-row gap-[112px]">
          <div className="lg:w-60 font-GHPBlack">
            {footerLinks.map(item => item.quickLinks && renderLinks(item.quickLinks))}
          </div>

          <div className="mt-5 lg:mt-0 lg:w-[450px]">
            {footerLinks.map(item => item.termsLinks && renderLinks(item.termsLinks))}
          </div>

          <div className='lg:w-72'>
            {footerLinks.map(item => item.contactLinks && renderLinks(item.contactLinks))}
          </div>

          {/* Brand Logo */}
          <div className="w-full mt-10 h-auto flex justify-center lg:justify-end md:h-[106px] lg:mt-0">
            <a href={brandLogo.url}>
              <img src={brandLogo.image} alt={brandLogo.alt}/>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
