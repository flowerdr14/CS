import React from 'react';

export default function EmergencyView() {
  return (
    <div id="emergency-view" className="grid h-full grid-cols-2 gap-6 overflow-y-auto p-6 custom-scrollbar">
      {/* Diagnosis Section */}
      <section className="section-card">
        <header className="section-header">진단</header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex items-center gap-3">
            <span className="w-24 text-xs font-bold text-slate-500">주진단코드</span>
            <input type="text" className="input-emr" placeholder="K29.0" />
          </div>
          <div className="flex items-center gap-3">
            <span className="w-24 text-xs font-bold text-slate-500">주진단명</span>
            <input type="text" className="input-emr" placeholder="Acute hemorrhagic gastritis" />
          </div>
          <div className="flex items-center gap-3">
            <span className="w-24 text-xs font-bold text-slate-500">부진단코드</span>
            <input type="text" className="input-emr" />
          </div>
          <div className="flex items-center gap-3">
            <span className="w-24 text-xs font-bold text-slate-500">부진단명</span>
            <input type="text" className="input-emr" />
          </div>
        </div>
      </section>

      {/* Treatment Section */}
      <section className="section-card">
        <header className="section-header">처치 & 시술기록</header>
        <textarea 
          className="flex-1 resize-none p-4 text-sm outline-none placeholder:text-slate-300" 
          placeholder="응급 처치 및 시술 내용을 상세히 입력하세요..." 
        />
      </section>

      {/* EXAM Section */}
      <section className="section-card min-h-[250px]">
        <header className="section-header">EXAM</header>
        <textarea 
          className="flex-1 resize-none p-4 text-sm outline-none placeholder:text-slate-300" 
          placeholder="신체 검사(Physical Exam) 소견을 기록하세요..."
        />
      </section>

      {/* Additional Records Section */}
      <section className="section-card min-h-[250px]">
        <header className="section-header">기타 추가 기록 (ED)</header>
        <textarea 
          className="flex-1 resize-none p-4 text-sm outline-none placeholder:text-slate-300" 
          placeholder="기타 응급실 특이사항..."
        />
      </section>
    </div>
  );
}
