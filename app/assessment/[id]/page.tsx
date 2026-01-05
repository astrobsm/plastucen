'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { assessments } from '@/lib/assessments';
import { ArrowLeft, CheckCircle, XCircle, Award, RotateCcw } from 'lucide-react';

export default function AssessmentTestPage() {
  const params = useParams();
  const router = useRouter();
  const assessmentId = params.id as string;
  
  const assessment = assessments.find(a => a.id === assessmentId);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime] = useState(Date.now());
  const [endTime, setEndTime] = useState<number | null>(null);

  useEffect(() => {
    if (assessment) {
      setSelectedAnswers(new Array(assessment.questions.length).fill(null));
    }
  }, [assessment]);

  if (!assessment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-orange-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Assessment Not Found</h1>
          <button
            onClick={() => router.back()}
            className="text-orange-600 hover:text-orange-700 font-semibold"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const question = assessment.questions[currentQuestion];
  const hasAnswered = selectedAnswers[currentQuestion] !== null;
  const isCorrect = hasAnswered && selectedAnswers[currentQuestion] === question.correctAnswer;

  const handleSelectAnswer = (optionIndex: number) => {
    if (!showExplanation) {
      const newAnswers = [...selectedAnswers];
      newAnswers[currentQuestion] = optionIndex;
      setSelectedAnswers(newAnswers);
      setShowExplanation(true);
    }
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentQuestion < assessment.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setEndTime(Date.now());
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    setShowExplanation(false);
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(assessment.questions.length).fill(null));
    setShowExplanation(false);
    setIsComplete(false);
    setEndTime(null);
  };

  // Results calculation
  const answeredCount = selectedAnswers.filter(a => a !== null).length;
  const correctCount = selectedAnswers.filter((a, idx) => 
    a !== null && a === assessment.questions[idx].correctAnswer
  ).length;
  const score = answeredCount > 0 ? Math.round((correctCount / assessment.questions.length) * 100) : 0;
  const passed = score >= assessment.passingScore;
  const timeTaken = endTime ? Math.round((endTime - startTime) / 1000 / 60) : 0;

  // Results View
  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 animate-fade-in">
            {/* Header */}
            <div className="text-center mb-8">
              <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${
                passed ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <Award size={48} className={passed ? 'text-green-600' : 'text-red-600'} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {passed ? 'Congratulations! 🎉' : 'Assessment Complete'}
              </h1>
              <p className="text-lg text-gray-600">
                {assessment.title}
              </p>
            </div>

            {/* Score Card */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className={`text-4xl font-bold mb-2 ${
                    passed ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {score}%
                  </div>
                  <div className="text-sm text-gray-600">Your Score</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {correctCount}/{assessment.questions.length}
                  </div>
                  <div className="text-sm text-gray-600">Correct Answers</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {timeTaken}
                  </div>
                  <div className="text-sm text-gray-600">Minutes</div>
                </div>
              </div>
            </div>

            {/* Status Message */}
            <div className={`p-4 rounded-lg mb-8 ${
              passed ? 'bg-green-50 border-l-4 border-green-600' : 'bg-yellow-50 border-l-4 border-yellow-600'
            }`}>
              <p className={`font-semibold ${passed ? 'text-green-900' : 'text-yellow-900'}`}>
                {passed 
                  ? `You passed! Score: ${score}% (Passing: ${assessment.passingScore}%)`
                  : `Score: ${score}% (Passing: ${assessment.passingScore}% required)`
                }
              </p>
            </div>

            {/* Question Review */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Question Review</h3>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {assessment.questions.map((_, idx) => {
                  const userAnswer = selectedAnswers[idx];
                  const isCorrect = userAnswer === assessment.questions[idx].correctAnswer;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentQuestion(idx);
                        setIsComplete(false);
                        setShowExplanation(true);
                      }}
                      className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${
                        isCorrect 
                          ? 'bg-green-500 text-white hover:bg-green-600' 
                          : 'bg-red-500 text-white hover:bg-red-600'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleRestart}
                className="flex-1 flex items-center justify-center space-x-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-all shadow-lg"
              >
                <RotateCcw size={20} />
                <span>Retake Assessment</span>
              </button>
              <button
                onClick={() => router.push('/assessment')}
                className="flex-1 flex items-center justify-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all"
              >
                <ArrowLeft size={20} />
                <span>Back to Assessments</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Test View
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-semibold text-sm"
            >
              <ArrowLeft size={16} />
              <span>Exit Assessment</span>
            </button>
            <div className="text-sm text-gray-600">
              {answeredCount} / {assessment.questions.length} Answered
            </div>
          </div>
          
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
            {assessment.title}
          </h1>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-orange-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / assessment.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </header>

      {/* Question Content */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 animate-fade-in">
          {/* Question Header */}
          <div className="mb-6 pb-6 border-b-2 border-orange-100">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-semibold text-orange-600">
                Question {currentQuestion + 1} of {assessment.questions.length}
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {question.difficulty.toUpperCase()}
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {question.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestion] === index;
              const isCorrectOption = index === question.correctAnswer;
              const showResult = showExplanation;
              
              let optionClass = 'bg-gray-50 hover:bg-gray-100 border-gray-200';
              if (showResult) {
                if (isCorrectOption) {
                  optionClass = 'bg-green-100 border-green-500 text-green-900';
                } else if (isSelected && !isCorrectOption) {
                  optionClass = 'bg-red-100 border-red-500 text-red-900';
                }
              } else if (isSelected) {
                optionClass = 'bg-orange-100 border-orange-500';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={showExplanation}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${optionClass} ${
                    !showExplanation ? 'hover:shadow-md' : ''
                  } ${showExplanation ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center mr-3 font-bold text-sm">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div className="flex-1">
                      <p className="text-base sm:text-lg font-medium">{option}</p>
                    </div>
                    {showResult && isCorrectOption && (
                      <CheckCircle size={24} className="text-green-600 ml-2 flex-shrink-0" />
                    )}
                    {showResult && isSelected && !isCorrectOption && (
                      <XCircle size={24} className="text-red-600 ml-2 flex-shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className={`p-6 rounded-lg mb-6 animate-slide-up ${
              isCorrect ? 'bg-green-50 border-l-4 border-green-600' : 'bg-red-50 border-l-4 border-red-600'
            }`}>
              <h3 className={`text-lg font-bold mb-3 flex items-center ${
                isCorrect ? 'text-green-900' : 'text-red-900'
              }`}>
                {isCorrect ? (
                  <>
                    <CheckCircle className="mr-2" size={24} />
                    Correct!
                  </>
                ) : (
                  <>
                    <XCircle className="mr-2" size={24} />
                    Incorrect
                  </>
                )}
              </h3>
              <div className={`text-base leading-relaxed ${
                isCorrect ? 'text-green-900' : 'text-red-900'
              }`}>
                <p className="mb-2">
                  <strong>Correct Answer:</strong> {String.fromCharCode(65 + question.correctAnswer)}. {question.options[question.correctAnswer]}
                </p>
                <p><strong>Explanation:</strong></p>
                <p className="mt-2">{question.explanation}</p>
              </div>
              {question.references && question.references.length > 0 && (
                <div className="mt-4 pt-4 border-t border-green-200">
                  <p className="text-sm font-semibold mb-1">References:</p>
                  <ul className="text-sm space-y-1">
                    {question.references.map((ref, idx) => (
                      <li key={idx}>• {ref}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Navigation Footer */}
      <footer className="sticky bottom-0 bg-white border-t shadow-lg z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                currentQuestion === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-orange-600 text-white hover:bg-orange-700 shadow-lg'
              }`}
            >
              Previous
            </button>

            <div className="text-center">
              <div className="text-sm font-semibold text-gray-900">
                {currentQuestion + 1} / {assessment.questions.length}
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={!hasAnswered}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                !hasAnswered
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : currentQuestion === assessment.questions.length - 1
                  ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg'
                  : 'bg-orange-600 text-white hover:bg-orange-700 shadow-lg'
              }`}
            >
              {currentQuestion === assessment.questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
