'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, List, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Slide } from '@/lib/content';

interface SlideViewerProps {
  slides: Slide[];
  moduleTitle: string;
}

export default function SlideViewer({ slides, moduleTitle }: SlideViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showOutline, setShowOutline] = useState(false);
  const [completedSlides, setCompletedSlides] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Mark current slide as viewed
    setCompletedSlides(prev => new Set(prev).add(currentSlide));
  }, [currentSlide]);

  const goToNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const goToPreviousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setShowOutline(false);
  };

  const progress = ((currentSlide + 1) / slides.length) * 100;
  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <BookOpen className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                  {moduleTitle}
                </h1>
                <p className="text-xs sm:text-sm text-gray-500">
                  Slide {currentSlide + 1} of {slides.length}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowOutline(!showOutline)}
              className="ml-4 p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
              aria-label="Toggle outline"
            >
              {showOutline ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </header>

      {/* Outline Sidebar */}
      {showOutline && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:relative lg:bg-transparent">
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto lg:relative lg:w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Slide Outline</h3>
                <button
                  onClick={() => setShowOutline(false)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-2">
                {slides.map((s, index) => (
                  <button
                    key={s.id}
                    onClick={() => goToSlide(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      index === currentSlide
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">
                        {index + 1}. {s.title}
                      </span>
                      {completedSlides.has(index) && (
                        <span className="text-xs">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12 animate-fade-in">
          {/* Slide Title */}
          <div className="mb-6 sm:mb-8 pb-6 border-b-2 border-blue-100">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              {slide.title}
            </h2>
            <div className="text-sm text-gray-500">
              Slide {currentSlide + 1} / {slides.length}
            </div>
          </div>

          {/* Slide Content */}
          <div className="prose prose-lg max-w-none 
            prose-headings:text-slate-900 prose-headings:font-bold
            prose-h1:text-3xl prose-h1:text-slate-900 prose-h1:mb-6
            prose-h2:text-2xl prose-h2:text-slate-800 prose-h2:mt-8 prose-h2:mb-4
            prose-h3:text-xl prose-h3:text-slate-800 prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-slate-700 prose-p:leading-relaxed prose-p:text-base prose-p:mb-4
            prose-li:text-slate-700 prose-li:leading-relaxed prose-li:text-base
            prose-strong:text-slate-900 prose-strong:font-bold
            prose-code:text-blue-700 prose-code:bg-blue-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-medium
            prose-ul:my-4 prose-ol:my-4
            prose-li:my-1
            text-slate-700 leading-relaxed">
            <ReactMarkdown>{slide.content}</ReactMarkdown>
          </div>

          {/* Key Points */}
          {slide.keyPoints && slide.keyPoints.length > 0 && (
            <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-4 flex items-center">
                <span className="text-2xl mr-2">🔑</span>
                Key Points
              </h3>
              <ul className="space-y-3">
                {slide.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start text-sm sm:text-base">
                    <span className="text-blue-700 mr-3 flex-shrink-0 font-bold text-lg">•</span>
                    <span className="text-slate-800 font-medium leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Clinical Pearls */}
          {slide.clinicalPearls && slide.clinicalPearls.length > 0 && (
            <div className="mt-6 bg-amber-50 border-l-4 border-amber-600 rounded-r-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-amber-900 mb-4 flex items-center">
                <span className="text-2xl mr-2">💎</span>
                Clinical Pearls
              </h3>
              <ul className="space-y-3">
                {slide.clinicalPearls.map((pearl, index) => (
                  <li key={index} className="flex items-start text-sm sm:text-base">
                    <span className="text-amber-700 mr-3 flex-shrink-0 font-bold text-lg">★</span>
                    <span className="text-slate-800 font-medium leading-relaxed">{pearl}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* References */}
          {slide.references && slide.references.length > 0 && (
            <div className="mt-6 border-t pt-6">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">References:</h3>
              <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                {slide.references.map((ref, index) => (
                  <li key={index}>{ref}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>

      {/* Navigation Footer */}
      <footer className="sticky bottom-0 bg-white border-t shadow-lg z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={goToPreviousSlide}
              disabled={currentSlide === 0}
              className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all ${
                currentSlide === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              }`}
            >
              <ChevronLeft size={20} />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="text-center flex-1">
              <div className="text-sm sm:text-base font-semibold text-gray-900">
                {currentSlide + 1} / {slides.length}
              </div>
              <div className="text-xs text-gray-500 hidden sm:block">
                {Math.round(progress)}% Complete
              </div>
            </div>

            <button
              onClick={goToNextSlide}
              disabled={currentSlide === slides.length - 1}
              className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all ${
                currentSlide === slides.length - 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              }`}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
