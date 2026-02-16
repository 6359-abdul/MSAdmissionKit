
import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import Viewer from './components/Viewer';
import Sidebar from './components/Sidebar';
import { BROCHURE_PAGES } from './constants';

const App: React.FC = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default closed on mobile, open logic handled in effect or default? Let's default false for mobile-first or check width. Actually let's default false and let effect handle it or just default true for desktop.
  // Better to default false to be safe on mobile and add an effect to open on desktop

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsSidebarOpen(true);
    }
  }, []);
  
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
      <Sidebar
        currentIndex={currentPageIndex}
        onPageSelect={setCurrentPageIndex}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Sidebar Toggle - Only visible on small screens when sidebar is closed */}
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