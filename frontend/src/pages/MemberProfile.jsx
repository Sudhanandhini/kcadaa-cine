import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { membersAPI } from '../services/api';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

const MemberProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMember();
  }, [id]);

  const fetchMember = async () => {
    try {
      const response = await membersAPI.getById(id);
      setMember(response.data);
    } catch (error) {
      console.error('Error fetching member:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Hero
          title="KARNATAKA CINE ART-DIRECTORS AND ASSISTANTS ASSOCIATION"
          subtitle="Celebrating Art and Culture Together"
        />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-xl">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!member) {
    return (
      <div>
        <Hero
          title="KARNATAKA CINE ART-DIRECTORS AND ASSISTANTS ASSOCIATION"
          subtitle="Celebrating Art and Culture Together"
        />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-xl">Member not found</div>
        </div>
        <Footer />
      </div>
    );
  }

  // Parse awards and filmography
  const awardsList = member.awards ? member.awards.split('\n').filter(a => a.trim()) : [];
  const filmographyList = member.filmography ? member.filmography.split('\n').filter(f => f.trim()) : [];

  return (
    <div>
        <Hero
  title="KARNATAKA CINE ART-DIRECTORS <br/> AND ASSISTANTS ASSOCIATION"
  subtitle="Celebrating Art and Culture Together"
/>


      {/* Profile Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {member.category === 'art-director' ? 'ART DIRECTOR' : 
             member.category === 'asst-art-director' ? 'ASSISTANT ART DIRECTOR' : 
             member.role.toUpperCase()} PROFILE
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column - Image and Basic Info */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                <div className="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden mb-6">
                  {member.image ? (
                    <img
                      src={`http://localhost:5000${member.image}`}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-300">
                      <svg className="w-32 h-32 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-center mb-2">{member.name}</h3>
                <p className="text-lg text-gray-600 text-center mb-1">{member.role}</p>
                {member.member_id && (
                  <p className="text-center text-gray-500 font-medium">ID: {member.member_id}</p>
                )}
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="md:col-span-2 space-y-8">
              {/* Biography */}
              {member.biography && (
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">BIOGRAPHY</h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{member.biography}</p>
                </div>
              )}

              {/* Awards */}
              {awardsList.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold mb-4 bg-primary text-white px-4 py-2 rounded">
                    AWARDS
                  </h3>
                  <ul className="space-y-2">
                    {awardsList.map((award, index) => (
                      <li key={index} className="text-gray-700 leading-relaxed">
                        {award}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Filmography */}
              {filmographyList.length > 0 && (
                <div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                      <thead>
                        <tr className="bg-primary text-white">
                          <th className="px-4 py-3 text-left font-bold uppercase">YEAR</th>
                          <th className="px-4 py-3 text-left font-bold uppercase">MOVIE</th>
                          <th className="px-4 py-3 text-left font-bold uppercase">WORKED AS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filmographyList.map((film, index) => {
                          const parts = film.split('|').map(p => p.trim());
                          return (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                              <td className="px-4 py-3 border-t">{parts[0] || '-'}</td>
                              <td className="px-4 py-3 border-t">{parts[1] || '-'}</td>
                              <td className="px-4 py-3 border-t">{parts[2] || '-'}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {!member.biography && awardsList.length === 0 && filmographyList.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No additional information available
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default MemberProfile;