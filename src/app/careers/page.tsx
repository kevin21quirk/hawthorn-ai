'use client';

import { useState } from 'react';

export default function CareersPage() {
  const [applicationForm, setApplicationForm] = useState({
    position: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    availability: '',
    coverLetter: '',
    reference: ''
  });

  const positions = [
    {
      title: "Line Cook",
      type: "Full-Time",
      department: "Kitchen",
      salary: "£14-17/hour + tips",
      shift: "Evenings & Weekends",
      description: "We're seeking experienced line cooks to join our kitchen team. Must have at least 2 years of fine dining experience and be able to work in a fast-paced environment."
    },
    {
      title: "Sous Chef",
      type: "Full-Time",
      department: "Kitchen",
      salary: "£42,000-50,000/year",
      shift: "Full-Time",
      description: "Looking for a creative sous chef to assist our executive chef. Must have culinary degree and 5+ years of experience in fine dining establishments."
    },
    {
      title: "Server",
      type: "Full-Time/Part-Time",
      department: "Front of House",
      salary: "£12/hour + tips",
      shift: "Flexible",
      description: "Join our front-of-house team as a server. Previous fine dining experience required. Must have excellent communication skills and wine knowledge."
    },
    {
      title: "Bartender",
      type: "Part-Time",
      department: "Bar",
      salary: "£13/hour + tips",
      shift: "Evenings & Weekends",
      description: "Seeking an experienced bartender with extensive knowledge of craft cocktails and fine wines. Must be 21+ and have bartending certification."
    },
    {
      title: "Host/Hostess",
      type: "Part-Time",
      department: "Front of House",
      salary: "£11/hour + tips",
      shift: "Evenings & Weekends",
      description: "Looking for friendly hosts to manage reservations and greet guests. Excellent customer service skills and professional appearance required."
    },
    {
      title: "Dishwasher",
      type: "Full-Time",
      department: "Kitchen",
      salary: "£12/hour",
      shift: "Evenings & Weekends",
      description: "Join our kitchen team as a dishwasher. No experience necessary - we'll train you. Must be reliable and able to work in a fast-paced environment."
    }
  ];

  const benefits = [
    {
      title: "Competitive Compensation",
      description: "Fair wages with tips, performance bonuses, and regular salary reviews"
    },
    {
      title: "Health Benefits",
      description: "Comprehensive health, dental, and vision insurance for full-time employees"
    },
    {
      title: "Professional Development",
      description: "Ongoing training, workshops, and opportunities to attend culinary events"
    },
    {
      title: "Career Growth",
      description: "Clear advancement paths from entry-level to management positions"
    },
    {
      title: "Work-Life Balance",
      description: "Predictable schedules, paid time off, and flexible scheduling when possible"
    },
    {
      title: "Employee Discounts",
      description: "Generous dining discounts for you and your family at our restaurant"
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setApplicationForm({
      ...applicationForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application submitted:', applicationForm);
    // Handle application submission
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-50"
          style={{
            backgroundImage: `url(/homepage-slider/slide-01.jpg)`
          }}
        />
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Careers at Hawthorn</h1>
            <p className="text-xl text-white">Join our team of culinary professionals</p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Work at Hawthorn?</h2>
          <p className="text-lg text-gray-600">
            Hawthorn is more than just a restaurant - we're a family of passionate culinary professionals dedicated to creating exceptional dining experiences. We offer a dynamic work environment, opportunities for growth, and the chance to be part of something special.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Current Openings</h2>
          <div className="text-center bg-gray-50 p-12 rounded-lg shadow-md">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">None at the moment</h3>
              <p className="text-lg text-gray-600 mb-6">
                We will update this at some point in the future and we're looking for staff.
              </p>
              <p className="text-gray-600">
                Please check back regularly for new opportunities, or feel free to submit your application using the form below and we'll keep it on file for future openings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Join Our Team</h2>
          <p className="text-center text-gray-600 mb-8">Interested in working at Hawthorn? Fill out the form below and we'll be in touch!</p>
          
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-6">
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">Position Applying For</label>
              <select
                id="position"
                name="position"
                value={applicationForm.position}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select a position</option>
                {positions.map((pos) => (
                  <option key={pos.title} value={pos.title.toLowerCase().replace(/\s+/g, '-')}>
                    {pos.title}
                  </option>
                ))}
                <option value="other">Other</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={applicationForm.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={applicationForm.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={applicationForm.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={applicationForm.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                <select
                  id="experience"
                  name="experience"
                  value={applicationForm.experience}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Select experience level</option>
                  <option value="0-1">Less than 1 year</option>
                  <option value="1-2">1-2 years</option>
                  <option value="2-5">2-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">More than 10 years</option>
                </select>
              </div>
              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                <select
                  id="availability"
                  name="availability"
                  value={applicationForm.availability}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Select availability</option>
                  <option value="full-time">Full-Time</option>
                  <option value="part-time">Part-Time</option>
                  <option value="seasonal">Seasonal</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">Cover Letter</label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                value={applicationForm.coverLetter}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us why you'd be a great fit for Hawthorn..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              ></textarea>
            </div>

            <div className="mb-6">
              <label htmlFor="reference" className="block text-sm font-medium text-gray-700 mb-2">How did you hear about us?</label>
              <select
                id="reference"
                name="reference"
                value={applicationForm.reference}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select an option</option>
                <option value="indeed">Indeed</option>
                <option value="restaurant">Restaurant Website</option>
                <option value="employee">Current Employee</option>
                <option value="social">Social Media</option>
                <option value="walk-in">Walk-in</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 px-6 rounded-md hover:bg-orange-700 transition-colors font-semibold"
            >
              Submit Application
            </button>
          </form>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Culture</h2>
          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="mb-4">
              At Hawthorn, we believe in fostering a supportive, collaborative environment where everyone can thrive. We value creativity, attention to detail, and a passion for excellence. Our team is diverse, talented, and committed to providing the best possible experience for our guests.
            </p>
            <p>
              We invest in our people through regular training, mentorship programs, and opportunities for advancement. Whether you're just starting your culinary career or you're an experienced professional, you'll find a home at Hawthorn.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
