'use client';

import Link from 'next/link';
import { assessments } from '@/lib/assessments';
import { ClipboardCheck, BookOpen, Target, ArrowLeft, CheckCircle } from 'lucide-react';

export default function AssessmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-semibold mb-4"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Self Assessment (CBT)
          </h1>
          <p className="text-lg text-gray-600">
            Test your knowledge with comprehensive MCQ assessments
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Info Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center">
            <ClipboardCheck className="mr-2" size={24} />
            About Self Assessments
          </h3>
          <ul className="text-blue-900 space-y-2 text-sm">
            <li className="flex items-start">
              <CheckCircle className="mr-2 flex-shrink-0 mt-0.5" size={16} />
              <span>Each assessment contains 50 multiple-choice questions</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="mr-2 flex-shrink-0 mt-0.5" size={16} />
              <span>Detailed explanations provided after each question</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="mr-2 flex-shrink-0 mt-0.5" size={16} />
              <span>Passing score: 70% (35 out of 50 questions)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="mr-2 flex-shrink-0 mt-0.5" size={16} />
              <span>Track your progress and review your answers</span>
            </li>
          </ul>
        </div>

        {/* Assessments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessments.map((assessment, index) => (
            <Link
              key={assessment.id}
              href={`/assessment/${assessment.id}`}
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-2 bg-gradient-to-r from-orange-500 to-red-500"></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors flex-1">
                    {assessment.title}
                  </h3>
                  <div className="bg-orange-100 text-orange-800 text-xs font-bold px-2 py-1 rounded flex-shrink-0 ml-2">
                    50 MCQ
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm">
                  Related Module: <span className="font-semibold">{assessment.module}</span>
                </p>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center text-gray-500">
                    <BookOpen size={16} className="mr-2 text-orange-600" />
                    <span>{assessment.questions.length} Questions</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Target size={16} className="mr-2 text-orange-600" />
                    <span>Passing Score: {assessment.passingScore}%</span>
                  </div>
                </div>

                {/* Difficulty Distribution */}
                <div className="mb-4 pb-4 border-b">
                  <div className="text-xs font-semibold text-gray-700 mb-2">
                    Question Difficulty:
                  </div>
                  <div className="flex space-x-2">
                    {['easy', 'medium', 'hard'].map(level => {
                      const count = assessment.questions.filter(q => q.difficulty === level).length;
                      const color = level === 'easy' ? 'bg-green-500' : level === 'medium' ? 'bg-yellow-500' : 'bg-red-500';
                      return count > 0 ? (
                        <div key={level} className="flex items-center space-x-1">
                          <div className={`w-2 h-2 rounded-full ${color}`}></div>
                          <span className="text-xs text-gray-600 capitalize">{level}: {count}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex items-center justify-between text-orange-600 font-semibold">
                    <span>Start Assessment</span>
                    <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {assessments.length === 0 && (
          <div className="text-center py-20">
            <ClipboardCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No assessments available</h3>
            <p className="text-gray-600">Check back later for new assessments</p>
          </div>
        )}
      </main>
    </div>
  );
}
