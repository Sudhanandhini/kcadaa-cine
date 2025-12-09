import Hero from '../components/Hero';
import { useState } from 'react';

const Members = () => {
  const [activeTab, setActiveTab] = useState('board');

  const boardMembers = [
    { name: 'Sashidhara Adapa B', role: 'Honorable President', id: '06' },
    { name: 'Ravi S A', role: 'President', id: '23' },
    { name: 'Mallikarjun', role: 'General Secretary', id: '' },
    { name: 'Vishwas C S', role: 'Treasurer', id: '' },
  ];

  const committeeMembers = [
    { name: 'Suresh M. Baganavar', role: 'Committee Member', id: '' },
    { name: 'Vasantarao M Kulkarni', role: 'Committee Member', id: '' },
    { name: 'Mohan S Pandit', role: 'Committee Member', id: '' },
    { name: 'A. Sateesh', role: 'Committee Member', id: '' },
  ];

  const artDirectors = [
    { name: 'BABU KHAN', role: 'Art Director', id: '04' },
    { name: 'SASHIDHARA ADAPA B', role: 'Art Director', id: '06' },
    { name: 'HOSMANE MURTHY', role: 'Art Director', id: '13' },
    { name: 'ARUN KUMAR', role: 'Art Director', id: '14' },
    { name: 'RAMESH DESAI', role: 'Art Director', id: '015' },
    { name: 'RAGHAVENDRA P', role: 'Art Director', id: '16' },
  ];

  const assistantArtDirectors = [
    { name: 'SUNDARMURTHY V', role: 'Asst. Art Director', id: '05' },
    { name: 'NARAYANA SWAMY', role: 'Asst. Art Director', id: '10' },
    { name: 'NARENDRA KUMAR K', role: 'Asst. Art Director', id: '19' },
    { name: 'RAGHAVENDRA RAO', role: 'Asst. Art Director', id: '20' },
    { name: 'PRAKASH B', role: 'Asst. Art Director', id: '22' },
    { name: 'SHAJI JOHNSON', role: 'Asst. Art Director', id: '24' },
  ];

  const MemberCard = ({ member }) => (
    <div className="text-center">
      <div className="w-48 h-48 mx-auto mb-4 bg-gray-200 rounded-lg overflow-hidden shadow-md">
        <div className="w-full h-full flex items-center justify-center bg-gray-300">
          <svg className="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
      </div>
      <h3 className="font-bold text-lg">{member.name}</h3>
      <p className="text-gray-600">{member.role}</p>
      {member.id && <p className="text-sm text-gray-500">ID: {member.id}</p>}
    </div>
  );

  return (
    <div>
       <Hero
  title="KARNATAKA CINE ART-DIRECTORS <br/> AND ASSISTANTS ASSOCIATION"
  subtitle="Celebrating Art and Culture Together"
/>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Our Members</h2>
          <p className="text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
            The desire and Creativity of our members make us who we are – a vibrant and artistic
            community. And it is through our members we advance quality, backing novelty and shape
            the future of the Cine Industry and art industry where art Requires.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('board')}
              className={`px-6 py-2 rounded font-semibold transition-colors ${
                activeTab === 'board'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              Board Members
            </button>
            <button
              onClick={() => setActiveTab('artDirectors')}
              className={`px-6 py-2 rounded font-semibold transition-colors ${
                activeTab === 'artDirectors'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              Art Director
            </button>
            <button
              onClick={() => setActiveTab('assistants')}
              className={`px-6 py-2 rounded font-semibold transition-colors ${
                activeTab === 'assistants'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              Asst. Art Director
            </button>
          </div>

          {/* Board Members */}
          {activeTab === 'board' && (
            <div>
              <p className="text-center text-gray-600 mb-2">our board of</p>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">MEMBERS</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {boardMembers.map((member, index) => (
                  <MemberCard key={index} member={member} />
                ))}
              </div>

              <p className="text-center text-gray-600 mb-2">our committee of</p>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">MEMBERS</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {committeeMembers.map((member, index) => (
                  <MemberCard key={index} member={member} />
                ))}
              </div>
            </div>
          )}

          {/* Art Directors */}
          {activeTab === 'artDirectors' && (
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">ART DIRECTORS</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-8">
                {artDirectors.map((member, index) => (
                  <MemberCard key={index} member={member} />
                ))}
                {/* Placeholder cards */}
                {[...Array(18)].map((_, index) => (
                  <MemberCard
                    key={`placeholder-${index}`}
                    member={{ name: 'Name', role: 'Designation', id: '' }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Assistant Art Directors */}
          {activeTab === 'assistants' && (
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                ASSISTANT ART DIRECTORS
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-8">
                {assistantArtDirectors.map((member, index) => (
                  <MemberCard key={index} member={member} />
                ))}
                {/* Placeholder cards */}
                {[...Array(18)].map((_, index) => (
                  <MemberCard
                    key={`placeholder-${index}`}
                    member={{ name: 'Name', role: 'Designation', id: '' }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Members;
