// import Hero from '../components/Hero';

// const ArtDirectors = () => {
//   const artDirectors = [
//     { name: 'BABU KHAN', role: 'Art Director', id: '04' },
//     { name: 'SASHIDHARA ADAPA B', role: 'Art Director', id: '06' },
//     { name: 'HOSMANE MURTHY', role: 'Art Director', id: '13' },
//     { name: 'ARUN KUMAR', role: 'Art Director', id: '14' },
//     { name: 'RAMESH DESAI', role: 'Art Director', id: '015' },
//     { name: 'RAGHAVENDRA P', role: 'Art Director', id: '16' },
//     // Add more art directors or placeholder cards
//     ...Array(18).fill(null).map((_, i) => ({
//       name: 'Name',
//       role: 'Art Director',
//       id: ''
//     }))
//   ];

//   const MemberCard = ({ member }) => (
//     <div className="text-center">
//       <div className="w-48 h-48 mx-auto mb-4 bg-gray-200 rounded-lg overflow-hidden shadow-md">
//         <div className="w-full h-full flex items-center justify-center bg-gray-300">
//           <svg className="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
//           </svg>
//         </div>
//       </div>
//       <h3 className="font-bold text-lg">{member.name}</h3>
//       <p className="text-gray-600">{member.role}</p>
//       {member.id && <p className="text-sm text-gray-500">ID: {member.id}</p>}
//     </div>
//   );

//   return (
//     <div>
//       <Hero
//   title="KARNATAKA CINE ART-DIRECTORS <br/> AND ASSISTANTS ASSOCIATION"
//   subtitle="Celebrating Art and Culture Together"
// />


//       {/* Art Directors Section */}
//       <section className="py-16 bg-white">
//         <div className="container-custom">
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">ART DIRECTORS</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-8">
//             {artDirectors.map((member, index) => (
//               <MemberCard key={index} member={member} />
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ArtDirectors;


import Hero from '../components/Hero';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { membersAPI } from '../services/api';

const ArtDirectors = () => {
  const [artDirectors, setArtDirectors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await membersAPI.getAll('art-director');
      setArtDirectors(response.data);
    } catch (error) {
      console.error('Error fetching art directors:', error);
    }
  };

  const MemberCard = ({ member }) => (
    <div 
      className="text-center cursor-pointer transform transition-transform hover:scale-105"
      onClick={() => navigate(`/member/${member.id}`)}
    >
      <div className="w-48 h-48 mx-auto mb-4 bg-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
        {member.image ? (
          <img
            src={`http://localhost:5000${member.image}`}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            <svg className="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}
      </div>
      <h3 className="font-bold text-lg">{member.name}</h3>
      <p className="text-gray-600">{member.role}</p>
      {member.member_id && <p className="text-sm text-gray-500">ID: {member.member_id}</p>}
    </div>
  );

  return (
    <div>
     <Hero
  title="KARNATAKA CINE ART-DIRECTORS <br/> AND ASSISTANTS ASSOCIATION"
  subtitle="Celebrating Art and Culture Together"
/>

      {/* Art Directors Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">ART DIRECTORS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-8">
            {artDirectors.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>

          {artDirectors.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No art directors found
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ArtDirectors;