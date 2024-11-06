'use client'
import { Button, ButtonProps } from '@milka/shared-ui';

import VideoCard, { VideoCardProps } from '../video-card/video-card';

interface ImageProps {
  url: string;
  title?: string;
}

interface ImageMobileDesktopProps {
  desktop: ImageProps;
  mobile: ImageProps;
  title?: string
}

export interface FairplayBanner {
  backgroundImg?: ImageProps;
  partnerLogoImg?: ImageMobileDesktopProps;
  titleImg: ImageMobileDesktopProps;
  video: VideoCardProps;
  videoTitle: string;
  cta?: ButtonProps;
}

export function FairplayBanner({
  backgroundImg,
  partnerLogoImg,
  titleImg,
  video,
  videoTitle,
  cta
} : FairplayBanner) {

  return (
    <div className="w-full max-lg:min-h-[930px] bg-[var(--milka-dark)] relative overflow-hidden h-auto">
      <picture>
        <source media="(min-width: 992px) or (orientation: landscape)" srcSet={backgroundImg?.url} />
        <img
         className="max-lg:hidden w-full min-h-[820px] object-cover object-center"
         src={backgroundImg?.url}
          alt={backgroundImg?.title || backgroundImg?.title}
          aria-hidden={true}
        />
      </picture>
      <div className="absolute inset-0 flex flex-col items-center py-[48px] lg:justify-center lg:h-full lg:gap-[86px]">
        <div className="flex flex-col gap-[32px] lg:flex-row  items-center">
          <div className="flex flex-col gap-[38px] lg:gap-[24px] items-center">
            <picture>
              <source media="(min-width: 992px)" srcSet={partnerLogoImg?.desktop.url} />
              <img className="w-[195px] h-[60px] lg:w-[235px] lg:h-[72px] mb-[10px]" src={partnerLogoImg?.mobile.url} alt={partnerLogoImg?.title} />
              {/* title has been used as an image beacause of the different font styles and sizes that has been used for the title only
              h1 tag has been used to improve accessibility */}
              <h1 className="sr-only">{titleImg?.title}</h1>
            </picture>
            <picture>
              <source media="(min-width: 992px)" srcSet={titleImg?.desktop.url} />
              <img className="w-[335px] h-[168px] lg:w-[638px] lg:h-[254px]" src={titleImg?.mobile.url} alt={titleImg?.title} />
              {/* title has been used as an image beacause of the different font styles and sizes that has been used for the title only
              h1 tag has been used to improve accessibility */}
              <h1 className="sr-only">{titleImg?.title}</h1>
            </picture>
            <div className='max-lg:hidden'>
              {cta && (
                <Button variant="default" {...cta}>
                  {cta.children}
                </Button>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-[10px] items-center">
            <VideoCard {...video} classname={{
              videoCardStyle: "w-[308px] h-[383px] lg:w-[460px] lg:h-[572px] lg:min-[2560px]:w-[500px] lg:min-[2560px]:h-[600px]",
            }}/>
            <span className="text-white text-center w-[300px] lg:w-[500px] text-[18px]">{videoTitle}</span>
          </div>
          <div className='lg:hidden'>
            {cta && (
              <Button variant="default" {...cta}>
                {cta.children}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FairplayBanner;
