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

  // Parse awards, filmography, and social links
  const awardsList = member.awards ? member.awards.split('\n').filter(a => a.trim()) : [];
  const filmographyList = member.filmography ? member.filmography.split('\n').filter(f => f.trim()) : [];
  const socialLinksList = member.social_links ? member.social_links.split('\n').filter(s => s.trim()).map(s => {
    const parts = s.split('|');
    return {
      platform: parts[0] || '',
      url: parts[1] || ''
    };
  }) : [];

  // Social media icon component
  const SocialIcon = ({ platform, url }) => {
    const getIcon = () => {
      switch (platform.toLowerCase()) {
        case 'facebook':
          return (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          );
        case 'instagram':
          return (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          );
        case 'twitter':
          return (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
          );
        case 'linkedin':
          return (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          );
        case 'youtube':
          return (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          );
        case 'website':
          return (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          );
        default:
          return (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          );
      }
    };

    const getColorClass = () => {
      switch (platform.toLowerCase()) {
        case 'facebook':
          return 'bg-blue-600 hover:bg-blue-700';
        case 'instagram':
          return 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 hover:opacity-90';
        case 'twitter':
          return 'bg-sky-500 hover:bg-sky-600';
        case 'linkedin':
          return 'bg-blue-700 hover:bg-blue-800';
        case 'youtube':
          return 'bg-red-600 hover:bg-red-700';
        case 'website':
          return 'bg-gray-700 hover:bg-gray-800';
        default:
          return 'bg-gray-600 hover:bg-gray-700';
      }
    };

    return (
      
      <a  href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${getColorClass()} text-white p-3 rounded-full transition-all transform hover:scale-110`}
        title={platform}
      >
        {getIcon()}
      </a>
    );
  };

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
                  <p className="text-center text-gray-500 font-medium mb-4">ID: {member.member_id}</p>
                )}

                {/* Social Media Links */}
                {socialLinksList.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-700 text-center mb-4">CONNECT WITH ME</h4>
                    <div className="flex justify-center gap-3 flex-wrap">
                      {socialLinksList.map((link, index) => (
                        <SocialIcon key={index} platform={link.platform} url={link.url} />
                      ))}
                    </div>
                  </div>
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
                        • {award}
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

      <Footer />
    </div>
  );
};

export default MemberProfile;