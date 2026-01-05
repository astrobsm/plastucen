'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, GraduationCap, ClipboardCheck, FileText, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [isOnline, setIsOnline] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const sections = [
    {
      title: 'CME Exam Focus',
      description: 'Comprehensive continuing medical education content with exam-oriented material',
      icon: GraduationCap,
      href: '/cme',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      title: 'Clinical Practice',
      description: 'Practical clinical guidelines and procedures for daily practice',
      icon: BookOpen,
      href: '/practice',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    },
    {
      title: 'Guidelines & Protocols',
      description: 'Evidence-based guidelines and treatment protocols',
      icon: FileText,
      href: '/guidelines',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600'
    },
    {
      title: 'Self Assessment (MCQ)',
      description: '50-question assessments with detailed explanations',
      icon: ClipboardCheck,
      href: '/assessment',
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo.png"
                alt="PlasticSurgery Study Center Logo"
                width={48}
                height={48}
                className="rounded-lg"
              />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                  PlasticSurgery Study Center
                </h1>
                <p className="text-xs text-slate-600">Your Complete Learning Platform</p>
              </div>
            </div>
            
            {/* Online Status Indicator */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm text-gray-600 hidden sm:inline">
                  {isOnline ? 'Online' : 'Offline Mode'}
                </span>
              </div>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold mb-2 sm:mb-3 animate-fade-in">
            Master Plastic Surgery
          </h2>
          <p className="text-sm sm:text-base mb-4 sm:mb-6 text-blue-200 italic max-w-2xl mx-auto">
            Designed by Dr. E. C. Nnadi in appreciation of J. U. Achebe; I. S. Ogbonnaya and I. I. Onah—distinguished teachers and mentors par excellence.
          </p>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-blue-100 max-w-3xl mx-auto animate-slide-up">
            Comprehensive study platform with CME content, clinical practice guidelines, 
            and self-assessment tools. Available offline, anytime, anywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/cme"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto text-center"
            >
              Start Learning
            </Link>
            <Link
              href="/assessment"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-all border-2 border-blue-400 w-full sm:w-auto text-center"
            >
              Take Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-900">
          Explore Our Learning Modules
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.href}
                href={section.href}
                className="group card-hover bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-400"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-4 sm:space-x-6">
                  <div className={`${section.color} p-3 sm:p-4 rounded-xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {section.title}
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {section.description}
                    </p>
                    <div className="mt-4 flex items-center text-blue-600 font-semibold text-sm sm:text-base">
                      <span>Explore</span>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Features List */}
      <section className="bg-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h3>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform provides a quick yet comprehensive tour of reconstructive and aesthetic surgery, combining high-yield clinical content with a strong examination-focused approach. Integrated self-assessment tools reinforce learning, test understanding, and prepare users confidently for postgraduate and professional examinations—while maintaining practical relevance for everyday clinical practice.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Comprehensive Content',
                description: 'Covers all major topics in plastic and reconstructive surgery',
                icon: '📚'
              },
              {
                title: 'Slide-by-Slide Learning',
                description: 'Visually appealing, easy-to-digest content presentation',
                icon: '📊'
              },
              {
                title: 'Self Assessment',
                description: '50-question MCQ tests with detailed explanations',
                icon: '✓'
              },
              {
                title: 'Offline Access',
                description: 'Study anywhere, anytime - even without internet',
                icon: '📱'
              },
              {
                title: 'Mobile Optimized',
                description: 'Perfect experience on phones, tablets, and desktops',
                icon: '💻'
              },
              {
                title: 'Progress Tracking',
                description: 'Track your learning journey and assessment scores',
                icon: '📈'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-blue-100"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Begin Your Learning Journey?
          </h3>
          <p className="text-base sm:text-lg mb-8 text-blue-100">
            Join thousands of plastic surgery trainees and professionals improving their knowledge
          </p>
          <Link
            href="/cme"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h5 className="text-white font-bold mb-4">PlasticSurgery Study Center</h5>
              <p className="text-sm text-gray-400">
                Comprehensive plastic surgery education platform with offline capabilities.
              </p>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="/cme" className="hover:text-white transition-colors">CME Exam</Link></li>
                <li><Link href="/practice" className="hover:text-white transition-colors">Clinical Practice</Link></li>
                <li><Link href="/guidelines" className="hover:text-white transition-colors">Guidelines</Link></li>
                <li><Link href="/assessment" className="hover:text-white transition-colors">Self Assessment</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">Features</h5>
              <ul className="space-y-2 text-sm">
                <li>✓ Offline Functionality</li>
                <li>✓ Mobile-First PWA</li>
                <li>✓ Comprehensive MCQ Tests</li>
                <li>✓ Slide-by-Slide Learning</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
            <p>&copy; 2026 PlasticSurgery Study Center. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
