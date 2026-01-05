'use client';

import Link from 'next/link';
import { modules } from '@/lib/content';
import { Clock, BookOpen, Target, ArrowLeft } from 'lucide-react';

export default function PracticePage() {
  const practiceModules = modules.filter(m => m.category === 'practice');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-semibold mb-4"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Clinical Practice Focus
          </h1>
          <p className="text-lg text-gray-600">
            Practical clinical guidelines and procedures for daily practice
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceModules.map((module, index) => (
            <Link
              key={module.id}
              href={`/practice/${module.id}`}
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-2 bg-gradient-to-r from-green-500 to-teal-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  {module.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {module.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={16} className="mr-2 text-green-600" />
                    <span>{module.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <BookOpen size={16} className="mr-2 text-green-600" />
                    <span>{module.slides.length} Slides</span>
                  </div>
                </div>

                {module.objectives && module.objectives.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <Target size={16} className="mr-2 text-green-600" />
                      <span>Learning Objectives:</span>
                    </div>
                    <ul className="text-xs text-gray-600 space-y-1 ml-6">
                      {module.objectives.slice(0, 3).map((obj, idx) => (
                        <li key={idx} className="list-disc">{obj}</li>
                      ))}
                      {module.objectives.length > 3 && (
                        <li className="text-green-600 font-semibold">+{module.objectives.length - 3} more...</li>
                      )}
                    </ul>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between text-green-600 font-semibold">
                    <span>Start Learning</span>
                    <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
