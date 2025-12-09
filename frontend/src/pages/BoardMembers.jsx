// import Hero from '../components/Hero';

// const BoardMembers = () => {
//   const boardMembers = [
//     { name: 'Sashidhara Adapa B', role: 'Honorable President', id: '06' },
//     { name: 'Ravi S A', role: 'President', id: '23' },
//     { name: 'Mallikarjun', role: 'General Secretary', id: '' },
//     { name: 'Vishwas C S', role: 'Treasurer', id: '' },
//   ];

//   const committeeMembers = [
//     { name: 'Suresh M. Baganavar', role: 'Committee Member', id: '' },
//     { name: 'Vasantarao M Kulkarni', role: 'Committee Member', id: '' },
//     { name: 'Mohan S Pandit', role: 'Committee Member', id: '' },
//     { name: 'A. Sateesh', role: 'Committee Member', id: '' },
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
//        <Hero
//   title="KARNATAKA CINE ART-DIRECTORS <br/> AND ASSISTANTS ASSOCIATION"
//   subtitle="Celebrating Art and Culture Together"
// />

//       {/* Board Members Section */}
//       <section className="py-16 bg-white">
//         <div className="container-custom">
//           <p className="text-center text-gray-600 mb-2">our board of</p>
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">MEMBERS</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             {boardMembers.map((member, index) => (
//               <MemberCard key={index} member={member} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Committee Members Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="container-custom">
//           <p className="text-center text-gray-600 mb-2">our committee of</p>
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">MEMBERS</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             {committeeMembers.map((member, index) => (
//               <MemberCard key={index} member={member} />
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default BoardMembers;

import Hero from '../components/Hero';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { membersAPI } from '../services/api';

const BoardMembers = () => {
  const [boardMembers, setBoardMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await membersAPI.getAll('board');
      setBoardMembers(response.data);
    } catch (error) {
      console.error('Error fetching board members:', error);
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

      {/* Board Members Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <p className="text-center text-gray-600 mb-2">our board of</p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">MEMBERS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {boardMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BoardMembers;