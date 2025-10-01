import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ToastContainer from './components/ToastContainer';
import Home from './pages/Home';
import WordHuntGame from './pages/WordHuntGame';
import ReadAloudGame from './pages/ReadAloudGame';
import FillBlankGame from './pages/FillBlankGame';
import WordBuilderGame from './pages/WordBuilderGame';
import Dashboard from './pages/Dashboard';
import { useLanguage } from './hooks/useLanguage';
import { useGrade } from './hooks/useGrade';
import { useProgress } from './hooks/useProgress';
import { useToast } from './hooks/useToast';
import { useTutorial } from './hooks/useTutorial';
import './App.css';

function App() {
  const { language, setLanguage } = useLanguage();
  const { grade, setGrade } = useGrade();
  const { resetProgress } = useProgress();
  const { toasts, showToast, removeToast } = useToast();
  const { startTutorial } = useTutorial();

  const handleResetProgress = () => {
    resetProgress();
    showToast('Progress reset successfully', 'success');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header
          language={language}
          onLanguageChange={setLanguage}
          grade={grade}
          onGradeChange={setGrade}
          onResetProgress={handleResetProgress}
          onStartTutorial={startTutorial}
        />
        
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  language={language}
                  onLanguageChange={setLanguage}
                  grade={grade}
                  onGradeChange={setGrade}
                  onResetProgress={handleResetProgress}
                  onStartTutorial={startTutorial}
                />
              }
            />
            <Route
              path="/game/word-hunt"
              element={<WordHuntGame language={language} grade={grade} showToast={showToast} />}
            />
            <Route
              path="/game/read-aloud"
              element={<ReadAloudGame language={language} grade={grade} showToast={showToast} />}
            />
            <Route
              path="/game/fill-blank"
              element={<FillBlankGame language={language} grade={grade} showToast={showToast} />}
            />
            <Route
              path="/game/word-builder"
              element={<WordBuilderGame language={language} grade={grade} showToast={showToast} />}
            />
            <Route
              path="/dashboard"
              element={<Dashboard language={language} grade={grade} showToast={showToast} />}
            />
          </Routes>
        </main>

        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    </Router>
  );
}

export default App;