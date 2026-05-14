import React from 'react';
import { Search, UserPlus, UserMinus } from 'lucide-react';

interface TopBarProps {
  onAddPatient: () => void;
  onDeletePatient: () => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedName: string;
}

export default function TopBar({ onAddPatient, onDeletePatient, searchTerm, onSearchChange, selectedName }: TopBarProps) {
  return (
    <header id="top-bar" className="bg-white border-b border-slate-200 px-6 h-16 flex items-center justify-between shadow-sm z-10 shrink-0">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative group w-full max-w-sm">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emr-primary transition-colors" />
          <input 
            type="text" 
            className="input-emr pl-10 h-10 border-slate-200" 
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="환자 검색 (이름, 차트번호)"
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
