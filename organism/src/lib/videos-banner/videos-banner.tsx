// import styles from './videos-banner.module.scss';
import { Button, ButtonProps } from "@milka/shared-ui";
import { VideoCard, VideoCardProps } from '@milka/organism';

interface Image {
  url: string;
  title?: string;
}
export interface VideosBannerProps {
  backgroundImg?: Image;
  backgroundImgMobile?: Image;
  titleImg: Image;
  titleImgMobile: Image;
  subtitle?: string;
  videoCards: VideoCardProps[];
  cta?: ButtonProps;
}

export function VideosBanner({
  backgroundImg,
  backgroundImgMobile,
  titleImg,
  titleImgMobile,
  subtitle,
  videoCards,
  cta
}: VideosBannerProps) {
  return (
    <div className="relative overflow-hidden h-auto">
      <picture>
        <source media="(min-width: 992px) or (orientation: landscape)" srcSet={backgroundImg?.url} />
        <img
          className="w-full md:min-h-[920px] object-cover object-center"
          src={backgroundImgMobile?.url}
          alt={backgroundImg?.title || backgroundImgMobile?.title}
          aria-hidden={true}
        />
      </picture>


      <div className="absolute inset-0 my-2 gap-[5px] flex flex-col justify-center">
        <div className="grid md:grid-cols-2 mt-2">
          <div className="flex flex-col max-md:pl-[20px] justify-center md:items-center lg:flex-row lg:justify-end">
            <picture>
              <source media="(min-width: 992px) or (orientation: landscape)" srcSet={titleImg?.url} />
              <img
                src={titleImgMobile?.url}
                alt={titleImg?.title || titleImgMobile?.title}
                aria-hidden={true}
              />
              {/* title has been used as an image beacause of the different font styles and sizes that has been used for the title only
            h1 tag has been used to improve accessibility */}
              <h1 className="sr-only">{titleImg?.title || titleImgMobile?.title}</h1>
            </picture>
          </div>
          <div className="min-w-[300px] lg:w-[375px] my-auto mx-auto">
            <p className="text-lg text-[var(--milka-white)] leading-5 px-6 pt-6 pb-8 md:p-0">{subtitle}</p>
          </div>
        </div>

        <div className="flex px-5 lg:justify-center gap-5 xl:gap-20 overflow-x-scroll lg:overflow-x-hidden overflow-y-hidden p-10">
          {videoCards?.map((video, index) => (
            <VideoCard key={index} {...video} classname={{
              videoCardStyle: "w-[271px] h-[369px] md:w-[322px] md:h-[439px] min-[2560px]:w-[500px] min-[2560px]:h-[600px]",
              titleStyle: "my-10 md:my-6"
            }} />
          ))}
        </div>

        <div className="mx-auto lg:mb-8">
          {cta && (
            <Button {...cta}>
              {cta.children}
            </Button>
          )}

        </div>
      </div>
    </div>
  );
}

export default VideosBanner;
