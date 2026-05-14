import React from 'react';
import { 
  FileText, 
  Ambulance, 
  Stethoscope, 
  Scissors, 
  Users, 
  Home, 
  FlaskConical, 
  File, 
  Hospital, 
  Pill,
  Plus,
  Minus,
  Save,
  Edit3
} from 'lucide-react';
import { MenuId } from '../types';

interface SidebarProps {
  activeMenu: MenuId;
  onMenuChange: (id: MenuId) => void;
  onSave?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
}

const menuItems = [
  { id: 'ecardex', label: 'e-Cardex (간호)', icon: FileText },
  { id: 'emergency', label: '응급기록', icon: Ambulance },
  { id: 'progress', label: '입원경과', icon: Stethoscope },
  { id: 'operation', label: '수술처치', icon: Scissors },
  { id: 'consultation', label: '협진기록', icon: Users },
  { id: 'discharge', label: '퇴원요약', icon: Home },
  { id: 'lab', label: '검사결과', icon: FlaskConical },
  { id: 'other', label: '기타기록', icon: File },
  { id: 'other_hospital', label: '타병원기록', icon: Hospital },
  { id: 'prescription', label: '처방기록', icon: Pill },
] as const;

export default function Sidebar({ activeMenu, onMenuChange, onSave, onDelete, onEdit }: SidebarProps) {
  return (
    <aside id="main-sidebar" className="flex h-full w-64 flex-col gap-2 bg-emr-sidebar p-4 shadow-xl z-20">
      <div className="mb-6 px-2">
        <h1 className="text-xl font-bold text-slate-800 drop-shadow-sm">청송 EMR</h1>
        <p className="text-[10px] font-bold text-slate-700/60 uppercase tracking-widest">Medical System v1.0</p>
      </div>
      <nav className="flex flex-col gap-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onMenuChange(item.id)}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all ${
                isActive 
                  ? 'bg-white text-emr-secondary shadow-md ring-1 ring-white/50' 
                  : 'text-slate-700 hover:bg-white/40 hover:text-slate-900'
              }`}
            >
              <Icon size={20} className={`${isActive ? 'text-emr-primary' : 'text-slate-500 group-hover:text-slate-700'} transition-colors`} />
              <span className="text-sm font-bold tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-2 pt-6 border-t border-black/10">
        <div className="flex flex-col gap-3 px-2 text-xs font-bold text-slate-700">
          <button 
            id="btn-new" 
            onClick={() => onMenuChange('emergency')}
            className="flex items-center gap-2 transition-colors hover:text-white"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded bg-white shadow-sm">
              <Plus size={14} className="text-emr-primary" />
            </div>
            새로작성
          </button>
          <button 
            id="btn-edit" 
            onClick={onEdit}
            className="flex items-center gap-2 transition-colors hover:text-white"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded bg-white shadow-sm">
              <Edit3 size={14} className="text-indigo-500" />
            </div>
            정보수정
          </button>
          <button 
            id="btn-delete" 
            onClick={onDelete}
            className="flex items-center gap-2 transition-colors hover:text-red-600"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded bg-white shadow-sm">
              <Minus size={14} className="text-red-500" />
            </div>
            삭제
          </button>
          <button 
            id="btn-save" 
            onClick={onSave}
            className="flex items-center gap-2 transition-colors hover:text-blue-600"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded bg-white shadow-sm">
              <Save size={14} className="text-blue-500" />
            </div>
            저장
          </button>
        </div>
      </div>
    </aside>
  );
}
