'use client';
import React from "react";
import styles from './page.module.scss';
import { sendGTMEvent } from '@next/third-parties/google'

//import sharedUi
import { cn } from "@milka/shared-ui";
import { Button } from "@milka/shared-ui";
import { Alert, AlertDescription, AlertTitle } from "@milka/shared-ui";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@milka/shared-ui";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@milka/shared-ui";

//import organism
import { VideoCard, RegistrationForm, BasicBanner, SmallCard } from "@milka/organism";
import { RegistrationType } from "organism/src/lib/registration-form/registration-form-schema";
// import { Profile } from "@milka/organism";

export default function ComponentList() {
  const handleRegisterForm = (values: RegistrationType) => {
    console.log('Form submitted with values:', values);
  }

  const videoCard = {
    "thumbnailUrl": "https://fcmilka.de/resources/imagesBundesliga/intropage/caroussel/new/image_12.jpg",
    "videoSrc": "https://fcmilka.de/resources/imagesBundesliga/intropage/caroussel/new/20240909_MILKA_Supercup24_v3.mp4",
    "title": "Bundesliga Legende Lothar Matthäus als Überraschungs-Gast-Trainer",
  }

  const videoCard2 = {
    "thumbnailUrl": "https://fcmilka.de/resources/imagesBundesliga/intropage/caroussel/new/image_12.jpg",
    "videoSrc": "https://fcmilka.de/resources/imagesBundesliga/intropage/caroussel/new/20240909_MILKA_Supercup24_v3.mp4",
    "title": "BEHIND THE SCENES",
    "subtitle": "Blicke hinter die Kulissen bei deinen FC Bayern München Fußball-Stars bei dem letzten FC Milka shooting,"
  }
  
  const smallCardList = [
    {
      backgroundImg: {
        url: "/images/partner-page/FCB-small-card.png",
        alt: "text"
      },
      logo: {
        url: "/images/partner-page/FCB-logo.png",
        alt: "text"
      },
      title: "FC BAYERN MÜNCHEN",
      subtitle: "Der größte Club Deutschlands, Rekordmeister und Partner des FC Milka! Dank des FC Bayern München erleben wir mit Euch hautnah die Faszination des ganz großen Fußballs, der Weltstars, der historischen Momente auf die wir alle eine ganze Saison hinfiebern."
    },
    {
      backgroundImg: {
        url: "/images/partner-page/BVB-small-card.png",
        alt: "text"
      },
      logo: {
        url: "/images/partner-page/BVB-logo.png",
        alt: "text"
      },
      title: "BORUSSIA DORTMUND",
      subtitle: "Über 80.000 Fans im Stadion, Millionen im ganzen Land – der BVB ist Legende und Powerhouse des Deutschen Fußballs. Der FC Milka bringt dich hautnah heran an die gelbe Wand, die Stars, die unstillbare Begeisterung des Ruhrpotts."
    }
  ]

  return (
    <div className="bg-[var(--milka-light)]">
      {/* Fonts */}
      <div className="text-[var(--milka-white)]">
        <div>This is a regular text mostly used for subtitles.</div>
        <div className="font-GHPBlack text-4xl">REGULAR Bold M - 56</div>
        <div className="condensed text-[80px]">CONDENSED XXL</div>
        <div className="slanted text-[80px]">SLANTED XXL - 180</div>
      </div>

      <div className="flex justify-center py-10">
        <div className="space-y-4 xl:space-y-0 xl:grid grid-cols-2 gap-6">
          {smallCardList.map((card, index) => (
            <SmallCard key={index} {...card} />
          ))}
        </div>
      </div>XXL

      <div className="wrapper">
        <BasicBanner
          backgroundImg={{ url: "/images/homepage/teaser.jpeg" }}
          backgroundImgMobile={{ url: "/images/homepage/teaser-mobile.png" }}
          titleImg={{ url: "/images/homepage/teaser-text.png" }}
          titleImgMobile={{ url: "/images/homepage/teaser-text-mobile.png" }}
          subtitle="Copy Gewinnspiel. Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          cta={{ variant: "default", isAnimated: true, url: "/", children: "JETZT MITMACHEN" }}
        />
      </div>
      <div>
        <Alert variant="destructive">
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components and dependencies to your app using the cli.
          </AlertDescription>
        </Alert>
      </div>


      {/* <Carousel>
        <CarouselContent>
          <CarouselItem>.1.</CarouselItem>
          <CarouselItem>.2.</CarouselItem>
          <CarouselItem>.3.</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel> */}



      <Button variant="default" isAnimated>JETZT MITGLIED WERDEN</Button>

      <Button variant="secondary" isAnimated>ALLE ANSEHEN</Button>

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <VideoCard {...videoCard} />
      
      <VideoCard {...videoCard2} classname={{
        videoCardStyle: "w-[270px] h-[380px] lg:w-[668px] lg:h-[649px]",
        titleStyle: "condensed text-3xl md:text-[44px]",
        subtitleStyle: "w-full md:w-[450px]"
      }} />

      {/* <Button data-event="go_to_fan_center" data-category="Overview Page" data-action="Click on Fan Center" data-label="GAME_OP_PART" variant="default" onClick={() => {
    if (typeof window !== undefined) {
      console.log("Reached")
      // @ts-ignore
      window.dataLayer.push({
        'dataEvent': 'custom_event_click',
        'dataCategory': 'click_action',
        'dataAction': 'to_faq',
        'dataLabel': 'redeem_prize_trikots'
      })
    }
  }
  } isAnimated>JETZT MITGLIED WERDEN</Button> */}
  {/* <Profile /> */}
    </div>
  );
}
