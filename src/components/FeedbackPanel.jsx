import React from 'react';
import { Award, Flame, RotateCcw } from 'lucide-react';

export default function FeedbackPanel({ score, total, breakdown, onReset }) {
  const percentage = total ? Math.round((score / total) * 100) : 0;

  return (
    <div className="bg-white border rounded-2xl p-6 w-full">
      <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl ${percentage >= 70 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
            <Award size={22} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Your Performance</h3>
            <p className="text-sm text-gray-600">{score} / {total} correct • {percentage}%</p>
          </div>
        </div>
        <button onClick={onReset} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm bg-white hover:bg-gray-50">
          <RotateCcw size={16} /> Try again
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {breakdown.map((b, idx) => (
          <div key={idx} className="border rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{b.skill}</p>
                <p className="text-base font-medium text-gray-900">{b.correct} / {b.total} correct</p>
              </div>
              <div className="text-amber-600"><Flame size={18} /></div>
            </div>
            <div className="mt-3 w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${Math.round((b.correct / b.total) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-gray-600">
        Tip: Focus on the skills with lower accuracy first. Consistent practice improves recall and confidence.
      </p>
    </div>
  );
}
