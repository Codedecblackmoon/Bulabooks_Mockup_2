import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/ui/Header';
import { Toast } from './components/ui/Toast';
import { Home } from './pages/Home';
import { WordHunt } from './pages/games/WordHunt';
import { ReadAloud } from './pages/games/ReadAloud';
import { FillBlank } from './pages/games/FillBlank';
import { WordBuilder } from './pages/games/WordBuilder';
import { Dashboard } from './pages/Dashboard';
import { useLanguage } from './hooks/useLanguage';
import { useProgress } from './hooks/useProgress';

function App() {
  const { language, setLanguage } = useLanguage();
  const { resetProgress } = useProgress();
  const [toast, setToast] = useState<string | null>(null);

  const handleResetProgress = () => {
    resetProgress();
    setToast('Progress reset successfully');
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={
            <>
              <Header
                language={language}
                onLanguageChange={setLanguage}
                onResetProgress={handleResetProgress}
                onNavigateDashboard={() => window.location.href = '/dashboard'}
              />
              <Home />
            </>
          } />
          <Route path="/game/word-hunt" element={<WordHunt />} />
          <Route path="/game/read-aloud" element={<ReadAloud />} />
          <Route path="/game/fill-blank" element={<FillBlank />} />
          <Route path="/game/word-builder" element={<WordBuilder />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        {toast && (
          <Toast
            message={toast}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;