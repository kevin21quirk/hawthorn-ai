'use client';

import { useState } from 'react';
import { Sparkles, TrendingUp, Heart, Award, Users, Coffee, ChefHat, Star } from 'lucide-react';
import AnimatedApplicationFlow from '@/components/AnimatedApplicationFlow';

export default function CareersPage() {
  const [isApplicationFlowOpen, setIsApplicationFlowOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-slate-50">
      {/* Hero Section with Animation */}
      <section className="relative text-white py-32 overflow-hidden">
        {/* Animated Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-40 animate-kenBurns"
          style={{
            backgroundImage: `url(/homepage-slider/slide-02.jpg)`
          }}
        />
        
        {/* Animated Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/30 via-transparent to-slate-900/40 animate-glowPulse" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Floating Particles Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-2 h-2 bg-orange-400 rounded-full animate-float" style={{animationDelay: '0s'}} />
          <div className="absolute top-40 right-20 w-3 h-3 bg-white rounded-full animate-float" style={{animationDelay: '2s'}} />
          <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-orange-300 rounded-full animate-float" style={{animationDelay: '4s'}} />
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white rounded-full animate-float" style={{animationDelay: '1s'}} />
        </div>
        
        <div className="relative px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-white/20 animate-slideDown">
              <Sparkles className="w-5 h-5 text-orange-400" />
              <span className="text-sm font-semibold text-white">We're Hiring!</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white animate-slideUp" style={{animationDelay: '0.2s'}}>
              Join Our Culinary
              <span className="block bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Dream Team</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto animate-slideUp" style={{animationDelay: '0.4s'}}>
              Be part of something extraordinary. Create unforgettable experiences with passionate professionals.
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-slideUp" style={{animationDelay: '0.6s'}}>
              <a href="#positions" className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-4 rounded-full hover:from-orange-700 hover:to-orange-600 transition-all font-bold text-lg shadow-2xl hover:shadow-orange-500/50 hover:scale-105 transform">
                View Open Positions
              </a>
              <a href="#culture" className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full hover:bg-white/20 transition-all font-bold text-lg border-2 border-white/30 hover:border-white/50">
                Explore Our Culture
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Animation */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-transparent to-slate-50 opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose Hawthorn?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join a family of passionate culinary professionals creating extraordinary experiences
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="group text-center p-8 bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 border border-orange-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mb-4 group-hover:rotate-12 transition-transform shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">25+</div>
              <div className="text-gray-600 font-medium">Team Members</div>
            </div>
            
            <div className="group text-center p-8 bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 border border-orange-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mb-4 group-hover:rotate-12 transition-transform shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">12+</div>
              <div className="text-gray-600 font-medium">Years Excellence</div>
            </div>
            
            <div className="group text-center p-8 bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 border border-orange-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mb-4 group-hover:rotate-12 transition-transform shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">4</div>
              <div className="text-gray-600 font-medium">Award Categories</div>
            </div>
            
            <div className="group text-center p-8 bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 border border-orange-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mb-4 group-hover:rotate-12 transition-transform shadow-lg">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">5.0</div>
              <div className="text-gray-600 font-medium">Employee Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits with Icons and Hover Effects */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Exceptional Benefits</h2>
            <p className="text-xl text-gray-300">We invest in our team's success and wellbeing</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="group bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border-2 border-slate-700 hover:border-orange-500 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 relative overflow-hidden"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-600/0 group-hover:from-orange-500/10 group-hover:to-orange-600/10 transition-all" />
                
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl mb-4 flex items-center justify-center group-hover:rotate-12 transition-transform">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">{benefit.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600">Find your perfect role in our culinary family</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-12 rounded-3xl shadow-xl border-2 border-orange-200 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-300 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mb-6 shadow-lg">
                  <ChefHat className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Building Our Team</h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We're always looking for talented individuals to join our team. While we don't have specific openings right now, we'd love to hear from passionate culinary professionals.
                </p>
                <p className="text-gray-600 mb-8">
                  Submit your application below and we'll keep it on file for future opportunities. We review applications regularly and will reach out when a position matches your skills.
                </p>
                <button 
                  onClick={() => setIsApplicationFlowOpen(true)}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-4 rounded-full hover:from-orange-700 hover:to-orange-600 transition-all font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform"
                >
                  <Heart className="w-5 h-5" />
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application CTA */}
      <section id="apply" className="py-20 bg-gradient-to-br from-slate-50 via-white to-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl shadow-2xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="relative">
              <Sparkles className="w-16 h-16 text-white mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ready to Apply?</h2>
              <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                Start your interactive application journey - it only takes a few minutes!
              </p>
              <button
                onClick={() => setIsApplicationFlowOpen(true)}
                className="inline-flex items-center gap-2 bg-white text-orange-600 px-10 py-5 rounded-full hover:bg-orange-50 transition-all font-bold text-xl shadow-2xl hover:shadow-orange-900/50 hover:scale-105 transform"
              >
                <Heart className="w-6 h-6" />
                Start Application
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section id="culture" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-transparent to-slate-50 opacity-50" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Culture</h2>
            <p className="text-xl text-gray-600">Where passion meets excellence</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="group bg-gradient-to-br from-white to-orange-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-orange-100">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mb-6 flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Supportive Environment</h3>
              <p className="text-gray-600 leading-relaxed">
                We foster a collaborative atmosphere where everyone can thrive. Our team values creativity, attention to detail, and a shared passion for culinary excellence.
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-white to-orange-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-orange-100">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mb-6 flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Growth & Development</h3>
              <p className="text-gray-600 leading-relaxed">
                We invest in our people through regular training, mentorship programs, and clear advancement opportunities. Your success is our success.
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-12 rounded-3xl shadow-2xl text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent" />
            <div className="relative">
              <Coffee className="w-16 h-16 text-orange-400 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">Ready to Join Us?</h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Whether you're starting your culinary journey or you're an experienced professional, you'll find a home at Hawthorn.
              </p>
              <button 
                onClick={() => setIsApplicationFlowOpen(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-4 rounded-full hover:from-orange-700 hover:to-orange-600 transition-all font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform"
              >
                Apply Today
              </button>
            </div>
          </div>
        </div>
      </section>

      <AnimatedApplicationFlow 
        isOpen={isApplicationFlowOpen} 
        onClose={() => setIsApplicationFlowOpen(false)} 
      />
    </div>
  );
}
