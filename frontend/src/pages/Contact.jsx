import Hero from '../components/Hero';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', website: '', phone: '', subject: '', message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', msg: '' });

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', msg: 'Thank you! We will contact you soon.' });
        setFormData({ name: '', email: '', website: '', phone: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', msg: data.error || 'Failed to send' });
      }
    } catch (error) {
      setStatus({ type: 'error', msg: 'Network error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Hero title="KARNATAKA CINE ART-DIRECTORS <br/> AND ASSISTANTS ASSOCIATION" subtitle="Celebrating Art and Culture Together" />

      <section className="py-12 md:py-16 bg-[#fbf8f5]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">CONTACT US</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-12 md:mb-16">
            <div className="text-center p-6 md:p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-base md:text-lg mb-2 uppercase">VISIT OUR PLACE</h3>
              <p className="text-sm md:text-base text-gray-600">Gandhingara, Bengaluru</p>
            </div>

            <div className="text-center p-6 md:p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-base md:text-lg mb-2 uppercase">CONTACT US</h3>
              <p className="text-sm md:text-base text-gray-600 mb-1">
                <a href="mailto:kcadaa.blr@gmail.com" className="hover:text-accent transition-colors">kcadaa.blr@gmail.com</a>
              </p>
              <p className="text-sm md:text-base text-gray-600">
                <a href="tel:+917411041975" className="hover:text-accent transition-colors">+91 74110 41975</a>
              </p>
            </div>

            <div className="text-center p-6 md:p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-base md:text-lg mb-2 uppercase">OFFICE TIME</h3>
              <p className="text-sm md:text-base text-gray-600">MON - SAT</p>
              <p className="text-sm md:text-base text-gray-600">10:00 AM to 6:00PM</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-[#fbf8f5]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-800 uppercase">SEND YOUR MESSAGE</h2>

          <div className="bg-gradient-to-br from-gray-200 to-gray-300 p-6 sm:p-8 md:p-12 rounded-3xl shadow-xl">
            {status.msg && (
              <div className={`mb-6 p-4 rounded-lg ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {status.msg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name *" className="w-full px-5 py-4 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent shadow-sm" required disabled={isLoading} />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Mail ID *" className="w-full px-5 py-4 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent shadow-sm" required disabled={isLoading} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <input type="text" name="website" value={formData.website} onChange={handleChange} placeholder="Website" className="w-full px-5 py-4 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent shadow-sm" disabled={isLoading} />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Contact Number *" className="w-full px-5 py-4 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent shadow-sm" required disabled={isLoading} />
              </div>

              <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject *" className="w-full px-5 py-4 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent shadow-sm" required disabled={isLoading} />

              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Write your message *" rows="6" className="w-full px-5 py-4 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent resize-none shadow-sm" required disabled={isLoading}></textarea>

              <button type="submit" className="bg-[#005d9b] hover:bg-[#004d82] text-white font-bold px-8 md:px-10 py-3 md:py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl uppercase tracking-wide disabled:opacity-50" disabled={isLoading}>
                {isLoading ? 'SENDING...' : 'SEND YOUR MESSAGE'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;