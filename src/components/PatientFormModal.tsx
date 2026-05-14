import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, UserPlus, Edit3 } from 'lucide-react';
import { Patient } from '../types';

interface PatientFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (patient: Patient) => void;
  initialData?: Patient | null;
}

export default function PatientFormModal({ isOpen, onClose, onSubmit, initialData }: PatientFormModalProps) {
  const [formData, setFormData] = useState<Partial<Patient>>({
    gender: 'M',
    age: 0,
    room: '일반병동',
    doctor: '전문의'
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        gender: 'M',
        age: 0,
        room: '일반병동',
        doctor: '전문의'
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const patientData: Patient = {
      id: initialData?.id || `pt-${Date.now()}`,
      chartNo: initialData?.chartNo || `C${Math.floor(Math.random() * 9000 + 1000)}`,
      name: formData.name || '미기입',
      room: formData.room || '702-04',
      doctor: formData.doctor || '김진수',
      birthDate: formData.birthDate || '1990-01-01',
      gender: formData.gender as 'M' | 'F',
      age: Number(formData.age) || 0,
      address: formData.address || '',
      diagnosis: formData.diagnosis || '',
      chiefComplaint: formData.chiefComplaint || '',
      onSet: formData.onSet || new Date().toISOString().slice(0, 16).replace('T', ' ')
    };
    onSubmit(patientData);
    onClose();
  };

  const isEdit = !!initialData;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="flex w-full max-w-xl flex-col bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
          >
            <header className={`flex items-center justify-between px-6 py-4 text-white ${isEdit ? 'bg-indigo-600' : 'bg-emr-primary'}`}>
              <div className="flex items-center gap-3">
                {isEdit ? <Edit3 size={20} /> : <UserPlus size={20} />}
                <span className="font-black text-lg tracking-tight">
                  {isEdit ? '환자 정보 수정' : '신규 환자 등록'}
                </span>
              </div>
              <button 
                onClick={onClose}
                className="rounded-full p-1 hover:bg-white/20 transition-colors"
              >
                <X size={24} />
              </button>
            </header>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">환자명</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name || ''}
                    className="input-emr h-11" 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">나이</label>
                  <input 
                    type="number" 
                    value={formData.age || ''}
                    className="input-emr h-11" 
                    onChange={e => setFormData({...formData, age: Number(e.target.value)})} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">성별</label>
                  <select 
                    className="input-emr h-11" 
                    value={formData.gender || 'M'}
                    onChange={e => setFormData({...formData, gender: e.target.value as 'M' | 'F'})}
                  >
                    <option value="M">남성 (Male)</option>
                    <option value="F">여성 (Female)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">생년월일</label>
                  <input 
                    type="date" 
                    value={formData.birthDate || ''}
                    className="input-emr h-11" 
                    onChange={e => setFormData({...formData, birthDate: e.target.value})} 
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">진단명 (Diagnosis)</label>
                <input 
                  type="text" 
                  value={formData.diagnosis || ''}
                  placeholder="예: Acute Gastritis"
                  className="input-emr h-11" 
                  onChange={e => setFormData({...formData, diagnosis: e.target.value})} 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">주호소 (Chief Complaint)</label>
                <textarea 
                  className="input-emr min-h-[80px] py-3" 
                  value={formData.chiefComplaint || ''}
                  placeholder="환자가 호소하는 주요 증상을 입력하세요"
                  onChange={e => setFormData({...formData, chiefComplaint: e.target.value})} 
                />
              </div>

              <div className="mt-4 flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={onClose} 
                  className="px-6 py-2.5 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
                >
                  취소
                </button>
                <button 
                  type="submit" 
                  className={`btn-emr px-10 py-2.5 shadow-md ${isEdit ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`}
                >
                  {isEdit ? (
                    <>
                      <Save size={18} />
                      수정사항 저장
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} />
                      신규 환자 등록
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
