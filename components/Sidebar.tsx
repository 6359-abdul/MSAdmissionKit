
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
        fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 border-r border-slate-700 flex flex-col
      `}
    >
      <div className="p-6 bg-slate-800 border-b border-slate-700">
        <h1 className="text-xl font-bold tracking-tight text-white">Admission Kit 2026</h1>
        <p className="text-xs text-slate-400 mt-1 uppercase font-semibold">MS Education Academy</p>
      </div>

      <nav className="flex-1 overflow-y-auto custom-scrollbar bg-slate-900">
        {categories.length > 0 && categories[0] !== undefined ? (
          categories.map((cat) => (
            <div key={cat || 'uncategorized'} className="mb-4">
              <h2 className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-950/50">
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
                          w-full text-left px-6 py-3 text-sm transition-all duration-200 border-l-4 flex items-center gap-3
                          ${isActive
                            ? 'bg-violet-200/20 text-violet-400 border-violet-500 font-semibold'
                            : 'text-slate-400 border-transparent hover:bg-slate-800 hover:text-white'
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
                       w-full text-left px-6 py-3 text-sm transition-all duration-200 border-l-4 flex items-center gap-3
                       ${isActive
                        ? 'bg-white-600/20 text-white-400 border-white-500 font-semibold'
                        : 'text-slate-400 border-transparent hover:bg-slate-800 hover:text-white'
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

      <div className="p-4 bg-slate-950 text-center text-[10px] text-slate-500 border-t border-slate-800">
        &copy; 2026 MS Education Academy. All Rights Reserved.
      </div>
    </aside>
  );
};

export default Sidebar;
