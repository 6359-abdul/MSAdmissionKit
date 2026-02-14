
import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import Viewer from './components/Viewer';
import { BROCHURE_PAGES } from './constants';

const App: React.FC = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

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
  );
};

export default App;
