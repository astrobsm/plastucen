'use client';

import { useParams, useRouter } from 'next/navigation';
import { modules } from '@/lib/content';
import SlideViewer from '@/components/SlideViewer';
import { ArrowLeft } from 'lucide-react';

export default function PracticeModulePage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.id as string;
  
  const currentModule = modules.find(m => m.id === moduleId);

  if (!currentModule) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-green-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Module Not Found</h1>
          <button
            onClick={() => router.back()}
            className="text-green-600 hover:text-green-700 font-semibold"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white border-b sticky top-0 z-50 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-semibold text-sm"
          >
            <ArrowLeft size={16} />
            <span>Back to Practice Modules</span>
          </button>
        </div>
      </div>
      <SlideViewer slides={currentModule.slides} moduleTitle={currentModule.title} />
    </div>
  );
}
