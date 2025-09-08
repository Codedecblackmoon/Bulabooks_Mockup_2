import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import ToastContainer from './components/ToastContainer';
import Home from './pages/Home';
import WordHuntGame from './pages/WordHuntGame';
import ReadAloudGame from './pages/ReadAloudGame';
import FillBlankGame from './pages/FillBlankGame';
import WordBuilderGame from './pages/WordBuilderGame';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login'
import { useLanguage } from './hooks/useLanguage';
import { useProgress } from './hooks/useProgress';
import { useToast } from './hooks/useToast';
import './App.css';

function App() {
  const { language, setLanguage } = useLanguage();
  const { resetProgress } = useProgress();
  const { toasts, showToast, removeToast } = useToast();

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
          onResetProgress={handleResetProgress}
        />
        
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route path="/login" element={<Login />} />

            <Route
              path="/home"
              element={
                <Home
                  language={language}
                  onLanguageChange={setLanguage}
                  onResetProgress={handleResetProgress}
                />
              }
            />
            <Route
              path="/game/word-hunt"
              element={<WordHuntGame language={language} showToast={showToast} />}
            />
            <Route
              path="/game/read-aloud"
              element={<ReadAloudGame language={language} showToast={showToast} />}
            />
            <Route
              path="/game/fill-blank"
              element={<FillBlankGame language={language} showToast={showToast} />}
            />
            <Route
              path="/game/word-builder"
              element={<WordBuilderGame language={language} showToast={showToast} />}
            />
            <Route
              path="/dashboard"
              element={<Dashboard language={language} showToast={showToast} />}
            />
          </Routes>
        </main>

        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    </Router>
  );
}

export default App;