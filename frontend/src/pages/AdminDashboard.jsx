import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { membersAPI } from '../services/api';

const AdminDashboard = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    member_id: '',
    category: 'board',
    biography: '',
    image: null,
  });

  // Dynamic arrays for awards and filmography
  const [awards, setAwards] = useState(['']);
  const [filmography, setFilmography] = useState([{ year: '', movie: '', role: '' }]);

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredMembers(members);
    } else {
      setFilteredMembers(members.filter(m => m.category === filter));
    }
  }, [filter, members]);

  const fetchMembers = async () => {
    try {
      const response = await membersAPI.getAll();
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/admin/login');
  };

  // Awards handlers
  const addAwardField = () => {
    setAwards([...awards, '']);
  };

  const removeAwardField = (index) => {
    const newAwards = awards.filter((_, i) => i !== index);
    setAwards(newAwards);
  };

  const updateAward = (index, value) => {
    const newAwards = [...awards];
    newAwards[index] = value;
    setAwards(newAwards);
  };

  // Filmography handlers
  const addFilmographyField = () => {
    setFilmography([...filmography, { year: '', movie: '', role: '' }]);
  };

  const removeFilmographyField = (index) => {
    const newFilmography = filmography.filter((_, i) => i !== index);
    setFilmography(newFilmography);
  };

  const updateFilmography = (index, field, value) => {
    const newFilmography = [...filmography];
    newFilmography[index][field] = value;
    setFilmography(newFilmography);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Convert awards array to string
    const awardsString = awards.filter(a => a.trim()).join('\n');
    
    // Convert filmography array to string
    const filmographyString = filmography
      .filter(f => f.year || f.movie || f.role)
      .map(f => `${f.year}|${f.movie}|${f.role}`)
      .join('\n');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('role', formData.role);
    data.append('member_id', formData.member_id);
    data.append('category', formData.category);
    data.append('biography', formData.biography);
    data.append('awards', awardsString);
    data.append('filmography', filmographyString);

    if (formData.image) {
      data.append('image', formData.image);
    }

    if (editingMember) {
      data.append('existingImage', editingMember.image || '');
    }

    try {
      if (editingMember) {
        await membersAPI.update(editingMember.id, data);
      } else {
        await membersAPI.create(data);
      }
      fetchMembers();
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error('Error saving member:', error);
      alert('Error saving member');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      member_id: member.member_id || '',
      category: member.category,
      biography: member.biography || '',
      image: null,
    });

    // Parse awards
    if (member.awards) {
      const awardsList = member.awards.split('\n').filter(a => a.trim());
      setAwards(awardsList.length > 0 ? awardsList : ['']);
    } else {
      setAwards(['']);
    }

    // Parse filmography
    if (member.filmography) {
      const filmList = member.filmography.split('\n').filter(f => f.trim()).map(f => {
        const parts = f.split('|');
        return {
          year: parts[0] || '',
          movie: parts[1] || '',
          role: parts[2] || ''
        };
      });
      setFilmography(filmList.length > 0 ? filmList : [{ year: '', movie: '', role: '' }]);
    } else {
      setFilmography([{ year: '', movie: '', role: '' }]);
    }

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await membersAPI.delete(id);
        fetchMembers();
      } catch (error) {
        console.error('Error deleting member:', error);
        alert('Error deleting member');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      member_id: '',
      category: 'board',
      biography: '',
      image: null,
    });
    setAwards(['']);
    setFilmography([{ year: '', movie: '', role: '' }]);
    setEditingMember(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">KCADAA Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium">Total Members</h3>
            <p className="text-3xl font-bold text-blue-600">{members.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium">Board Members</h3>
            <p className="text-3xl font-bold text-green-600">
              {members.filter(m => m.category === 'board').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium">Art Directors</h3>
            <p className="text-3xl font-bold text-purple-600">
              {members.filter(m => m.category === 'art-director').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium">Asst. Art Directors</h3>
            <p className="text-3xl font-bold text-orange-600">
              {members.filter(m => m.category === 'asst-art-director').length}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('board')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'board' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Board
              </button>
              <button
                onClick={() => setFilter('art-director')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'art-director' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Art Directors
              </button>
              <button
                onClick={() => setFilter('asst-art-director')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'asst-art-director' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Assistants
              </button>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              + Add Member
            </button>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">
                  {editingMember ? 'Edit Member' : 'Add New Member'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Role *</label>
                      <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Member ID</label>
                      <input
                        type="text"
                        value={formData.member_id}
                        onChange={(e) => setFormData({ ...formData, member_id: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Category *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="board">Board Member</option>
                        <option value="art-director">Art Director</option>
                        <option value="asst-art-director">Asst. Art Director</option>
                      </select>
                    </div>
                  </div>

                  {/* Profile Image */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Profile Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {editingMember?.image && (
                      <p className="text-sm text-gray-600 mt-1">Current: {editingMember.image}</p>
                    )}
                  </div>

                  {/* Biography */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Biography</label>
                    <textarea
                      value={formData.biography}
                      onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter member biography..."
                    ></textarea>
                  </div>

                  {/* Awards Section */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-gray-700 font-medium">Awards</label>
                      <button
                        type="button"
                        onClick={addAwardField}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                      >
                        + Add Award
                      </button>
                    </div>
                    <div className="space-y-2">
                      {awards.map((award, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={award}
                            onChange={(e) => updateAward(index, e.target.value)}
                            placeholder={`Award ${index + 1}`}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          {awards.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeAwardField(index)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Filmography Section */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-gray-700 font-medium">Filmography</label>
                      <button
                        type="button"
                        onClick={addFilmographyField}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                      >
                        + Add Film
                      </button>
                    </div>
                    <div className="space-y-3">
                      {filmography.map((film, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2">
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">Year</label>
                              <input
                                type="text"
                                value={film.year}
                                onChange={(e) => updateFilmography(index, 'year', e.target.value)}
                                placeholder="2000"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">Movie</label>
                              <input
                                type="text"
                                value={film.movie}
                                onChange={(e) => updateFilmography(index, 'movie', e.target.value)}
                                placeholder="Movie Name"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">Worked As</label>
                              <input
                                type="text"
                                value={film.role}
                                onChange={(e) => updateFilmography(index, 'role', e.target.value)}
                                placeholder="Art Director"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                          {filmography.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeFilmographyField(index)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                            >
                              Remove Film
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors disabled:bg-blue-300"
                    >
                      {loading ? 'Saving...' : editingMember ? 'Update Member' : 'Add Member'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        resetForm();
                      }}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-3 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Members Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers.map((member) => (
                <tr key={member.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                      {member.image ? (
                        <img
                          src={`http://localhost:5000${member.image}`}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{member.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{member.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{member.member_id || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      member.category === 'board' ? 'bg-green-100 text-green-800' :
                      member.category === 'art-director' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {member.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(member)}
                      className="text-blue-600 hover:text-blue-800 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredMembers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No members found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;