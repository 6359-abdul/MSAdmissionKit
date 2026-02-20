
import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import Viewer from './components/Viewer';
import Sidebar from './components/Sidebar';
import { BROCHURE_PAGES } from './constants';

const App: React.FC = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsSidebarOpen(true);
    }
  }, []);

  const handleEnterFullscreen = () => {
    document.documentElement.requestFullscreen().catch(() => { });
    setShowOverlay(false);
  };

  const handleNext = useCallback(() => {
    if (currentPageIndex < BROCHURE_PAGES.length - 1) {
      setCurrentPageIndex(prev => prev + 1);
    }
  }, [currentPageIndex]);

  const handlePrev = useCallback(() => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
    }
  }, [currentPageIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') handleNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <div className="flex h-screen w-screen bg-slate-100 overflow-hidden">
      {/* Fullscreen Entry Overlay */}
      {showOverlay && (
        <div
          className="fixed inset-0 z-[100] bg-slate-900/95 flex flex-col items-center justify-center cursor-pointer"
          onClick={handleEnterFullscreen}
        >
          <h1 className="text-3xl font-bold text-white mb-2">Admission Kit 2026</h1>
          <p className="text-slate-400 text-sm mb-8">MS Education Academy</p>
          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center shadow-2xl hover:bg-blue-500 hover:scale-110 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
          </div>
          <p className="text-white text-sm mt-6 animate-pulse">Tap to View</p>
        </div>
      )}

      <Sidebar
        currentIndex={currentPageIndex}
        onPageSelect={setCurrentPageIndex}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute top-4 left-4 z-30 p-2 bg-slate-900 text-white rounded-md shadow-lg lg:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        <Viewer
          currentPage={BROCHURE_PAGES[currentPageIndex]}
          onNext={handleNext}
          onPrev={handlePrev}
          canNext={currentPageIndex < BROCHURE_PAGES.length - 1}
          canPrev={currentPageIndex > 0}
          total={BROCHURE_PAGES.length}
          currentNumber={currentPageIndex + 1}
        />
      </div>
    </div>
  );
};

export default App;