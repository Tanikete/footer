import styles from './small-card.module.scss';
 
interface ImageProps {
  url: string,
  alt: string
}
 
export interface smallCardProps {
  backgroundImg?: ImageProps;
  logo?: ImageProps;
  title?: string;
  subtitle?: string;
  classname?: string;
}
 
export function SmallCard({
  backgroundImg,
  logo,
  title,
  subtitle,
  classname = ''
}: smallCardProps) {
  return (
    <div className={`${classname} rounded-lg relative w-[335px] h-[412px] md:m-0 md:w-[668px] md:h-[457px] bg-[var(--milka-dark)] overflow-hidden`}>
      <img src={backgroundImg?.url} alt={backgroundImg?.alt} className="hidden md:block w-full h-full object-cover" />
      <div className="absolute inset-0 flex flex-col py-6 px-4 md:p-10 text-white">
        <img src={logo?.url} alt={logo?.alt} className="w-40 md:w-56 h-auto mb-8 md:mb-12" />
        <div>
          <h1 className="md:text-[44px] text-3xl font-bold mb-2 md:mb-4 condensed">{title}</h1>
          <p className="text-lg md:w-[450px] overflow-hidden">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
 
export default SmallCard;