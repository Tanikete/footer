'use client';
import homeData from '../../data/homepage.json';

//import organism
import { BasicBanner, FairplayBanner, VideosBanner } from "@milka/organism";
export default function Index() {
  /*Note: The corresponding styles are in the ./index.tailwind file.*/
  const teaserBannerProps = {
    backgroundImg: homeData?.teaserBanner?.backgroundImg,
    backgroundImgMobile: homeData?.teaserBanner?.backgroundImgMobile,
    titleImg: homeData?.teaserBanner?.titleImg,
    titleImgMobile: homeData?.teaserBanner?.titleImgMobile,
    subtitle: homeData?.teaserBanner?.subtitle,
    cta: homeData?.teaserBanner?.cta
  }
 
  const partnerBannerProps = {
    backgroundImg: homeData?.partnerBanner?.backgroundImg,
    backgroundImgMobile: homeData?.partnerBanner?.backgroundImgMobile,
    titleImg: homeData?.partnerBanner?.titleImg,
    titleImgMobile: homeData?.partnerBanner?.titleImgMobile,
    subtitle: homeData?.partnerBanner?.subtitle,
    cta: homeData?.partnerBanner?.cta
  }

  const registrationBannerProps = {
    backgroundImg: homeData?.registrationBanner?.backgroundImg,
    backgroundImgMobile: homeData?.registrationBanner?.backgroundImgMobile,
    titleImg: homeData?.registrationBanner?.titleImg,
    titleImgMobile: homeData?.registrationBanner?.titleImgMobile,
    subtitle: homeData?.registrationBanner?.subtitle,
    cta: homeData?.registrationBanner?.cta
  }

  const experiencesBannerProps = {
    backgroundImg: homeData?.experiencesBanner?.backgroundImg,
    backgroundImgMobile: homeData?.experiencesBanner?.backgroundImgMobile,
    titleImg: homeData?.experiencesBanner?.titleImg,
    titleImgMobile: homeData?.experiencesBanner?.titleImgMobile,
    subtitle: homeData?.experiencesBanner?.subtitle,
    videoCards: homeData?.experiencesBanner?.videos,
    cta: homeData?.experiencesBanner?.cta
  }

  const fairplayBannerProps = { 
    backgroundImg: homeData?.fairplayBanner?.backgroundImg,
    partnerLogoImg: homeData?.fairplayBanner?.partnerLogoImg,
    titleImg: homeData?.fairplayBanner?.titleImg,
    video: homeData?.fairplayBanner?.video,
    videoTitle: homeData?.fairplayBanner?.videoTitle,
    cta: homeData?.fairplayBanner?.cta
  }


  return (
    <div>
      <BasicBanner {...teaserBannerProps} />

      <BasicBanner {...partnerBannerProps} />

      <BasicBanner {...registrationBannerProps} className={{ titleImg: "mt-12 lg:mt-0 xl:mt-12" }}/>

      <VideosBanner {...experiencesBannerProps} />

      <FairplayBanner {...fairplayBannerProps} />

    </div>
  );
}
