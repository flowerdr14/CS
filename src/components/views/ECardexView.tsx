import React from 'react';

export default function ECardexView() {
  return (
    <div id="ecardex-view" className="grid h-full grid-cols-2 gap-6 overflow-y-auto p-6 custom-scrollbar">
      <section className="section-card">
        <header className="section-header">진단</header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex items-center gap-3">
            <span className="w-24 text-xs font-bold text-slate-400">주진단코드</span>
            <input type="text" className="input-emr" />
          </div>
          <div className="flex items-center gap-3">
            <span className="w-24 text-xs font-bold text-slate-400">주진단명</span>
            <input type="text" className="input-emr" />
          </div>
          <div className="flex items-center gap-3">
            <span className="w-24 text-xs font-bold text-slate-400">부진단코드</span>
            <input type="text" className="input-emr" />
          </div>
          <div className="flex items-center gap-3">
            <span className="w-24 text-xs font-bold text-slate-400">부진단명</span>
            <input type="text" className="input-emr" />
          </div>
        </div>
      </section>

      <section className="section-card">
        <header className="section-header">간호기록</header>
        <textarea 
          className="flex-1 resize-none p-4 text-sm outline-none placeholder:text-slate-300" 
          placeholder="일상적인 간호 관찰 및 수행 내용을 기록하세요..." 
        />
      </section>

      <section className="section-card min-h-[250px]">
        <header className="section-header">수술내용</header>
        <textarea 
          className="flex-1 resize-none p-4 text-sm outline-none placeholder:text-slate-300" 
          placeholder="수술 관련 요약 정보를 입력하세요..."
        />
      </section>

      <section className="section-card min-h-[250px]">
        <header className="section-header">기타 추가 기록</header>
        <textarea 
          className="flex-1 resize-none p-4 text-sm outline-none placeholder:text-slate-300" 
          placeholder="기타 특이사항..."
        />
      </section>
    </div>
  );
}
