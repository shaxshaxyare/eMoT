
import React from 'react';
import { View } from '../types';
import { ArrowRight, LogIn, UserPlus } from 'lucide-react';

interface LandingPageProps {
  navigate: (view: View) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ navigate }) => {
  const quickLinks = [
    { text: 'Renew Driver License', action: '#' },
    { text: 'Register a Vehicle', action: '#' },
    { text: 'Pay a Ticket or Fee', action: '#' },
    { text: 'Check Application Status', action: '#' },
  ];

  const services = [
    { title: 'Licensing', description: 'Renew or replace driver licenses and verify eligibility in minutes.' },
    { title: 'Vehicle Services', description: 'Manage vehicle ownership, and manage vehicle records online.' },
    { title: 'Payments', description: 'Pay tickets and fees securely with instant digital receipts.' },
  ];

  const announcements = [
    { title: 'Road safety campaign launches nationwide', date: 'Nov 05, 2025' },
    { title: 'Holiday testing center hours', date: 'Nov 01, 2025' },
    { title: 'Temporary closures due to maintenance', date: 'Oct 28, 2025' },
  ];

  return (
    <div className="bg-white text-brand-gray-800">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-brand-gray-200 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-brand-blue-700" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
            </svg>
            <span className="font-bold text-lg">Ministry of Transportation</span>
        </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="hover:text-brand-blue-700">Home</a>
            <a href="#" className="hover:text-brand-blue-700">Services</a>
            <a href="#" className="hover:text-brand-blue-700">Notices</a>
            <a href="#" className="hover:text-brand-blue-700">Regulations</a>
          </nav>
          <div className="flex items-center space-x-2">
            <button onClick={() => navigate('signin')} className="text-sm font-medium text-brand-gray-700 hover:text-brand-blue-700 flex items-center space-x-1">
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </button>
            <button onClick={() => navigate('signup')} className="bg-brand-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-blue-800">
              Register
            </button>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-brand-blue-50 py-20">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-brand-blue-700 font-semibold">Trusted public services</p>
              <h1 className="text-4xl md:text-5xl font-bold mt-2 leading-tight">Move with confidence. Access transportation services online.</h1>
              <p className="mt-4 text-lg text-brand-gray-600">Renew licenses, manage vehicle records, pay fees, and stay informed all in one secure place.</p>
              <div className="mt-8 flex space-x-4">
                <button onClick={() => navigate('signin')} className="bg-brand-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-blue-800">Access Citizen Portal</button>
                <button className="bg-white border border-brand-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-brand-gray-100">View Services</button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold">Quick Links</h3>
              <ul className="mt-4 space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.action} className="flex justify-between items-center p-3 rounded-lg hover:bg-brand-gray-100">
                      <span>{link.text}</span>
                      <ArrowRight className="w-5 h-5 text-brand-gray-500" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="container mx-auto px-6 mt-12 grid sm:grid-cols-3 gap-6 text-center">
             <div className="bg-brand-blue-100/70 p-4 rounded-lg"><p className="text-2xl font-bold text-brand-blue-800">2.1M+</p><p className="text-sm text-brand-blue-700">Citizens served online</p></div>
             <div className="bg-brand-blue-100/70 p-4 rounded-lg"><p className="text-2xl font-bold text-brand-blue-800">50+</p><p className="text-sm text-brand-blue-700">Digital services available</p></div>
             <div className="bg-brand-blue-100/70 p-4 rounded-lg"><p className="text-2xl font-bold text-brand-blue-800">24/7</p><p className="text-sm text-brand-blue-700">Secure access</p></div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold">Everything you need to stay on the road</h2>
            <p className="mt-2 text-brand-gray-600">Fast, transparent, and secure services for drivers and vehicle owners.</p>
            <div className="mt-12 grid md:grid-cols-3 gap-8 text-left">
              {services.map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border border-brand-gray-200">
                  <h3 className="font-semibold text-lg">{service.title}</h3>
                  <p className="mt-2 text-brand-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Announcements and How it works */}
        <section className="bg-brand-gray-50 py-20">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Announcements</h3>
              <div className="bg-white p-4 rounded-lg border border-brand-gray-200">
                  <h4 className="font-semibold">Latest public notices</h4>
                  <ul className="mt-4 space-y-4">
                      {announcements.map((item, i) => (
                          <li key={i} className="flex items-center text-sm">
                              <span className="text-brand-gray-500 mr-4">{item.date}</span>
                              <span className="text-brand-gray-700">{item.title}</span>
                          </li>
                      ))}
                  </ul>
                  <button className="mt-6 text-sm font-medium text-brand-blue-700 hover:underline">All notices</button>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">How it works</h3>
              <div className="bg-white p-6 rounded-lg border border-brand-gray-200 space-y-3">
                  <h4 className="font-semibold">Simple, secure, transparent</h4>
                  <p className="p-3 bg-brand-gray-100 rounded-md">Pick a service and review requirements</p>
                  <p className="p-3 bg-brand-gray-100 rounded-md">Submit your application online</p>
                  <p className="p-3 bg-brand-gray-100 rounded-md">Track status and receive secure updates</p>
                  <p className="p-3 bg-brand-gray-100 rounded-md">Get your digital or hard copy as needed</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Portal in action */}
        <section className="py-20">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold">See the portal in action</h2>
                <p className="mt-2 text-brand-gray-600">A modern, accessible experience designed for all citizens.</p>
                <div className="mt-12 grid md:grid-cols-2 gap-8 text-left">
                    <div className="bg-white p-4 rounded-lg border border-brand-gray-200">
                        <h3 className="font-semibold mb-2">Citizen Portal Preview</h3>
                        <img src="https://i.imgur.com/W29gVfP.png" alt="Portal Preview" className="w-full h-64 object-cover rounded-md" />
                        <p className="text-sm text-brand-gray-500 mt-2">Illustrative preview. Sign in to access your personalized dashboard.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-brand-gray-200">
                        <h3 className="font-semibold mb-2">Locations and test centers</h3>
                        <img src="https://i.imgur.com/M6L7E1p.png" alt="Map Preview" className="w-full h-64 object-cover rounded-md" />
                        <p className="text-sm text-brand-gray-500 mt-2">Find nearest offices, testing sites, and service hours.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* CTA */}
        <section className="bg-brand-blue-50 py-20">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold">Ready to get started?</h2>
                <p className="mt-2 text-brand-gray-600">Access secure online services or learn more about our programs.</p>
                <div className="mt-8 flex justify-center space-x-4">
                     <button onClick={() => navigate('signin')} className="bg-white border border-brand-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-brand-gray-100 flex items-center space-x-2">
                        <LogIn className="w-5 h-5" />
                        <span>Login</span>
                     </button>
                     <button onClick={() => navigate('signup')} className="bg-brand-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-blue-800 flex items-center space-x-2">
                        <UserPlus className="w-5 h-5" />
                        <span>Register</span>
                     </button>
                </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-brand-gray-200">
          <div className="container mx-auto px-6 py-12">
              <div className="grid md:grid-cols-4 gap-8">
                  <div>
                      <h3 className="font-bold text-lg">Ministry of Transportation</h3>
                      <p className="text-sm text-brand-gray-600 mt-2">Public services for citizens and residents. Manage licenses, vehicles, payments, and more.</p>
                      <button className="mt-4 bg-brand-blue-100 text-brand-blue-700 px-4 py-2 rounded-lg text-sm font-medium">24/7 Citizen Support</button>
                  </div>
                  <div>
                      <h4 className="font-semibold">Contact</h4>
                      <p className="text-sm mt-2">123 Civic Avenue, Capital City</p>
                      <p className="text-sm">+1 (800) 555-0123</p>
                      <p className="text-sm">contact@mot.gov</p>
                      <p className="text-sm">Mon-Fri, 8:00-18:00</p>
                  </div>
                  <div>
                      <h4 className="font-semibold">Quick Links</h4>
                      <ul className="text-sm mt-2 space-y-1">
                          <li><a href="#" className="hover:underline">Licensing</a></li>
                          <li><a href="#" className="hover:underline">Vehicle Services</a></li>
                          <li><a href="#" className="hover:underline">Payments</a></li>
                          <li><a href="#" className="hover:underline">Help Center</a></li>
                      </ul>
                  </div>
                  <div>
                      <h4 className="font-semibold">Resources</h4>
                      <ul className="text-sm mt-2 space-y-1">
                          <li><a href="#" className="hover:underline">Notices</a></li>
                          <li><a href="#" className="hover:underline">Regulations</a></li>
                          <li><a href="#" className="hover:underline">Forms & Guides</a></li>
                          <li><a href="#" className="hover:underline">Privacy & Security</a></li>
                      </ul>
                  </div>
              </div>
              <div className="mt-12 pt-6 border-t border-brand-gray-200 text-sm text-brand-gray-500 flex justify-between">
                  <p>© 2025 Ministry of Transportation</p>
                  <div className="space-x-4">
                      <a href="#" className="hover:underline">Accessibility</a>
                      <a href="#" className="hover:underline">Privacy + Terms</a>
                      <a href="#" className="hover:underline">Open Data</a>
                  </div>
              </div>
          </div>
      </footer>
    </div>
  );
};

export default LandingPage;