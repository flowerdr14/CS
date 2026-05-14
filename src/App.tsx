import React, { useState, useMemo, useEffect } from 'react';
import { MenuId, Patient } from './types';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import PatientInfo from './components/PatientInfo';
import EmergencyView from './components/views/EmergencyView';
import ECardexView from './components/views/ECardexView';
import LabView from './components/views/LabView';
import DischargeView from './components/views/DischargeView';
import ProgressView from './components/views/ProgressView';
import OperationView from './components/views/OperationView';
import ConsultationView from './components/views/ConsultationView';
import PrescriptionView from './components/views/PrescriptionView';
import OtherView from './components/views/OtherView';
import OtherHospitalView from './components/views/OtherHospitalView';
import AssessmentModal from './components/AssessmentModal';
import PatientFormModal from './components/PatientFormModal';
import PatientDetailModal from './components/PatientDetailModal';
import { apiService } from './services/api';

export default function App() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [activeMenu, setActiveMenu] = useState<MenuId>('emergency');
  const [assessmentType, setAssessmentType] = useState<'NRS' | 'GCS' | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [formInitialData, setFormInitialData] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load patients from API
  useEffect(() => {
    const loadPatients = async () => {
      setIsLoading(true);
      const data = await apiService.fetchPatients();
      setPatients(data);
      if (data.length > 0) {
        setSelectedPatientId(data[0].id);
      }
      setIsLoading(false);
    };
    loadPatients();
  }, []);

  const selectedPatient = useMemo(() => 
    patients.find(p => p.id === selectedPatientId) || null
  , [patients, selectedPatientId]);

  const filteredPatients = useMemo(() => {
    if (!searchTerm) return patients;
    return patients.filter(p => 
      p.name.includes(searchTerm) || p.chartNo.includes(searchTerm)
    );
  }, [patients, searchTerm]);

  const handleFormSubmit = async (patientData: Patient) => {
    const exists = patients.find(p => p.id === patientData.id);
    let success = false;
    
    if (exists) {
      // Update
      success = await apiService.updatePatient(patientData);
      if (success) {
        setPatients(prev => prev.map(p => p.id === patientData.id ? patientData : p));
        alert('환자 정보가 수정되었습니다.');
      }
    } else {
      // Add
      success = await apiService.savePatient(patientData);
      if (success) {
        setPatients(prev => [...prev, patientData]);
        setSelectedPatientId(patientData.id);
        alert('신규 환자가 등록되었습니다.');
      }
    }

    if (!success && !import.meta.env.VITE_BACKEND_URL) {
      // Fallback for local UI only if no backend configured
      if (exists) {
        setPatients(prev => prev.map(p => p.id === patientData.id ? patientData : p));
      } else {
        setPatients(prev => [...prev, patientData]);
        setSelectedPatientId(patientData.id);
      }
      console.warn('Backup: Backend not configured. Changes saved locally only.');
    }
  };

  const openAddModal = () => {
    setFormInitialData(null);
    setIsFormModalOpen(true);
  };

  const openEditModal = () => {
    if (!selectedPatient) {
      alert('수정할 환자를 선택해주세요.');
      return;
    }
    setFormInitialData(selectedPatient);
    setIsFormModalOpen(true);
  };

  const handleDeletePatient = async () => {
    if (!selectedPatientId) return;
    if (confirm('현재 선택된 환자 정보를 삭제하시겠습니까?')) {
      const success = await apiService.deletePatient(selectedPatientId);
      if (success || !import.meta.env.VITE_BACKEND_URL) {
        const remaining = patients.filter(p => p.id !== selectedPatientId);
        setPatients(remaining);
        setSelectedPatientId(remaining[0]?.id || '');
        if (!success) console.warn('Backup: Backend not configured. Deleted locally only.');
      }
    }
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'ecardex':
        return <ECardexView />;
      case 'emergency':
        return (
          <div className="flex h-full flex-col relative">
            <EmergencyView />
            <div className="absolute bottom-10 right-10 flex gap-3 shadow-2xl rounded-lg p-2 bg-white/10 backdrop-blur-md border border-white/20">
               <button 
                onClick={() => setAssessmentType('NRS')}
                className="btn-emr bg-slate-900 border-none px-6"
               >
                 평가도구 (NRS)
               </button>
               <button 
                onClick={() => setAssessmentType('GCS')}
                className="btn-emr bg-slate-900 border-none px-6"
               >
                 평가도구 (GCS)
               </button>
            </div>
          </div>
        );
      case 'progress':
        return <ProgressView />;
      case 'operation':
        return <OperationView />;
      case 'consultation':
        return <ConsultationView />;
      case 'lab':
        return <LabView />;
      case 'discharge':
        return <DischargeView />;
      case 'prescription':
        return <PrescriptionView />;
      case 'other':
        return <OtherView />;
      case 'other_hospital':
        return <OtherHospitalView />;
      default:
        return (
          <div className="flex h-full items-center justify-center bg-slate-50/50 p-12">
            <div className="flex max-w-md flex-col items-center text-center">
              <div className="relative mb-8">
                <div className="absolute inset-0 animate-pulse rounded-full bg-emr-primary/10 blur-3xl" />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Visual_Editor_Medical_symbol.svg" 
                  alt="Medical Symbol" 
                  className="relative w-40 opacity-20 grayscale brightness-125"
                />
              </div>
              <h1 className="text-3xl font-black tracking-tighter text-slate-300">청송대학교병원</h1>
              <p className="mt-2 text-sm font-bold uppercase tracking-widest text-slate-400">Cheongsong National University Hospital</p>
              <div className="mt-8 flex h-1 w-24 rounded-full bg-slate-200 mx-auto" />
              <p className="mt-6 text-sm font-medium text-slate-400">좌측 메뉴를 선택하여 전자 의무 기록을 확인하거나 환자 정보를 관리하세요.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-emr-bg">
      <div className="flex h-full w-full">
        <Sidebar 
          activeMenu={activeMenu} 
          onMenuChange={setActiveMenu} 
          onSave={() => alert('정보가 저장되었습니다.')}
          onDelete={handleDeletePatient}
          onEdit={openEditModal}
        />

        <main className="flex flex-1 flex-col border-l border-emr-secondary bg-white/40">
          <TopBar 
            onAddPatient={openAddModal}
            onDeletePatient={handleDeletePatient}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedName={selectedPatient?.name || ''}
          />
          
          {/* Patient Quick Selector if filtered */}
          {searchTerm && (
            <div className="absolute top-36 z-20 left-64 right-80 bg-white border border-emr-secondary shadow-lg">
               {filteredPatients.length > 0 ? (
                 filteredPatients.map(p => (
                   <div 
                    key={p.id} 
                    className="p-3 hover:bg-emr-accent cursor-pointer flex justify-between"
                    onClick={() => {
                      setSelectedPatientId(p.id);
                      setSearchTerm('');
                    }}
                   >
                     <span>{p.name} ({p.gender}/{p.age})</span>
                     <span className="text-slate-400 text-sm">{p.chartNo}</span>
                   </div>
                 ))
               ) : (
                 <div className="p-3 text-slate-500">검색 결과가 없습니다.</div>
               )}
            </div>
          )}

          <div className="flex-1 overflow-hidden relative">
            {isLoading && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-[2px]">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-emr-primary border-t-transparent" />
                  <p className="text-sm font-bold text-slate-500">데이터를 불러오는 중...</p>
                </div>
              </div>
            )}
            {renderContent()}
          </div>
        </main>

        <PatientInfo 
          patient={selectedPatient} 
          onOpenDetail={() => setIsDetailModalOpen(true)}
        />
      </div>

      <PatientFormModal 
        isOpen={isFormModalOpen} 
        onClose={() => setIsFormModalOpen(false)} 
        onSubmit={handleFormSubmit} 
        initialData={formInitialData}
      />

      <PatientDetailModal 
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        patient={selectedPatient}
      />

      <AssessmentModal 
        isOpen={!!assessmentType} 
        onClose={() => setAssessmentType(null)} 
        type={assessmentType || 'NRS'} 
      />
    </div>
  );
}

