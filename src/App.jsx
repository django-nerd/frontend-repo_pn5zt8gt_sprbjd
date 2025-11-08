import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import ResumeUploader from './components/ResumeUploader';
import QuestionPanel from './components/QuestionPanel';
import FeedbackPanel from './components/FeedbackPanel';

// Helper to fake skill extraction and MCQ generation while backend is not yet wired.
function deriveSkillsFromFilename(file) {
  if (!file) return [];
  const name = file.name.toLowerCase();
  const skills = [];
  if (name.includes('react')) skills.push('React');
  if (name.includes('python')) skills.push('Python');
  if (name.includes('node')) skills.push('Node.js');
  if (name.includes('java')) skills.push('Java');
  if (skills.length === 0) skills.push('General Software');
  return skills;
}

function generateQuestions(skills) {
  const bank = {
    'React': [
      { q: 'Which hook is used to manage local component state?', options: ['useEffect', 'useState', 'useMemo', 'useReducer'], a: 1 },
      { q: 'What prop is required by a list when rendering with map?', options: ['index', 'key', 'id', 'value'], a: 1 },
    ],
    'Python': [
      { q: 'Which data structure is immutable?', options: ['List', 'Set', 'Tuple', 'Dictionary'], a: 2 },
      { q: 'What keyword defines a function?', options: ['func', 'def', 'lambda', 'fn'], a: 1 },
    ],
    'Node.js': [
      { q: 'Which module handles file system operations?', options: ['http', 'path', 'fs', 'os'], a: 2 },
      { q: 'What does npm stand for?', options: ['Node Package Manager', 'New Project Manager', 'Node Program Module', 'Non-Project Module'], a: 0 },
    ],
    'Java': [
      { q: 'Which keyword is used to inherit a class?', options: ['this', 'super', 'extends', 'implements'], a: 2 },
      { q: 'Which collection prevents duplicates?', options: ['List', 'Set', 'Queue', 'Map'], a: 1 },
    ],
    'General Software': [
      { q: 'What does CI stand for?', options: ['Continuous Integration', 'Code Inspection', 'Compiled Interface', 'Central Integration'], a: 0 },
      { q: 'Git command to create a new branch?', options: ['git branch new', 'git checkout -b', 'git switch create', 'git init branch'], a: 1 },
    ]
  };

  const questions = [];
  skills.forEach(skill => {
    (bank[skill] || bank['General Software']).forEach(item => {
      questions.push({
        skill,
        question: item.q,
        options: item.options,
        answer: item.a,
      });
    });
  });

  return questions.slice(0, 10);
}

export default function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleUpload = (file) => {
    setResumeFile(file);
    const s = deriveSkillsFromFilename(file);
    setSkills(s);
    setQuestions(generateQuestions(s));
    setCurrent(0);
    setSelected({});
    setSubmitted(false);
  };

  const onSelect = (qi, optIdx) => setSelected(prev => ({ ...prev, [qi]: optIdx }));
  const onPrev = () => setCurrent(c => Math.max(0, c - 1));
  const onNext = () => setCurrent(c => Math.min(questions.length - 1, c + 1));

  const result = useMemo(() => {
    let correct = 0;
    const bySkill = {};
    questions.forEach((q, i) => {
      const isCorrect = selected[i] === q.answer;
      if (isCorrect) correct += 1;
      if (!bySkill[q.skill]) bySkill[q.skill] = { correct: 0, total: 0 };
      bySkill[q.skill].total += 1;
      if (isCorrect) bySkill[q.skill].correct += 1;
    });
    const breakdown = Object.entries(bySkill).map(([skill, data]) => ({ skill, ...data }));
    return { correct, total: questions.length, breakdown };
  }, [questions, selected]);

  const onSubmit = () => setSubmitted(true);
  const onReset = () => {
    setResumeFile(null);
    setSkills([]);
    setQuestions([]);
    setCurrent(0);
    setSelected({});
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8 grid gap-6">
        {/* Intro */}
        <section className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Generate skill-based MCQs from your resume</h2>
          <p className="mt-2 text-gray-600">Upload your resume and practice tailored questions. Get instant feedback by skill area.</p>
        </section>

        {/* Uploader */}
        <section>
          <ResumeUploader onUpload={handleUpload} />
        </section>

        {/* Detected skills */}
        {skills.length > 0 && (
          <section className="bg-white border rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-gray-900">Detected Skills</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="px-3 py-1 text-sm rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">{s}</span>
              ))}
            </div>
          </section>
        )}

        {/* Questions or Feedback */}
        {questions.length > 0 && !submitted && (
          <section>
            <QuestionPanel
              questions={questions}
              currentIndex={current}
              selected={selected}
              onSelect={onSelect}
              onPrev={onPrev}
              onNext={onNext}
              onSubmit={onSubmit}
            />
          </section>
        )}

        {submitted && (
          <section>
            <FeedbackPanel
              score={result.correct}
              total={result.total}
              breakdown={result.breakdown}
              onReset={onReset}
            />
          </section>
        )}

        {/* Empty state */}
        {questions.length === 0 && !submitted && (
          <section className="text-center text-gray-500 text-sm">
            Upload a resume file named with skills like "john-react-python-resume.pdf" to see skill-aware MCQs.
          </section>
        )}
      </main>

      <footer className="py-10 text-center text-xs text-gray-500">
        Built with love to help you practice smarter.
      </footer>
    </div>
  );
}
