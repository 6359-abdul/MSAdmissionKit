
import * as React from 'react';
import { useState, useEffect } from 'react';
import { PageInfo } from '../types';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface ViewerProps {
  currentPage: PageInfo;
  onNext: () => void;
  onPrev: () => void;
  canNext: boolean;
  canPrev: boolean;
  total: number;
  currentNumber: number;
}

const Viewer: React.FC<ViewerProps> = ({
  currentPage,
  onNext,
  onPrev,
  canNext,
  canPrev,
  total,
  currentNumber
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [loading, setLoading] = useState(true);

  // Reset loading and zoom state when page changes
  useEffect(() => {
    setLoading(true);
    setIsZoomed(false);
  }, [currentPage.id]);

  return (
    <main className="flex-1 flex flex-col relative bg-slate-100 overflow-hidden">
      {/* Header Bar */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-10 shadow-sm relative">
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <h2 className="text-sm font-bold text-gray-800">{currentPage.title}</h2>
            <p className="text-[10px] text-gray-400 font-medium">{currentPage.category}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-4">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1 text-xs font-bold text-gray-600">
            {currentNumber} <span className="mx-1 text-gray-400">/</span> {total}
          </div>

          <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
              title={isZoomed ? "Actual Size" : "Zoom Fit"}
            >
              {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-slate-200 flex items-center justify-center p-0 custom-scrollbar relative">
        <div className={`relative transition-all duration-300 ${isZoomed ? 'w-full' : 'h-full w-full flex items-center justify-center'}`}>
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 animate-pulse z-0 rounded-lg">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs text-blue-600 font-bold mt-4 tracking-widest uppercase">Preparing Page...</p>
              </div>
            </div>
          )}

          <img
            src={currentPage.imageUrl}
            alt={currentPage.title}
            onLoad={() => setLoading(false)}
            className={`
              block shadow-2xl bg-white border border-gray-300 transition-all duration-500 ease-in-out
              ${loading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
              ${isZoomed ? 'w-full' : 'max-h-full max-w-full object-contain'}
            `}
          />
        </div>
      </div>

      {/* Floating Navigation Controls */}
      <button
        onClick={onPrev}
        disabled={!canPrev}
        className={`
          absolute left-4 top-1/2 -translate-y-1/2 z-20
          p-3 rounded-full shadow-xl transition-all duration-200
          ${canPrev
            ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-110 active:scale-95'
            : 'bg-white/50 text-gray-300 cursor-not-allowed hidden'}
        `}
      >
        <ChevronLeft size={32} />
      </button>

      <button
        onClick={onNext}
        disabled={!canNext}
        className={`
          absolute right-4 top-1/2 -translate-y-1/2 z-20
          p-3 rounded-full shadow-xl transition-all duration-200
          ${canNext
            ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-110 active:scale-95'
            : 'bg-white/50 text-gray-300 cursor-not-allowed hidden'}
        `}
      >
        <ChevronRight size={32} />
      </button>

      {/* Progress Bar */}
      <div className="h-1 w-full bg-gray-200 overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${(currentNumber / total) * 100}%` }}
        ></div>
      </div>
    </main>
  );
};

export default Viewer;
