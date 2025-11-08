import React from 'react';
import { Brain, FileText } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-600 text-white">
            <Brain size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">SkillPulse</h1>
            <p className="text-xs text-gray-500">Generate MCQs from your resume and practice</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-gray-500">
          <FileText size={18} />
          <span className="text-sm">Resume → Skills → Questions → Feedback</span>
        </div>
      </div>
    </header>
  );
}
