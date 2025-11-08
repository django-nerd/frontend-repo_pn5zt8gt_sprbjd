import React from 'react';
import { CheckCircle2, Circle, ChevronLeft, ChevronRight } from 'lucide-react';

export default function QuestionPanel({ questions, currentIndex, selected, onSelect, onPrev, onNext, onSubmit }) {
  const q = questions[currentIndex];
  const progress = questions.length ? Math.round(((currentIndex + 1) / questions.length) * 100) : 0;

  return (
    <div className="w-full">
      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Question {currentIndex + 1} of {questions.length}</span>
          <span className="text-sm font-medium text-indigo-700">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div className="bg-indigo-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white border rounded-2xl p-5 sm:p-6">
        <p className="text-gray-900 text-base sm:text-lg font-medium">{q?.question}</p>
        <div className="mt-4 grid gap-3">
          {q?.options?.map((opt, idx) => {
            const isSelected = selected[currentIndex] === idx;
            return (
              <button
                key={idx}
                onClick={() => onSelect(currentIndex, idx)}
                className={`w-full text-left border rounded-xl px-4 py-3 transition-colors flex items-center gap-3 ${isSelected ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300 bg-white hover:bg-gray-50'}`}
              >
                {isSelected ? <CheckCircle2 className="text-indigo-600" size={18} /> : <Circle className="text-gray-400" size={18} />}
                <span className="text-gray-800">{opt}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <button onClick={onPrev} disabled={currentIndex === 0} className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border text-sm bg-white hover:bg-gray-50 disabled:opacity-50">
            <ChevronLeft size={16} /> Prev
          </button>
          {currentIndex < questions.length - 1 ? (
            <button onClick={onNext} className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700">
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <button onClick={onSubmit} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm hover:bg-emerald-700">
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
