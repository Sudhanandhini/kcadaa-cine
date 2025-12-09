import Hero from '../components/Hero';
import { useState, useEffect } from 'react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Sample gallery images
  const galleryImages = [
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600',
    'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600',
    'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600',
    'https://images.unsplash.com/photo-1556103255-4443dbae8e5a?w=600',
    'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600',
    'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=600',
    'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600',
    'https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=600',
    'https://images.unsplash.com/photo-1556103255-4443dbae8e5a?w=600',
    'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=600',
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

  // Autoplay functionality
  useEffect(() => {
    const autoplay = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(autoplay);
  }, [currentSlide, isMobile]);

  const nextSlide = () => {
    if (isMobile) {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    } else {
      setCurrentSlide((prev) => {
        const maxSlide = galleryImages.length - 4;
        return prev >= maxSlide ? 0 : prev + 1;
      });
    }
  };

  const prevSlide = () => {
    if (isMobile) {
      setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    } else {
      setCurrentSlide((prev) => {
        const maxSlide = galleryImages.length - 4;
        return prev <= 0 ? maxSlide : prev - 1;
      });
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div>
      <Hero
  title="KARNATAKA CINE ART-DIRECTORS <br/> AND ASSISTANTS ASSOCIATION"
  subtitle="Celebrating Art and Culture Together"
/>


      {/* Gallery Grid */}
      <section className="py-12 md:py-16 bg-[#fbf8f5]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
            GALLERY
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 md:w-12 md:h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slideshow Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-7xl mx-auto">
            <h3 className="text-gray-900 text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 uppercase tracking-wider">
              SLIDE SHOW
            </h3>
            
            {/* Mobile View - Single Image Slider */}
            <div className="md:hidden relative">
              <button 
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-gray-700 hover:text-gray-900 transition-colors bg-white hover:bg-gray-200 rounded-full p-3 shadow-xl"
                aria-label="Previous slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white mx-10">
                <div className="relative h-64">
                  {galleryImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        currentSlide === index ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => setSelectedImage(image)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-gray-700 hover:text-gray-900 transition-colors bg-white hover:bg-gray-200 rounded-full p-3 shadow-xl"
                aria-label="Next slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="flex justify-center gap-2 mt-6">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === index ? 'bg-accent w-8' : 'bg-gray-400 w-2'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <div className="text-center mt-4 text-gray-600 text-sm">
                {currentSlide + 1} / {galleryImages.length}
              </div>
            </div>

            {/* Desktop View - 4 Images Slider */}
            <div className="hidden md:block">
              <div className="relative flex items-center">
                {/* Previous Button */}
                <button 
                  onClick={prevSlide}
                  className="absolute -left-4 lg:-left-8 top-1/2 -translate-y-1/2 z-20 text-gray-700 hover:text-gray-900 transition-colors bg-white hover:bg-gray-200 rounded-full p-3 lg:p-4 shadow-xl"
                  aria-label="Previous slide"
                >
                  <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                {/* Slider Container */}
                <div className="overflow-hidden w-full px-2">
                  <div className="flex gap-4 lg:gap-6">
                    {/* Calculate which 4 images to show */}
                    {galleryImages.slice(currentSlide, currentSlide + 4).map((image, index) => (
                      <div 
                        key={currentSlide + index} 
                        className="w-1/4 flex-shrink-0 cursor-pointer group relative overflow-hidden rounded-xl shadow-lg bg-white"
                        onClick={() => setSelectedImage(image)}
                      >
                        <img
                          src={image}
                          alt={`Slide ${currentSlide + index + 1}`}
                          className="w-full h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Next Button */}
                <button 
                  onClick={nextSlide}
                  className="absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 z-20 text-gray-700 hover:text-gray-900 transition-colors bg-white hover:bg-gray-200 rounded-full p-3 lg:p-4 shadow-xl"
                  aria-label="Next slide"
                >
                  <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Dots for Desktop */}
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: galleryImages.length - 3 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === index ? 'bg-accent w-10' : 'bg-gray-400 w-2 hover:bg-gray-500'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Counter for Desktop */}
              <div className="text-center mt-4 text-gray-600 text-base">
                Showing {currentSlide + 1}-{Math.min(currentSlide + 4, galleryImages.length)} of {galleryImages.length}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-accent transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close modal"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={selectedImage}
            alt="Selected"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;