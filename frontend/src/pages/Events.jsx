import Hero from '../components/Hero';
import { useState, useEffect } from 'react';

const Events = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [thumbnailSlide, setThumbnailSlide] = useState(0);
  const [slideShowIndex, setSlideShowIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const events = [
    {
      name: 'EVENT NAME',
      place: 'PLACE',
      description:
        'From the beginning of Indian Film History Art direction has its major role in film making, for taking a complete movie, casting is apart, In Pre-production the Direction, cinematography and art direction plays main role. Art director creates the Property as per the scripts requirement, art direction gives life to the visual of the film and it bring the life to the story of the film, without art direction the film will lack the nativity to bring the nativity and originality of the period art direction roles the major part. We are association of cine and Television Art Directors of Southern India, Basically our association history starts from 1972, our association here to support the member ACTADSI well ness and Protect them legally to solve if any problem happens.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    },
    {
      name: 'CULTURAL FESTIVAL',
      place: 'BANGALORE',
      description:
        'From the beginning of Indian Film History Art direction has its major role in film making, for taking a complete movie, casting is apart, In Pre-production the Direction, cinematography and art direction plays main role.',
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800',
    },
    {
      name: 'FILM PREMIERE',
      place: 'MUMBAI',
      description:
        'From the beginning of Indian Film History Art direction has its major role in film making, for taking a complete movie, casting is apart.',
      image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800',
    },
    {
      name: 'AWARDS CEREMONY',
      place: 'CHENNAI',
      description:
        'Celebrating excellence in art direction with awards and recognition for outstanding contributions to the film industry.',
      image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800',
    },
    {
      name: 'WORKSHOP',
      place: 'HYDERABAD',
      description:
        'Professional development workshop for art directors and assistants in the Karnataka film industry.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800',
    },
    {
      name: 'ANNUAL MEET',
      place: 'MYSORE',
      description:
        'Annual general meeting of Karnataka Cine Art-Directors and Assistants Association members.',
      image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600',
    },
    {
      name: 'NETWORKING EVENT',
      place: 'MANGALORE',
      description:
        'Networking event for art directors to connect and collaborate on future projects.',
      image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800',
    },
  ];

  const slideShowImages = [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600',
    'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600',
    'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600',
    'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600',
    'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600',
    'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=600',
  ];

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Autoplay for main event slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEventIndex((prev) => (prev + 1) % events.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [events.length]);

  // Autoplay for thumbnail slider
  useEffect(() => {
    const interval = setInterval(() => {
      if (isMobile) {
        setThumbnailSlide((prev) => (prev + 1) % events.length);
      } else {
        setThumbnailSlide((prev) => {
          const maxSlide = events.length - 5;
          if (maxSlide <= 0) return 0;
          return prev >= maxSlide ? 0 : prev + 1;
        });
      }
    }, 3500);
    return () => clearInterval(interval);
  }, [events.length, isMobile]);

  // Autoplay for slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      if (isMobile) {
        setSlideShowIndex((prev) => (prev + 1) % slideShowImages.length);
      } else {
        setSlideShowIndex((prev) => {
          const maxSlide = slideShowImages.length - 5;
          if (maxSlide <= 0) return 0;
          return prev >= maxSlide ? 0 : prev + 1;
        });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [slideShowImages.length, isMobile]);

  const nextEvent = () => {
    setCurrentEventIndex((prev) => (prev + 1) % events.length);
  };

  const prevEvent = () => {
    setCurrentEventIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const nextThumbnail = () => {
    if (isMobile) {
      setThumbnailSlide((prev) => (prev + 1) % events.length);
    } else {
      setThumbnailSlide((prev) => {
        const maxSlide = events.length - 5;
        if (maxSlide <= 0) return 0;
        return prev >= maxSlide ? 0 : prev + 1;
      });
    }
  };

  const prevThumbnail = () => {
    if (isMobile) {
      setThumbnailSlide((prev) => (prev - 1 + events.length) % events.length);
    } else {
      setThumbnailSlide((prev) => {
        const maxSlide = events.length - 5;
        if (maxSlide <= 0) return 0;
        return prev <= 0 ? maxSlide : prev - 1;
      });
    }
  };

  const nextSlideShow = () => {
    if (isMobile) {
      setSlideShowIndex((prev) => (prev + 1) % slideShowImages.length);
    } else {
      setSlideShowIndex((prev) => {
        const maxSlide = slideShowImages.length - 5;
        if (maxSlide <= 0) return 0;
        return prev >= maxSlide ? 0 : prev + 1;
      });
    }
  };

  const prevSlideShow = () => {
    if (isMobile) {
      setSlideShowIndex((prev) => (prev - 1 + slideShowImages.length) % slideShowImages.length);
    } else {
      setSlideShowIndex((prev) => {
        const maxSlide = slideShowImages.length - 5;
        if (maxSlide <= 0) return 0;
        return prev <= 0 ? maxSlide : prev - 1;
      });
    }
  };

  // Get items to display based on screen size
  const getThumbnailItems = () => {
    if (isMobile) {
      return [events[thumbnailSlide]];
    }
    return events.slice(thumbnailSlide, thumbnailSlide + 5);
  };

  const getSlideShowItems = () => {
    if (isMobile) {
      return [slideShowImages[slideShowIndex]];
    }
    return slideShowImages.slice(slideShowIndex, slideShowIndex + 5);
  };

  return (
    <div>
      <Hero
  title="KARNATAKA CINE ART-DIRECTORS <br/> AND ASSISTANTS ASSOCIATION"
  subtitle="Celebrating Art and Culture Together"
/>


      {/* Section 1: Main Event Section - Left Image Slider, Right Static Content */}
      <section className="py-12 md:py-16 bg-[#fbf8f5]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
            EVENTS
          </h2>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Side: Event Image Slider */}
            <div className="relative">
              <button
                onClick={prevEvent}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full  z-10 transition-colors"
                aria-label="Previous event"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="relative overflow-hidden rounded-xl ">
                {events.map((event, index) => (
                  <div
                    key={index}
                    className={`transition-opacity duration-500 ${
                      currentEventIndex === index ? 'opacity-100' : 'opacity-0 absolute inset-0'
                    }`}
                  >
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-80 md:h-96 lg:h-[500px] object-cover"
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={nextEvent}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg z-10 transition-colors"
                aria-label="Next event"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-4">
                {events.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentEventIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentEventIndex === index ? 'bg-accent w-8' : 'bg-gray-400 w-2'
                    }`}
                    aria-label={`Go to event ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Side: Static Event Details */}
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {events[currentEventIndex].name}
              </h3>
              <p className="text-lg text-gray-600 font-medium">
                {events[currentEventIndex].place}
              </p>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-justify" style={{lineHeight:'2', }}>
                {events[currentEventIndex].description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Event Thumbnails - Single on Mobile, 5 on Desktop */}
      <section className="py-12 md:py-16 bg-[#fbf8f5]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="relative">
            {/* Previous Button */}
            <button
              onClick={prevThumbnail}
              className="absolute left-2 md:left-0 md:-left-6 top-1/2 -translate-y-1/2 z-20 text-gray-700 hover:text-gray-900 transition-colors bg-white rounded-full p-3 shadow-xl"
              aria-label="Previous events"
            >
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Thumbnails Container */}
            <div className="overflow-hidden mx-10 md:mx-12">
              <div className="flex gap-4 md:gap-[4.5rem] justify-center md:justify-start">
                {getThumbnailItems().map((event, index) => (
                  <div 
                    key={isMobile ? thumbnailSlide : thumbnailSlide + index} 
                    className={`${isMobile ? 'w-full max-w-xs' : 'w-1/5'} flex-shrink-0`}
                  >
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                      <div className="relative overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.name}
                          className="w-full h-48 md:h-56 object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
                        />
                      </div>
                      <div className="p-4 md:p-5 text-center bg-white">
                        <h4 className="font-bold text-sm md:text-base text-gray-900 mb-2 uppercase tracking-wide">
                          {event.name}
                        </h4>
                        <div className="w-16 md:w-20 h-[3px] bg-accent mx-auto mb-2"></div>
                        <p className="text-xs sm:text-sm text-gray-600 uppercase tracking-wide">
                          {event.place}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={nextThumbnail}
              className="absolute right-2 md:right-0 md:-right-6 top-1/2 -translate-y-1/2 z-20 text-gray-700 hover:text-gray-900 transition-colors bg-white rounded-full p-3 shadow-xl"
              aria-label="Next events"
            >
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Section 3: Slideshow - Single on Mobile, 5 on Desktop */}
      <section className="py-12 md:py-16 bg-[#fbf8f5]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="relative bg-gray-900 rounded-3xl overflow-hidden shadow-2xl">
            {/* Previous Button */}
            <button
              onClick={prevSlideShow}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 text-white hover:text-accent transition-colors bg-white/10 hover:bg-white/20 rounded-full p-3 shadow-xl"
              aria-label="Previous slides"
            >
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Slideshow Images Container */}
            <div className="relative">
              <div className="flex">
                {getSlideShowItems().map((image, index) => (
                  <div
                    key={isMobile ? slideShowIndex : slideShowIndex + index}
                    className={`${isMobile ? 'w-full' : 'w-1/5'} flex-shrink-0 relative`}
                  >
                    <img
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                  </div>
                ))}
              </div>

              {/* SLIDE SHOW Text Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h3 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-widest">
                  SLIDE SHOW
                </h3>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlideShow}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 text-white hover:text-accent transition-colors bg-white/10 hover:bg-white/20 rounded-full p-3 shadow-xl"
              aria-label="Next slides"
            >
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;