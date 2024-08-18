"use client"
import { useState } from 'react';

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    telephone: '',
    email: '',
    message: '',
  });

  const handleChange = (e:any) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Your message has been sent successfully!');
        // Optionally reset the form
        setFormData({
          firstName: '',
          lastName: '',
          telephone: '',
          email: '',
          message: '',
        });
      } else {
        alert('There was a problem sending your message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Get In Touch</h2>
          <hr className="w-24 border-t-4 border-[#FF5C00] mx-auto my-4" />
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700 font-semibold text-left" htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-4 border border-[#FFB085] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5C00] text-gray-700 text-lg"
              placeholder="First Name"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-gray-700 font-semibold text-left" htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-4 border border-[#FFB085] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5C00] text-gray-700 text-lg"
              placeholder="Last Name"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-gray-700 font-semibold text-left" htmlFor="telephone">Telephone</label>
            <input
              type="tel"
              id="telephone"
              value={formData.telephone}
              onChange={handleChange}
              className="w-full p-4 border border-[#FFB085] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5C00] text-gray-700 text-lg"
              placeholder="Telephone"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-gray-700 font-semibold text-left" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 border border-[#FFB085] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5C00] text-gray-700 text-lg"
              placeholder="Email"
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="mb-2 text-gray-700 font-semibold text-left" htmlFor="message">Message</label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-4 border border-[#FFB085] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5C00] text-gray-700 text-lg"
            //   rows="8"
              placeholder="Your message..."
            ></textarea>
          </div>

          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-[#FF5C00] text-white px-8 py-4 rounded-lg hover:bg-[#e04b00] transition-colors duration-300 text-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default GetInTouch;
