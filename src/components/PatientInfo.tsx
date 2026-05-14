import React from 'react';
import { User, Calendar, MapPin, Stethoscope, Hash, Clock, BrainCircuit } from 'lucide-react';
import { Patient } from '../types';

interface PatientInfoProps {
  patient: Patient | null;
  onOpenDetail?: () => void;
}

export default function PatientInfo({ patient, onOpenDetail }: PatientInfoProps) {
  if (!patient) {
    return (
      <aside id="patient-info" className="flex h-full w-80 flex-col items-center justify-center border-l border-slate-200 bg-white/50 p-6 text-center">
        <User size={48} className="mb-4 text-slate-300" />
        <p className="text-sm font-bold text-slate-400">환자를 선택해주세요.</p>
      </aside>
    );
  }

  return (
    <aside id="patient-info" className="flex h-full w-80 flex-col border-l border-slate-200 bg-white shadow-xl z-10">
      <div className="bg-slate-50 p-6 border-b border-slate-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emr-accent/50 border-2 border-emr-primary/20">
            <User size={32} className="text-emr-secondary" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-800">{patient.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${patient.gender === 'M' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}`}>
                {patient.gender === 'M' ? '남성' : '여성'}
              </span>
              <span className="text-sm font-bold text-slate-500">{patient.age}세</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-slate-600">
            <Hash size={16} className="text-slate-400" />
            <span className="text-sm font-mono font-bold tracking-tighter">{patient.chartNo}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-600">
            <Calendar size={16} className="text-slate-400" />
            <span className="text-sm font-medium">{patient.birthDate}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        <section>
          <div className="flex items-center gap-2 mb-3">
            <BrainCircuit size={16} className="text-emr-primary" />
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Diagnosis (Dx)</h3>
          </div>
          <div className="rounded-lg bg-indigo-50/50 p-4 border border-indigo-100">
            <p className="text-sm font-bold text-indigo-900 leading-snug">{patient.diagnosis}</p>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-3">
            <Stethoscope size={16} className="text-emr-primary" />
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Chief Complaint (C.C)</h3>
          </div>
          <p className="text-sm font-medium text-slate-600 border-l-2 border-slate-200 pl-4 py-1 italic">
            "{patient.chiefComplaint}"
          </p>
        </section>

        <div className="pt-4 space-y-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Department & Room</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-700">{patient.department}</span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span className="text-sm font-bold text-slate-700">{patient.room}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Attending Physician</span>
            <div className="flex items-center gap-2">
              <Stethoscope size={14} className="text-emr-primary" />
              <span className="text-sm font-bold text-slate-800">{patient.doctor}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Onset Time</span>
            <div className="flex items-center gap-2 text-slate-500">
              <Clock size={14} />
              <span className="text-sm font-medium">{patient.onSet}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Address</span>
            <div className="flex items-start gap-2 text-slate-500">
              <MapPin size={14} className="shrink-0 mt-0.5" />
              <span className="text-xs font-medium leading-relaxed">{patient.address}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 border-t border-slate-100 bg-slate-50/50">
        <button 
          onClick={onOpenDetail}
          className="w-full btn-emr bg-slate-800 hover:bg-slate-900 shadow-md"
        >
          환자 정보 상세 보기
        </button>
      </div>
    </aside>
  );
}
