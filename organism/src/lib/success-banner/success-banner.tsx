import styles from './success-banner.module.scss';

import { useEffect, useRef } from 'react';
import { Confetti, ConfettiRef } from "@milka/shared-ui";
import { Button, ButtonProps } from '@milka/shared-ui';


export interface ImageProps {
  url: string;
  title?: string;
}
export interface SuccessBannerProps {
  textImg: ImageProps;
  textImgMobile: ImageProps;
  logoImg?: ImageProps,
  logoImgMobile?: ImageProps,
  content?: Array<String>
  cta?: ButtonProps;
  confetti?: boolean;
}

export function SuccessBanner({
  textImg,
  textImgMobile,
  logoImg,
  logoImgMobile,
  content,
  cta,
  confetti = true
}: SuccessBannerProps) {
  const confettiRef = useRef<ConfettiRef>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      confettiRef.current?.fire({});
    }, 2000); // Fire confetti every 5 seconds
    
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);


  return (
    <div className="relative bg-[var(--milka-light)] flex flex-col gap-y-[16px] py-[39px] text-[18px] lg:gap-y-[75px] lg:pt-[104px] lg:min-h-[992px] lg:text-[24px] items-center w-full">
      {confetti &&
        <Confetti
          ref={confettiRef}
          className="absolute left-0 top-0 z-0 size-full"
          options={{
            shapes: ['square', 'circle', 'star'],
            colors: ['#fff', '#3B2774', '#8EE12D'],
            origin: { y: -0.1 },
            spread: 180,
            ticks: 1000,
            particleCount: 75,
          }}
        />
      }
      <picture>
        <source media="(min-width: 992px)" srcSet={textImg?.url} />
        <img src={textImgMobile?.url} alt={textImg?.title || textImgMobile?.title} />
        {/* title has been used as an image beacause of the different font styles and sizes that has been used for the title only
          h1 tag has been used to improve accessibility */}
        <h1 className="sr-only">{textImg?.title || textImgMobile?.title}</h1>
      </picture>
      {
        (logoImg && logoImgMobile) && (
          <picture>
            <source media="(min-width: 992px)" srcSet={logoImg?.url} />
            <img src={logoImgMobile?.url} alt={logoImg?.title || logoImgMobile?.title} />
            {/* title has been used as an image beacause of the different font styles and sizes that has been used for the title only
            h1 tag has been used to improve accessibility */}
            <h1 className="sr-only">{logoImg?.title || logoImgMobile?.title}</h1>
          </picture>
        )
      }
      <div className='flex flex-col gap-y-[20px] leading-30px text-center text-white max-w-[620px] px-[20px]'>
        {
          content && content.map((singleContent, index) => (
            <p key={index}>{singleContent}</p>
          ))
        }
        {
          cta && (
            <div className='mt-[20px]' >
              <Button variant="default" {...cta}>
                {cta.children}
              </Button>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default SuccessBanner;
