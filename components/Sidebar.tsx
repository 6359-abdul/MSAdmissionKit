
import React, { useMemo } from 'react';
import { PageInfo } from '../types';
import { BROCHURE_PAGES } from '../constants';

interface SidebarProps {
  currentIndex: number;
  onPageSelect: (index: number) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentIndex, onPageSelect, isOpen, onToggle }) => {
  const categories = useMemo(() => {
    const cats = Array.from(new Set(BROCHURE_PAGES.map(p => p.category)));
    return cats;
  }, []);

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 w-56 text-white transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 border-r border-indigo-900/50 flex flex-col
      `}
    >
      <div className="px-4 py-2 border-b border-indigo-800/40" style={{ background: 'linear-gradient(135deg, #21b158ff 0%, #182d66ff 80%)' }}>
        <h1 className="text-base font-bold tracking-tight text-white/200 mt-0.5 ">Admission Kit 2026</h1>
        <p className="text-[10px] text-white/100 mt-0.5 uppercase font-semibold">MS Education Academy</p>
      </div>

      <nav className="flex-1 overflow-y-auto custom-scrollbar" style={{ background: 'linear-gradient(180deg, #420d6eff 0%, #0f3f17ff 80%)' }}>
        {categories.length > 0 && categories[0] !== undefined ? (
          categories.map((cat) => (
            <div key={cat || 'uncategorized'} className="mb-4">
              <h2 className="px-6 py-3 text-[10px] font-bold text-white/60 uppercase tracking-widest" style={{ backgroundColor: 'rgba(72, 64, 150, 0.6)' }}>
                {cat}
              </h2>
              <ul className="mt-1">
                {BROCHURE_PAGES.filter(p => p.category === cat).map((page) => {
                  const pageIdx = BROCHURE_PAGES.findIndex(bp => bp.id === page.id);
                  const isActive = currentIndex === pageIdx;
                  return (
                    <li key={page.id}>
                      <button
                        onClick={() => {
                          onPageSelect(pageIdx);
                          if (window.innerWidth < 1024) onToggle();
                        }}
                        className={`
                          w-full text-left px-4 py-2 text-xs transition-all duration-200 border-l-4 flex items-center gap-2
                          ${isActive
                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-400 font-semibold'
                            : 'text-white/200 border-transparent hover:bg-indigo-800/30 hover:text-white'
                          }
                        `}
                      >
                        <span className="opacity-40 text-[10px] min-w-[1.5rem]">
                          {pageIdx + 1 < 10 ? `0${pageIdx + 1}` : pageIdx + 1}
                        </span>
                        <span className="truncate">{page.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        ) : (
          <ul className="py-2">
            {BROCHURE_PAGES.map((page, index) => {
              const isActive = currentIndex === index;
              return (
                <li key={page.id}>
                  <button
                    onClick={() => {
                      onPageSelect(index);
                      if (window.innerWidth < 1024) onToggle();
                    }}
                    className={`
                       w-full text-left px-4 py-2 text-xs transition-all duration-200 border-l-4 flex items-center gap-2
                       ${isActive
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-400 font-semibold'
                        : 'text-white/80 border-transparent hover:bg-indigo-800/30 hover:text-white'
                      }
                     `}
                  >
                    <span className="opacity-40 text-[10px] min-w-[1.5rem]">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                    <span className="truncate">{page.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </nav>

      <div className="p-4 text-center text-[10px] text-white/50 border-t border-indigo-800/40" style={{ background: 'linear-gradient(135deg, #0d0a2e 0%, #0a1e38 100%)' }}>
        &copy; 2026 MS Education Academy. All Rights Reserved.
      </div>
    </aside>
  );
};

export default Sidebar;
