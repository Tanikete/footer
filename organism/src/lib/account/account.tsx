// src/components/MeinKonto/MeinKonto.tsx
import { Button, ButtonProps } from '@milka/shared-ui';

export interface accountProps {
  title?: string;
  subtitle?: string;
  mainkonto?: ButtonProps;
  footer?: string;
  images?: {
    mobile?: string;
    desktop?: string;
  };
  passwordcta: ButtonProps;
}

const mainkonto: ButtonProps = {
  variant: 'default',
  isAnimated: true,
  onClick: () => (window.location.href = 'https://reihe1.fcmilka.de/'),
};

export function MeinKonto({
  title,
  subtitle,
  mainkonto,
  footer,
  images
}: accountProps) {
  return (
    <div className="flex flex-col lg:flex-row rounded-md shadow-lg" id="bwat">
      <div className="w-full lg:w-1/2 relative">
        <div className="lg:hidden relative overflow-hidden">
          <img
            src={images?.mobile}
            alt="Mobile Promotion"
            className="w-full object-cover rounded-md"
          />
          <div className="absolute bottom-0 left-0 w-full bg-purple-400" />
        </div>

        <img
          src={images?.desktop}
          alt="Desktop Promotion"
          className="hidden lg:block w-full h-full object-cover rounded-md "
        />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center text-white p-6 bg-[var(--milka-light)]">
        <h2 className="text-left uppercase font-bold lg:w-[300px] font-headlineBlack text-2xl text-[27px] italic mx-auto">
          {title}
        </h2>
        <p className="text-left mt-2 text-lg lg:w-[300px] mx-auto">
          {subtitle}
        </p>

        {/* <Button className="mt-8 sm:mt-12 lg:mt-16 mx-auto" {...mainkonto}>
          {mainkonto?.children}
        </Button> */}

        <p className="text-center text-sm pt-5 lg:w-[300px] mx-auto">
          {footer}
        </p>
      </div>
    </div>
  );
}

export default MeinKonto;
