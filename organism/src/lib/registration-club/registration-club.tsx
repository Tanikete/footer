'use client';
import { SetStateAction, useState, useMemo, useRef } from 'react';
import { Button } from '@milka/shared-ui';
import { RegistrationType } from '../../../../organism/src/lib/registration-form/registration-form-schema';

export interface RegisterIcons {
  name: string;
  imageUrl: string;
  alt: string;
}
export interface CheckboxType {
  unCheckImage: string;
  checkImage: string;
  text: string;
  attribute: string;
}

export interface privacyProps {
  text: string;
  url: string;
  warningText: string;
}

interface ImageProps {
  url: string;
  alt: string;
}

interface RegisterType extends RegistrationType{
  newsletter: number;
  team1: string;
}

export interface RegisterClubProps {
  registerClubIconsOne?: RegisterIcons[];
  registerClubIconsTwo?: RegisterIcons[];
  checkBoxContainers?: CheckboxType[];
  termsAndConditions?: privacyProps;
  titleImg?: ImageProps;
  titleImgMobile?: ImageProps;
  subtitle?: string;
  registerFormButtonText: string;
  formSubmit: (registerData: RegisterType)=> void;
}

export function RegistrationClub({
  registerClubIconsOne,
  registerClubIconsTwo,
  checkBoxContainers,
  titleImg,
  titleImgMobile,
  subtitle,
  termsAndConditions,
  registerFormButtonText,
  formSubmit
}: RegisterClubProps) {

  const registrationFormData = {} as RegisterType;
  const [activeTab, setActiveTab] = useState('tab1');
  const [clubSelect, setClubSelect] = useState();
  const [isTermsSelected, setisTermsSelected] = useState(false);
  const [isNewsLetterSelected, setisNewsLetterSelected] = useState(false);
  const [isShowPrivacyWarning, setisShowPrivacyWarning] = useState(false);
  const iconsRef = useRef(null);

  const handleClubSelect = (iconName: SetStateAction<any>) => {
    setClubSelect(iconName);
  };

  const formattedText = useMemo(() => {
    return termsAndConditions?.text
      .replace(/{{BR_LG}}/g, "<span class='lg: hidden'><br/></span>")
      .replace(/{{BR_XS}}/g, "<span class='xs: hidden'><br/></span>")
      .replace(
        /Datenschutzerklärung/,
        `<a href="${termsAndConditions?.url}" target="_blank" rel="noreferrer" class="text-white underline">Datenschutzerklärung</a>`
      );
  }, [termsAndConditions]);

  const renderIconsOne = () =>
    (activeTab === 'tab1' ? registerClubIconsOne : registerClubIconsTwo)?.map(
      (icon, index) => (
        <div
          key={index}
          className={`flex flex-col items-center w-[148px] h-[117px] lg:w-[180px] lg:h-[142px] cursor-pointer hover:bg-[var(--milka-white)] hover:text-[#3B2772] rounded-md transition-all duration-500 ease-in-out ${
            clubSelect === icon.name
              ? 'bg-[var(--milka-white)] rounded-md text-[#3B2772]'
              : 'text-[var(--milka-white)]'
          }`}
        >
          <div onClick={() => handleClubSelect(icon.name)}>
            <img
              className="h-[77.6px] w-[77.6px] lg:w-[94px] lg:h-[94px] mx-auto"
              src={icon.imageUrl}
              alt={icon.alt}
            />
            <p
              className={`text-sm text-center pb-4 font-GHPBlack uppercase mx-auto`}
            >
              {icon.name}
            </p>
          </div>
        </div>
      )
    );

  const handleTabClick = (tab: SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const handleCheckBoxClick = (attribute: string) => {
    if (attribute === 'Termsandconditions') {
      setisTermsSelected(!isTermsSelected);
      !isTermsSelected && setisShowPrivacyWarning(false);
    }
    if (attribute === 'NewsLetter') {
      setisNewsLetterSelected((prev) => {
        const newSelectedState = !prev;
        if (registrationFormData) {
          registrationFormData.newsletter = newSelectedState ? 1 : 0;
        }
        return newSelectedState;
      });
    }
  };

  const handleRegisterFormSubmit = async () => {
    registrationFormData && isNewsLetterSelected
      ? (registrationFormData.newsletter = 1)
      : (registrationFormData.newsletter = 0);
    if (!clubSelect) {
      iconsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      registrationFormData.team1 = clubSelect;
      if (!isTermsSelected) {
        setisShowPrivacyWarning(true);
      } else {
        formSubmit(registrationFormData);
      }
    }
  };

  return (
    <section className="bg-[#7D69AC] py-10 display-flex justify-center align-middle">
      <div className="w-[335px] lg:w-[941px] mx-auto">
        <div className="flex justify-center mb-6">
          <picture>
            <source media="(min-width: 992px)" srcSet={titleImg?.url} />
            <img
              src={titleImgMobile?.url}
              alt={titleImg?.alt || titleImgMobile?.alt}
            />
          </picture>
        </div>
        <div className="flex mb-12 md:justify-center lg:mb-16">
          <p className="text-[var(--milka-white)] text-lg min-w-[335px] lg:w-[605px]">
            {subtitle}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-x-8 text-xl md:text-3xl lg:text-5xl">
        <button
          onClick={() => handleTabClick('tab1')}
          className={`font-GHPBlack ${
            activeTab === 'tab1' ? 'underline text-white' : 'text-[#3B2774]'
          }`}
        >
          BUNDESLIGA
        </button>
        <button
          onClick={() => handleTabClick('tab2')}
          className={`font-GHPBlack ${
            activeTab === 'tab2' ? 'underline text-white' : 'text-[#3B2774]'
          }`}
        >
          2.BUNDESLIGA
        </button>
      </div>
      <div className="pb-16" ref={iconsRef}>
        {activeTab === 'tab1' && (
          <div className="flex justify-center lg:mt-10 pt-6 lg:pt-5 mb-8">
            <div className="w-[375px] lg:w-[1100px] gap-1 justify-center flex flex-row flex-wrap">
              {renderIconsOne()}
            </div>
          </div>
        )}
        {activeTab === 'tab2' && (
          <div className="flex justify-center lg:mt-10 pt-6 lg:pt-5 mb-8">
            <div className="w-[375px] lg:w-[1100px] gap-1 justify-center flex flex-row flex-wrap">
              {renderIconsOne()}
            </div>
          </div>
        )}
      </div>
      <div className="flex-col items-center justify-center w-full">
        {checkBoxContainers?.map((item: any, index) => {
          const isSelected =
            (item.attribute === 'Termsandconditions' && isTermsSelected) ||
            (item.attribute === 'NewsLetter' && isNewsLetterSelected);
          return (
            <div
              className={`flex w-[335px] lg:w-[672px] ${
                index === 1 ? 'pb-10' : 'pb-8'
              } justify-between mx-auto`}
              key={index}
            >
              <div
                className="cursor-pointer"
                onClick={() => handleCheckBoxClick(item.attribute)}
              >
                <div
                  className={`rounded ${
                    isSelected ? 'bg-white' : ''
                  } w-[24px] h-[24px] flex items-center justify-center`}
                >
                  <img
                    src={isSelected ? item.checkImage : item.unCheckImage}
                    className="w-[24px] h-[24px]"
                    alt="checkbox"
                  />
                </div>
              </div>
              <div>
                <p
                  className="whitespace-pre-line text-white text-sm w-[295px] lg:w-[632px]"
                  dangerouslySetInnerHTML={{
                    __html: item?.text?.replaceAll('\n', '<br/>'),
                  }}
                ></p>
                {isShowPrivacyWarning &&
                  item.attribute === 'Termsandconditions' && (
                    <p className="text-[#d93333]">
                      {termsAndConditions?.warningText}
                    </p>
                  )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="pb-16">
        <Button
          variant="default"
          className="flex mx-auto"
          isAnimated
          onClick={handleRegisterFormSubmit}
        >
          {registerFormButtonText}
        </Button>
      </div>
      <div>
        <p
          className="mx-auto whitespace-pre-line text-white text-sm w-[335px] lg:w-[672px]"
          dangerouslySetInnerHTML={{
            __html: formattedText,
          }}
        ></p>
      </div>
    </section>
  );
}

export default RegistrationClub;
