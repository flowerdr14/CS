import React from 'react';

export default function OperationView() {
  return (
    <div id="operation-view" className="flex h-full flex-col gap-6 overflow-y-auto p-6 custom-scrollbar">
      <div className="section-card">
        <header className="section-header">수술팀 구성 및 기본 정보</header>
        <div className="grid grid-cols-2 gap-8 p-4">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">집도의</label>
              <input type="text" className="input-emr" placeholder="Dr. Kim" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">어시스트</label>
              <input type="text" className="input-emr" placeholder="Dr. Lee, Nurse Park" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">마취통증의학과</label>
              <input type="text" className="input-emr" placeholder="Dr. Choi" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">수술명</label>
              <input type="text" className="input-emr" placeholder="Laparoscopic Cholecystectomy" />
            </div>
          </div>
        </div>
      </div>

      <section className="section-card flex-1 min-h-[300px]">
        <header className="section-header">수술 상세 기록 (OP Note)</header>
        <textarea 
          className="flex-1 resize-none p-6 outline-none text-sm leading-relaxed placeholder:text-slate-300" 
          placeholder="수술 과정, 출혈량, 사용된 보형물 등 상세 기술..."
        />
      </section>
    </div>
  );
}
