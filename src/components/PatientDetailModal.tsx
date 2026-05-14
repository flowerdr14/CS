import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Calendar, MapPin, Stethoscope, Hash, Clock, BrainCircuit, Activity, Hospital } from 'lucide-react';
import { Patient } from '../types';

interface PatientDetailModalProps {
  patient: Patient | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PatientDetailModal({ patient, isOpen, onClose }: PatientDetailModalProps) {
  if (!patient) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="flex w-full max-w-4xl max-h-[90vh] flex-col bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <header className="flex items-center justify-between bg-slate-900 px-8 py-4 text-white">
              <div className="flex items-center gap-3">
                <Activity className="text-emr-primary" />
                <span className="font-black text-xl tracking-tight">상세 환자 정보</span>
              </div>
              <button 
                onClick={onClose}
                className="rounded-full p-2 hover:bg-white/10 transition-colors"
              >
                <X size={24} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Section */}
                <div className="md:col-span-1 flex flex-col items-center p-6 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="h-32 w-32 rounded-full bg-white shadow-inner flex items-center justify-center border-4 border-emr-primary/20 mb-4">
                    <User size={64} className="text-emr-secondary" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-800">{patient.name}</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${patient.gender === 'M' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                      {patient.gender === 'M' ? '남성' : '여성'}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-bold">
                      {patient.age}세
                    </span>
                  </div>
                  <div className="mt-6 w-full space-y-4">
                    <div className="flex justify-between items-center px-4 py-2 bg-white rounded-lg border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Chart No</span>
                      <span className="text-sm font-mono font-bold">{patient.chartNo}</span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-2 bg-white rounded-lg border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Birth</span>
                      <span className="text-sm font-bold">{patient.birthDate}</span>
                    </div>
                  </div>
                </div>

                {/* Medical Details */}
                <div className="md:col-span-2 space-y-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Hospital size={16} className="text-emerald-500" />
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Room</span>
                      </div>
                      <p className="text-lg font-bold text-slate-800">{patient.room}</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <User size={16} className="text-blue-500" />
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Doctor</span>
                      </div>
                      <p className="text-lg font-bold text-slate-800">{patient.doctor}</p>
                    </div>
                  </div>

                  <section className="space-y-3">
                    <div className="flex items-center gap-2">
                      <BrainCircuit size={20} className="text-emr-primary" />
                      <h3 className="text-sm font-black text-slate-800 uppercase tracking-tighter">진단명 (Diagnosis)</h3>
                    </div>
                    <div className="p-5 bg-slate-900 rounded-xl">
                      <p className="text-lg font-bold text-emr-primary leading-snug">{patient.diagnosis}</p>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Stethoscope size={20} className="text-emr-primary" />
                      <h3 className="text-sm font-black text-slate-800 uppercase tracking-tighter">주호소 (Chief Complaint)</h3>
                    </div>
                    <div className="p-5 border-2 border-slate-100 rounded-xl italic text-slate-600 bg-slate-50/50">
                      "{patient.chiefComplaint}"
                    </div>
                  </section>

                  <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-100">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Clock size={14} />
                        <span className="text-[10px] font-bold uppercase">Onset Time</span>
                      </div>
                      <p className="text-sm font-bold text-slate-700">{patient.onSet}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-slate-400">
                        <MapPin size={14} />
                        <span className="text-[10px] font-bold uppercase">Address</span>
                      </div>
                      <p className="text-sm font-medium text-slate-700">{patient.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <footer className="bg-slate-50 border-t border-slate-200 px-8 py-4 flex justify-end">
              <button 
                onClick={onClose}
                className="bg-slate-800 text-white px-8 py-2 rounded-lg font-bold hover:bg-slate-900 transition-all shadow-lg active:scale-95"
              >
                닫기
              </button>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
