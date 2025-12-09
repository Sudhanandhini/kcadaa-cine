import { useState } from 'react';
import Hero from '../components/Hero';
import banner from "../assets/images/banner.jpg"

const About = () => {
  const [activeYear, setActiveYear] = useState(0);
  const [mobileSlide, setMobileSlide] = useState(0);

  const timeline = [
    { 
      year: '2015', 
      description: 'After years of dedicated research and with hopeful aspirations of launching an enterprise, we founded our Agri-input business, with our headquarters inaugurated in Bengaluru, Karnataka.' 
    },
    { 
      year: '2017', 
      description: 'Expanded our operations and established new partnerships to strengthen our presence in the Karnataka film industry.' 
    },
    { 
      year: '2020', 
      description: 'Successfully navigated through challenging times while continuing to support our members and their creative endeavors.' 
    },
    { 
      year: '2021', 
      description: 'Launched new initiatives to promote artistic excellence and provide better opportunities for art directors and assistants.' 
    },
    { 
      year: '2022', 
      description: 'Strengthened our community bonds and introduced welfare programs for the benefit of all association members.' 
    },
    { 
      year: '2023', 
      description: 'Celebrated significant achievements and milestones while setting new standards for art direction in Kannada cinema.' 
    },
  ];

  const nextYear = () => {
    setActiveYear((prev) => (prev + 1) % timeline.length);
  };

  const prevYear = () => {
    setActiveYear((prev) => (prev - 1 + timeline.length) % timeline.length);
  };

  const nextMobileSlide = () => {
    if (mobileSlide < timeline.length - 3) {
      setMobileSlide((prev) => prev + 1);
    }
  };

  const prevMobileSlide = () => {
    if (mobileSlide > 0) {
      setMobileSlide((prev) => prev - 1);
    }
  };

  return (
    <div>
        <Hero
  title="KARNATAKA CINE ART-DIRECTORS <br/> AND ASSISTANTS ASSOCIATION"
  subtitle="Celebrating Art and Culture Together"
/>


      {/* About KCADAA Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="bg-accent inline-block px-4 sm:px-6 py-2 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">About KCADAA</h2>
          </div>
          <div className="max-w-6xl">
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
              From the beginning of Indian Film History Art direction has its major role in film
              making, for taking a complete movie, casting is apart, In Pre-production the
              Direction, cinematography and art direction plays main role. Art director creates the
              Property as per the scripts requirement, art direction gives life to the visual of the
              film and it bring the life to the story of the film, without art direction the film
              will lack the nativity to bring the nativity and originality of the period art
              direction roles the major part.
            </p>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              We are association of cine and Television Art Directors of Southern India. Basically
              our association history starts from 1972, our association here to support the member
              ACTADSI's well ness and Protect them legally to solve if any problem happens.
            </p>
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="bg-accent inline-block px-4 sm:px-6 py-2 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Our Mission and Vision</h2>
          </div>

          <div className="grid md:grid-cols-1 gap-8 max-w-6xl">
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-4">Mission</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                The mission of the Karnataka Cine Art-Directors and Assistants Association is to
                protect the rights and welfare of its members, promote skill development, uphold
                ethical standards, and encourage artistic excellence. It strives to create
                opportunities, foster collaboration, and ensure recognition for art directors and
                assistants within the Kannada film industry.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-4">Vision</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                The Karnataka Cine Art-Directors and Assistants Association envisions a vibrant,
                inclusive platform that empowers art directors and assistants to thrive creatively
                and professionally. It aims to elevate the standards of art direction in Kannada
                cinema while preserving cultural heritage and fostering innovation, unity, and
                recognition within the film industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="pt-16 md:pt-20 bg-[#1a5a8e] text-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-8">
            Our Journey's Timeline
          </h2>
          
          <div className="relative max-w-7xl mx-auto px-4 md:px-16">
            {/* Desktop Navigation Arrows */}
            <button
              onClick={prevYear}
              className="hidden md:block absolute left-0 top-6 z-20 text-white hover:text-accent transition-colors duration-300"
              aria-label="Previous year"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <button
              onClick={nextYear}
              className="hidden md:block absolute right-0 top-6 z-20 text-white hover:text-accent transition-colors duration-300"
              aria-label="Next year"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            {/* Mobile Navigation Arrows */}
            <button
              onClick={prevMobileSlide}
              disabled={mobileSlide === 0}
              className={`md:hidden absolute left-0 top-8 z-20 transition-colors duration-300 ${
                mobileSlide === 0 ? 'text-gray-500 cursor-not-allowed' : 'text-white hover:text-accent'
              }`}
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <button
              onClick={nextMobileSlide}
              disabled={mobileSlide >= timeline.length - 3}
              className={`md:hidden absolute right-0 top-8 z-20 transition-colors duration-300 ${
                mobileSlide >= timeline.length - 3 ? 'text-gray-500 cursor-not-allowed' : 'text-white hover:text-accent'
              }`}
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            {/* Timeline Line and Points */}
            <div className="relative px-8 md:px-12 py-4 md:py-8">
              {/* Desktop Timeline - Single Row */}
              <div className="hidden md:block">
                {/* Timeline Line */}
                <div className="absolute top-1/2 left-12 right-12 h-0.5 bg-white transform -translate-y-1/2 "></div>
                
                {/* Timeline Items */}
                <div className="grid grid-cols-6 gap-4 relative">
                  {timeline.map((item, index) => (
                    <div key={index} className="relative">
                      <button
                        onClick={() => setActiveYear(index)}
                        className="flex flex-col items-center w-full group"
                      >
                        {/* Point */}
                        <div
                          className={`w-4 h-4 rounded-full z-10 transition-all duration-300 mt-12 ${
                            activeYear === index
                              ? 'bg-accent scale-125'
                              : 'bg-white group-hover:bg-accent group-hover:scale-110'
                          }`}
                        ></div>
                        
                        {/* Year */}
                        <p
                          className={`text-xl font-bold mt-4 transition-colors duration-300 ${
                            activeYear === index ? 'text-accent' : 'text-white group-hover:text-accent'
                          }`}
                        >
                          {item.year}
                        </p>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Timeline - Sliding 3 at a time */}
              <div className="md:hidden overflow-hidden">
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute top-[6px] left-0 right-0 h-0.5 bg-white"></div>
                  
                  {/* Sliding Container */}
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${mobileSlide * 33.333}%)` }}
                  >
                    {timeline.map((item, index) => (
                      <div key={index} className="w-1/3 flex-shrink-0 px-2">
                        <button
                          onClick={() => setActiveYear(index)}
                          className="flex flex-col items-center w-full group"
                        >
                          {/* Point */}
                          <div
                            className={`w-3 h-3 rounded-full z-10 transition-all duration-300 ${
                              activeYear === index
                                ? 'bg-accent scale-125'
                                : 'bg-white group-hover:bg-accent group-hover:scale-110'
                            }`}
                          ></div>
                          
                          {/* Year */}
                          <p
                            className={`text-sm font-bold mt-2 transition-colors duration-300 ${
                              activeYear === index ? 'text-accent' : 'text-white group-hover:text-accent'
                            }`}
                          >
                            {item.year}
                          </p>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Description Box with Arrow */}
            {/* <div className="mt-8 md:mt-12 relative">
               Arrow pointer - Desktop 
               <div 
                className="hidden md:block absolute -top-6 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[20px] border-b-white transition-all duration-500"
                style={{
                  left: `calc(${(activeYear / (timeline.length - 1)) * 100}%)`,
                  transform: 'translateX(-50%)'
                }}
              ></div> 

               Arrow pointer - Mobile 
               <div 
                className="md:hidden absolute -top-6 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[15px] border-b-white transition-all duration-500"
                style={{
                  left: '50%',
                  transform: 'translateX(-50%)'
                }}
              ></div> 
              
               Description Box 
              <div className="bg-white text-gray-900 p-6 md:p-8 rounded-lg shadow-lg transition-all duration-500 max-w-3xl mx-auto">
                <p className="text-sm md:text-base leading-relaxed">
                  "{timeline[activeYear].description}"
                </p>
              </div>
            </div> */}
          </div>
        </div>

         <div className="bg-white text-gray-900 p-6 md:p-8 rounded-lg shadow-lg transition-all duration-500 max-w-xl mx-auto absolute"
         style={{zIndex:'100', left:'35%'}}>
                <p className="text-sm md:text-base leading-relaxed">
                  "{timeline[activeYear].description}"
                </p>
              </div>

        {/* Background Image Section */}
        <div className='w-full h-[300px] md:h-[400px] lg:h-[500px] mt-12 md:mt-16 relative '>
          <img 
            src={banner} 
            alt="Background banner" 
            className='w-full h-full object-cover'
          />
        </div>
      </section>
 <div className='w-full h-[100px] md:h-[100px] lg:h-[100px] relative '>
        
        </div>
      
    </div>
  );
};

export default About;