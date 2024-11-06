"use client"
import { useState, useRef, useEffect } from 'react';
import styles from './video-card.module.scss';

export interface VideoCardProps {
  thumbnailUrl: string;
  videoSrc: string;
  title?: string;
  subtitle?: string;
  classname?: {
    videoCardStyle?: string;
    titleStyle?: string;
    subtitleStyle?: string;
  }
}

export const hexagonSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 70" fill="none" className="absolute h-[70px] w-[70px] lg:h-[83px] lg:w-[86px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 duration-500 ease hover:rotate-[70deg]">
    <path d="M40.7825 0.669849C44.4676 -0.136308 48.3076 1.01879 50.9364 3.72419L68.7242 22.0302C71.4835 24.8699 72.4873 28.9819 71.3467 32.7736L64.4 55.8675C63.2594 59.6592 60.1537 62.535 56.2857 63.3812L31.3506 68.8361C27.6655 69.6422 23.8254 68.4871 21.1966 65.7817L3.40886 47.4757C0.649547 44.636 -0.354219 40.524 0.786333 36.7323L7.73305 13.6384C8.8736 9.84673 11.9793 6.97088 15.8474 6.1247L40.7825 0.669849Z" fill="var(--milka-green)" />
  </svg>
);

export const playSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 37" fill="none" className="h-[37px] w-[37px] lg:h-[44px] lg:w-[44px]">
    <path d="M0.475586 2.83538C0.475586 1.26598 2.12718 0.245232 3.5309 0.947093L35.4038 16.8836C36.9599 17.6616 36.9599 19.8821 35.4038 20.6601L3.53091 36.5966C2.12718 37.2985 0.475586 36.2777 0.475586 34.7083V2.83538Z" fill="var(--milka-white)" />
  </svg>
);

export function VideoCard({
  thumbnailUrl,
  videoSrc,
  title,
  subtitle,
  classname
}: VideoCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFirstOpen, setIsFirstOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(0); // Track current time
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const openVideo = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
    if (currentTime == 0) {
      setIsFirstOpen(false);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const playVideo = () => {
    setIsPlaying(true);
  };

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (overlayRef.current && overlayRef.current === event.target) {
      if (videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
        setIsPlaying(false);
      }
      setIsOpen(false);
      document.body.style.overflow = "auto";
    }
  };

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.currentTime = currentTime;
    }
  }, [isPlaying, currentTime]);

  return (
    <div>
      <div className={`bg-[var(--milka-green)] rounded-lg relative hover:translate-x-2 hover:translate-y-2 transition-transform duration-300 ease-in-out ${classname?.videoCardStyle || ''}`}>
        <div className={`relative w-full h-full hover:-translate-x-4 hover:-translate-y-4 hover:rounded-lg transition-transform duration-300 ease-in-out`}>
          {title && (
            <div className={`absolute bg-[linear-gradient(0deg,_var(--milka-dark)_13.11%,_rgba(59,39,116,0)_79.95%)] w-full h-full rounded-lg`}></div>
          )}
          <img
            src={thumbnailUrl}
            alt="Thumbnail"
            className={`w-full h-full object-cover cursor-pointer rounded-lg`}
            onClick={openVideo}
          />
          <div className="absolute bottom-0">
            {title && (
              <p className={`px-5 my-4 leading-6 text-xl text-[var(--milka-white)] font-GHPBlack ${classname?.titleStyle || ''}`}>
                {title}
              </p>
            )}
            {subtitle && (
              <p className={`px-5 pb-4 leading-5 text-lg text-[var(--milka-white)] ${classname?.subtitleStyle || ''}`}>
                {subtitle}
              </p>
            )}
          </div>

          <div className="absolute top-1/2 left-1/2 transform cursor-pointer" onClick={openVideo}>
            {hexagonSvg}

            <div className="absolute transform -translate-x-3.5 lg:-translate-x-4 -translate-y-1/2 pointer-events-none">
              {playSvg}
            </div>
          </div>
        </div>
      </div>

      {/* Video overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={handleOverlayClick}
          ref={overlayRef}
        >
          <div className="relative">
            {isPlaying ? (
              <video
                autoPlay={currentTime == 0}
                ref={videoRef}
                controls
                onClick={(e) => e.stopPropagation()}
                src={videoSrc}
                className="w-[369px] lg:w-[1040px] h-auto"
              />
            ) : (
              <>
                <img
                  src={thumbnailUrl}
                  alt="video thumbnail"
                  className="w-[369px] lg:w-[1040px]  h-auto object-cover cursor-pointer"
                  onClick={playVideo}
                />
                <div className="absolute top-1/2 left-1/2 transform cursor-pointer" onClick={playVideo}>
                  {hexagonSvg}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-4 -translate-y-1/2 pointer-events-none">
                    {playSvg}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoCard;
