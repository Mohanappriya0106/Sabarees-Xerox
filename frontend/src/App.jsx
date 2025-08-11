import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import QuickPrint from './QuickPrint';


import "./App.css";
import g1 from './assets/g1.jpg';
import g2 from './assets/g2.jpg';
import g3 from './assets/g3.jpg';
import g4 from './assets/g4.jpg';
import g5 from './assets/g5.jpg';
import g6 from './assets/g6.jpeg';
import g7 from './assets/g7.jpg';
import g8 from './assets/g8.jpeg';
import g9 from './assets/g9.jpg';
import g10 from './assets/g10.jpg';
import g11 from './assets/g11.jpg';

export default function App() {
  const [selectedService, setSelectedService] = useState(null);

  // Add state for form data and status
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState(null);

  const services = [
    {
      name: "Black & White Xerox",
      details: "Student Offer: ₹1 per page \nGeneral - ₹1 per side",
      image:g1,
    },
    {
      name: "Colour Xerox",
      details: "A4 - ₹10 per side",
      image:g2,
    },
    {
      name: "Lamination",
      details:
        "A4 size: ₹25 per page \nA3 size: ₹50 per page \nLegal size: ₹25 per page \nID card size: ₹10 per page \nPVC Lamination: ₹40",
        image:g3,
    },
    {
      name: "Binding",
      details:
        "Calico binding: ₹40 \nSpiral binding: ₹40 \n\tStudents offer: ₹20 \nGeneral: ₹25 \nHard binding: ₹150 \nSoft binding: ₹110",
        image:g4,
    },
    {
      name: "Jathagamn (Computer Astrology)",
      details: "Single Page - ₹25 \nBook - ₹350",
      image:g5,
    },
    {
      name: "Baby Names (Numerology & Astrology)",
      details: "₹200",
      image:g6,
    },
    {
      name: "Marriage Match (Astrology)",
      details: "₹50",
      image:g7,
    },
    {
      name: "Photos",
      details:
        "Passport Size - ₹50 per 10 photos \n4x6 - ₹10 per photo",
      image:g8,
    },
    {
      name: "Downloading ID's and Documents",
      details:
        "Chitta, Birth Certificates, Death Certificates - ₹20 \nAadhar (with lamination) - ₹60 \nOnline EC - ₹50",
      image:g9,
    },
    {
      name: "Typing",
      details: "English - ₹30 \nTamil - ₹50",
      image:g10,
    },
    {
      name: "College/Office ID cards",
      details: "Starting from ₹70 with tag",
      image:g11,
    },
  ];

  // Handle input changes for form
  function handleChange(e) {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  }

  // Handle form submit
  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ error: 'Please fill all fields.' });
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ success: data.success });
        setFormData({ name: '', email: '', message: '' }); // reset form
      } else {
        setStatus({ error: data.error || 'Something went wrong' });
      }
    } catch (error) {
      setStatus({ error: 'Network error. Please try again later.' });
    }
  }

  return (
    <Router>
        <Routes>
            <Route
              path="/"
              element={
                <>
                
                
              
              <div className="min-h-screen flex flex-col">
                {/* Header */}
                <header className="bg-white shadow p-4 flex items-center h-auto sticky top-0  z-50">
                  <img
                    src="src/assets/resized.png"
                    alt="Company Logo"
                    className="w-10 h-10 rounded-full"
                  />
                  <h1 className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold">
                    Sabarees Xerox
                  </h1>
                </header>

                {/* Tagline */}
                <div className="bg-gray-100 py-2">
                  <p className="text-center text-gray-700 font-medium">
                    Serving Since <b>2013</b>
                  </p>
                </div>

                <nav className="bg-yellow-500 py-3 shadow-md sticky top-[64px] z-40">
                  <div className="max-w-6xl mx-auto px-4">
                    <ul className="flex justify-center gap-6 text-white font-semibold">
                      <li>
                        <a href="#quick-print" className="hover:text-gray-200">Quick Print</a>
                      </li>
                      <li>
                        <a href="#our-services" className="hover:text-gray-200">Our Services</a>
                      </li>
                      <li>
                        <a href="#contact" className="hover:text-gray-200">Contact</a>
                      </li>
                    </ul>
                  </div>
                </nav>

                {/* Hero */}
                <section className="flex flex-col items-center justify-center text-center py-16 bg-white border-b border-gray-200" id="quick-print">
                  <h2 className="text-3xl font-semibold">Quick Xerox at Minimal Cost</h2>
                  <p className="text-gray-600 mt-2">Fast delivery at minimal charges</p>
                  <Link to="/quick-print">
                    <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Order Now
                  </button>
                  </Link>
                  
                </section>

                {/* Services */}
                <section className="py-12 bg-gray-50"  id="our-services">
                  <h2 className="text-2xl font-bold text-center mb-8">Our Services</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                    {services.map((service, idx) => (
                      <div
                        key={idx}
                        className="bg-white border rounded-lg shadow hover:shadow-lg cursor-pointer transition"
                        onClick={() => setSelectedService(service)}
                      >
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-40 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-semibold">{service.name}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Modal */}
                {selectedService && (
                  <>
                    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50"></div>
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                      <div className="bg-white p-6 rounded-lg shadow-lg w-80 max-h-[80vh] overflow-y-auto relative">
                        <button
                          className="absolute top-2 right-3 text-gray-600 hover:text-gray-900 text-xl"
                          onClick={() => setSelectedService(null)}
                        >
                          ✖
                        </button>
                        <h3 className="text-xl font-bold mb-4">{selectedService.name}</h3>
                        <pre className="whitespace-pre-wrap text-lg font-semibold text-gray-800 leading-relaxed bg-gray-200 p-4 rounded">
                          {selectedService.details}
                        </pre>
                      </div>
                    </div>
                  </>
                )}

                {/* Find Us Section */}
                <section className="py-12 bg-white border-t border-gray-200" id="contact">
                  <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">
                      Find Us Easily
                    </h2>
                    <p className="text-gray-600 mb-8">
                      Visit our store at the location below. Click on the map for directions.
                    </p>

                    <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
                      <iframe
                        title="Shop Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.958038764786!2d77.0041983758374!3d10.660365061322166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8399ffb791d51%3A0x98f563585faf5570!2sSabarees%20Xerox!5e0!3m2!1sen!2sin!4v1754823264409!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
                </section>

                {/* Contact Us Section */}
                <section className="py-12 bg-gray-50 border-t border-gray-200">
                  <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                      Contact Us
                    </h2>
                    <p className="text-center text-gray-600 mb-12">
                      Have questions or need help? We’d love to hear from you.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Contact Info */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">Address</h3>
                          <p className="text-gray-600">129, KM Complex, Palaghat Rd, Pollachi, Tamil Nadu-642001</p>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">Phone</h3>
                          <p className="text-gray-600">+91 9789225025</p>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">Email</h3>
                          <p className="text-gray-600">sabareesxerox@gmail.com</p>
                        </div>
                      </div>

                      {/* Contact Form */}
                      <form 
                        className="bg-white shadow-md rounded-lg p-6 space-y-4"
                        onSubmit={handleSubmit}
                      >
                        <div>
                          <label className="block text-gray-700 mb-1" htmlFor="name">Name</label>
                          <input
                            id="name"
                            type="text"
                            placeholder="Your Name"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
                          <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-1" htmlFor="message">Message</label>
                          <textarea
                            id="message"
                            rows="4"
                            placeholder="Your message..."
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            value={formData.message}
                            onChange={handleChange}
                          ></textarea>
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                        >
                          Send Message
                        </button>

                        {/* Status messages */}
                        {status?.success && (
                          <p className="text-green-600 mt-2">{status.success}</p>
                        )}
                        {status?.error && (
                          <p className="text-red-600 mt-2">{status.error}</p>
                        )}
                      </form>
                    </div>
                  </div>
                </section>
              </div>
            </>
              }
              />
            <Route path="/quick-print" element={<QuickPrint />} />
          </Routes>
  </Router>

  );
}
