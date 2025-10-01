import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, GraduationCap } from 'lucide-react';
import { Grade } from '../types';

interface GradeSelectorProps {
  grade: Grade;
  onGradeChange: (grade: Grade) => void;
  compact?: boolean;
}

const grades: Grade[] = [3, 4, 5, 6, 7];

const GradeSelector: React.FC<GradeSelectorProps> = ({
  grade,
  onGradeChange,
  compact = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 ${
          compact 
            ? 'p-2 rounded-lg hover:bg-gray-100' 
            : 'bg-white border border-gray-300 rounded-xl px-4 py-3 hover:bg-gray-50'
        } transition-colors duration-200`}
        {...props}
      >
        {compact ? (
          <GraduationCap className="w-5 h-5 text-gray-600" />
        ) : (
          <>
            <GraduationCap className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-800">Grade {grade}</span>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-50 min-w-[120px]">
          {grades.map((gradeOption) => (
            <button
              key={gradeOption}
              onClick={() => {
                onGradeChange(gradeOption);
                setIsOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl transition-colors ${
                grade === gradeOption ? 'bg-orange-50 text-orange-600' : 'text-gray-800'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span className="font-medium">Grade {gradeOption}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GradeSelector;