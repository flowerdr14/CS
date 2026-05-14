import React from 'react';
import { Search, UserPlus, UserMinus } from 'lucide-react';

interface TopBarProps {
  onAddPatient: () => void;
  onDeletePatient: () => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  selectedName: string;
}

export default function TopBar({ onAddPatient, onDeletePatient, searchTerm, onSearchChange, onFocus, onBlur, selectedName }: TopBarProps) {
  return (
    <header id="top-bar" className="bg-white border-b border-slate-200 px-6 h-16 flex items-center justify-between shadow-sm z-10 shrink-0">
      <div className="flex items-center gap-4 flex-1">
        <div className="group w-full max-w-sm flex items-center h-10 bg-white border border-slate-200 rounded-sm px-3 focus-within:border-emr-primary focus-within:ring-2 focus-within:ring-emr-primary/20 transition-all">
          <Search size={18} className="text-slate-400 group-focus-within:text-emr-primary transition-colors shrink-0" />
          <input 
            type="text" 
            className="w-full bg-transparent border-none outline-none pl-2 text-sm text-slate-700 h-full" 
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder="환자검색"
          />
        </div>
        
        {selectedName && (
          <div className="flex items-center gap-2 px-4 py-1.5 bg-emr-accent/30 rounded-full border border-emr-primary/20">
            <span className="text-[10px] font-bold text-emr-secondary uppercase tracking-widest">Select</span>
            <span className="text-sm font-bold text-slate-700">{selectedName}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={onAddPatient}
          className="btn-emr h-10 px-4 bg-white border !border-slate-200 !text-slate-700 hover:!bg-slate-50 font-bold"
        >
          <UserPlus size={18} className="text-emr-primary" />
          신규 등록
        </button>
        <button 
          onClick={onDeletePatient}
          className="btn-emr h-10 px-4 bg-white border !border-red-100 !text-slate-700 hover:!bg-red-50 font-bold"
        >
          <UserMinus size={18} className="text-red-400" />
          환자 삭제
        </button>
      </div>
    </header>
  );
}
