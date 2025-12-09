import { useLocation } from 'react-router-dom';
import Header from './Header-SubPages';
import banner from '../assets/images/banner.jpg';

const Hero = ({ title, subtitle }) => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  // 💡 mobile height first, then grow on bigger screens
  const heightClass = isHome
    ? 'h-[500px] sm:h-[700px] md:h-[800px]'   // HOME
    : 'h-[550px] sm:h-[550px] md:h-[550px]'; // OTHER PAGES

  return (
    <div className={`relative ${heightClass} text-white`}>
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90"
        style={{ backgroundImage: `url(${banner})` }}
      />

      {/* Header on top of image */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex justify-center w-full">
        <Header />
      </div>

      {/* Centered text */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1
          className="text-3xl md:text-5xl font-bold mb-4"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {subtitle && <p className="text-xl text-accent">{subtitle}</p>}
      </div>
    </div>
  );
};

export default Hero;
