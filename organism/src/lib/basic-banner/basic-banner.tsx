import styles from './basic-banner.module.scss';
import { Button, ButtonProps } from "@milka/shared-ui";

export interface ImageProps {
  title?: string;
  url: string;
}
export interface BasicBannerProps {
  backgroundImg?: ImageProps;
  backgroundImgMobile?: ImageProps;
  titleImg?: ImageProps;
  titleImgMobile?: ImageProps;
  subtitle?: string;
  cta?: ButtonProps;
  className?: {
    titleImg?: string;
  };
}

export function BasicBanner({
  backgroundImg,
  backgroundImgMobile,
  titleImg,
  titleImgMobile,
  subtitle,
  cta,
  className
}: BasicBannerProps) {


  return (
    <div className="relative overflow-hidden h-auto">
      <picture>
        <source media="(min-width: 992px) or (orientation: landscape)" srcSet={backgroundImg?.url} />
        <img
         className="w-full min-h-[820px] object-cover object-center"
         src={backgroundImgMobile?.url}
          alt={backgroundImg?.title || backgroundImgMobile?.title}
          aria-hidden={true}
        />
      </picture>

      <div className={`${styles['content']} absolute inset-0 flex flex-col items-start justify-start pt-12 px-6 xl:p-32 min-[2560px]:p-80`}>
        <div className={`${className?.titleImg || ''} mb-10`}>
          <picture>
            <source media="(min-width: 992px)" srcSet={titleImg?.url} />
            <img src={titleImgMobile?.url} alt={titleImg?.title || titleImgMobile?.title} />
            {/* title has been used as an image beacause of the different font styles and sizes that has been used for the title only
            h1 tag has been used to improve accessibility */}
            <h1 className="sr-only">{titleImg?.title || titleImgMobile?.title}</h1>
          </picture>
        </div>

        <div className="lg:pl-16">
          {subtitle && (
            <h2 className="text-lg text-[var(--milka-white)] lg:w-[520px] mb-4">
              {subtitle}
            </h2>
          )}
          <div>
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


};

export default BasicBanner;
