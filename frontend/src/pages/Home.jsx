import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';

import img1 from "../assets/images/4.jpg";
import img2 from "../assets/images/1.jpg";
import img3 from "../assets/images/2.jpg";
import img4 from "../assets/images/3.jpg";

import img5 from "../assets/images/5.jpg";
import img6 from "../assets/images/6.jpg";
import img7 from "../assets/images/7.jpg";
import img8 from "../assets/images/8.jpg";
import img9 from "../assets/images/9.jpg";
import img10 from "../assets/images/10.jpg";
import img11 from "../assets/images/11.jpg";
import img12 from "../assets/images/12.jpg";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const services = [
    { title: 'FILM SETWORK', image: img1 },
    { title: 'TV SETWORK', image: img3 },
    { title: 'STAGE & EVENT SETWORK', image: img2 },
    { title: 'MINIATURE/PROP WORK', image: img4 },
  ];

  const boardMembers = [
    {
      name: 'Sashidhara Adapa B',
      role: 'Honorable President',
      image: img5,
      bgColor: '#b47b2a',
    },
    {
      name: 'Ravi S A',
      role: 'President',
      image: img6,
      bgColor: '#ffffff',
    },
    {
      name: 'Mallikarjun',
      role: 'General Secretary',
      image: img7,
      bgColor: '#6ec0dd',
    },
    {
      name: 'Vishwas C S',
      role: 'Treasurer',
      image: img8,
      bgColor: '#e5e7eb',
    },
  ];

  const committeeMembers = [
    {
      name: 'Suresh M. Baganavar',
      role: 'Committee Member',
      image: img9,
      bgColor: '#f3e8ff',
    },
    {
      name: 'Vasantarao M Kulkarni',
      role: 'Committee Member',
      image: img10,
      bgColor: '#fee2e2',
    },
    {
      name: 'Mohan S Pandit',
      role: 'Committee Member',
      image: img11,
      bgColor: '#e0f2fe',
    },
    {
      name: 'A. Sateesh',
      role: 'Committee Member',
      image: img12,
      bgColor: '#fef9c3',
    },
     {
      name: 'Sashidhara Adapa B',
      role: 'Honorable President',
      image: img5,
      bgColor: '#b47b2a',
    },
    {
      name: 'Ravi S A',
      role: 'President',
      image: img6,
      bgColor: '#ffffff',
    },
    {
      name: 'Mallikarjun',
      role: 'General Secretary',
      image: img7,
      bgColor: '#6ec0dd',
    },
    {
      name: 'Vishwas C S',
      role: 'Treasurer',
      image: img8,
      bgColor: '#e5e7eb',
    },
  ];

  // Autoplay functionality
  useEffect(() => {
    const autoplay = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % committeeMembers.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(autoplay);
  }, [committeeMembers.length]);

  // Slider controls
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % committeeMembers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + committeeMembers.length) % committeeMembers.length);
  };

  return (
    <div>
   <Hero
  title="KARNATAKA CINE ART-DIRECTORS <br/> AND ASSISTANTS ASSOCIATION"
  subtitle="Celebrating Art and Culture Together"
/>



      {/* Welcome Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-left mb-6 md:mb-8">
            Welcome to KCADAA
          </h2>
          <p className="text-gray-700 text-left text-sm sm:text-base leading-relaxed">
            A Pillar of Visual Story telling From the very beginning of Indian film history, art
            direction has played a vital role in the filmmaking process. Beyond casting, during the
            pre-production stage, direction, cinematography, and art direction form the foundational
            pillars that shape a film&apos;s visual narrative.
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
            WHAT WE DO
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className="relative w-full overflow-hidden rounded-2xl group cursor-pointer shadow-md"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-[250px] sm:h-[280px] md:h-[320px] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/80 py-3 md:py-4 rounded-b-2xl flex justify-center">
                  <h3 className="text-white font-bold text-base md:text-lg tracking-wide uppercase px-4 text-center">
                    {service.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board Members Section */}
      <section className="py-12 md:py-16 bg-[#fbf4ec]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <p className="text-center text-gray-500 mb-2 text-xs sm:text-sm uppercase tracking-wide">
            our board of
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
            MEMBERS
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
            {boardMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col mx-auto w-full max-w-sm"
              >
                <div
                  className="h-64 sm:h-72 md:h-80 flex items-end justify-center w-full"
                  style={{ backgroundColor: member.bgColor }}
                >
                  {member.image && (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-contain object-bottom"
                    />
                  )}
                </div>

                <div className="px-4 sm:px-6 py-4 sm:py-5 text-left bg-white">
                  <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <div className="w-12 sm:w-16 h-[3px] bg-accent mb-2" />
                  <p className="text-gray-600 text-xs sm:text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    
     


            {/* Committee Members Slider Section */}
      <section className="py-12 md:py-16 bg-[#fbf4ec]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <p className="text-center text-gray-500 mb-2 text-xs sm:text-sm uppercase tracking-wide">
            our committee of
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
            MEMBERS
          </h2>

          {/* Slider Container */}
          <div className="relative px-6 md:px-10 lg:px-16">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3
                         rounded-full border border-gray-300 bg-white shadow-sm
                         hover:bg-gray-100 transition"
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-4 h-4 md:w-5 md:h-5 text-gray-700"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3
                         rounded-full border border-gray-300 bg-white shadow-sm
                         hover:bg-gray-100 transition"
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-4 h-4 md:w-5 md:h-5 text-gray-700"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Slider Wrapper */}
            <div className="overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
                {[0, 1, 2, 3].map((offset) => {
                  const index = (currentSlide + offset) % committeeMembers.length;
                  const member = committeeMembers[index];

                  return (
                    <div
                      key={offset}
                      className="bg-white rounded-3xl shadow-[0_10px_30px_rgba(15,23,42,0.06)]
                                 overflow-hidden flex flex-col mx-auto w-full max-w-sm"
                    >
                      {/* Image */}
                      <div className="w-full bg-[#f7f7f7] flex items-center justify-center px-6 pt-8">
                        {member.image && (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full aspect-[3/4] object-cover object-top rounded-2xl"
                          />
                        )}
                      </div>

                      {/* Text */}
                      <div className="px-6 pb-6 pt-5 text-left bg-white">
                        <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-2">
                          {member.name}
                        </h3>
                        <div className="w-16 h-[3px] bg-yellow-400 mb-2" />
                        <p className="text-gray-500 text-xs sm:text-sm">{member.role}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {committeeMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-yellow-400 w-6' : 'bg-gray-300 w-2'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Link
              to="/members"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold
                         px-8 py-3 rounded-lg shadow-md transition"
            >
              View All Members
            </Link>
          </div>
        </div>
      </section>






    </div>
  );
};

export default Home;