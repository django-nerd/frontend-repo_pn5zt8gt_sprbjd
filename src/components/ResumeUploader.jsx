import React, { useRef, useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';

export default function ResumeUploader({ onUpload }) {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    onUpload(file);
  };

  const openPicker = () => inputRef.current?.click();

  return (
    <div className="w-full">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files?.[0];
          if (file) { setFileName(file.name); onUpload(file); }
        }}
        className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-colors ${dragOver ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-white'}`}
      >
        <div className="mx-auto w-14 h-14 rounded-full bg-indigo-600/10 text-indigo-600 flex items-center justify-center">
          <Upload />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">Upload your resume</h3>
        <p className="mt-1 text-sm text-gray-500">Drag & drop a PDF or DOCX file, or click to browse</p>

        <div className="mt-5 flex items-center justify-center gap-3">
          <button onClick={openPicker} className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            Choose File
          </button>
          {fileName && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm">
              <FileText size={16} />
              <span className="truncate max-w-[180px]">{fileName}</span>
              <button onClick={() => { setFileName(''); if (inputRef.current) inputRef.current.value = ''; }} className="text-gray-500 hover:text-gray-700">
                <X size={14} />
              </button>
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          className="hidden"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
