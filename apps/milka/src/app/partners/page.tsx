'use client';
import { SmallCard, VideoCard } from '@milka/organism';
// import styles from './page.module.scss';

export default function Partners() {

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

  const videoCards = [
    {
      "thumbnailUrl": "https://fcmilka.de/resources/imagesBundesliga/intropage/caroussel/new/image_12.jpg",
      "videoSrc": "https://fcmilka.de/resources/imagesBundesliga/intropage/caroussel/new/20240909_MILKA_Supercup24_v3.mp4",
      "title": "BEHIND THE SCENES",
      "subtitle": "Blicke hinter die Kulissen bei deinen FC Bayern München Fußball-Stars bei dem letzten FC Milka shooting",
    },
    {
      "thumbnailUrl": "https://fcmilka.de/resources/imagesBundesliga/intropage/caroussel/new/image_12.jpg",
      "videoSrc": "https://fcmilka.de/resources/imagesBundesliga/intropage/caroussel/new/20240909_MILKA_Supercup24_v3.mp4",
      "title": "BEHIND THE SCENES",
      "subtitle": `Der BVB steht kurz vor dem Finale der Königsklasse. Wir waren in Dortmund, um mit den Fans "das letzte Stück" zusammen zu gehen!`,
    }
  ]

  return (
    <div className="bg-[var(--milka-light)] space-y-6">
      <div className="flex justify-center">
        <div className="space-y-4 xl:space-y-0 xl:grid grid-cols-2 gap-6">
          {smallCardList.map((card, index) => (
            <SmallCard key={index} {...card} />
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <div className="space-y-4 xl:space-y-0 xl:grid grid-cols-2 gap-6">
          {videoCards.map((card, index) => (
            <VideoCard key={index} {...card}
              classname={{
                videoCardStyle: "w-[335px] h-[478px] md:w-[667px] md:h-[649px]",
                titleStyle: "condensed text-3xl md:text-[44px] md:py-4",
                subtitleStyle: "w-full md:w-[450px] md:h-[100px]"
              }} />
          ))}
        </div>
      </div>

      {/* <VideoCard {...videoCard2} classname={{
        videoCardStyle: "w-[270px] h-[380px] lg:w-[668px] lg:h-[649px]",
        titleStyle: "condensed text-3xl md:text-[44px]",
        subtitleStyle: "w-full md:w-[450px]"
      }} /> */}
    </div>
  );
}
