import React from 'react';

export default function DischargeView() {
  return (
    <div id="discharge-view" className="flex h-full flex-col gap-6 overflow-y-auto p-6 custom-scrollbar">
      <div className="section-card">
        <header className="section-header">기본 입퇴원 정보</header>
        <div className="grid grid-cols-2 gap-6 p-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">입원일</label>
            <input type="date" className="input-emr" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">퇴원일</label>
            <input type="date" className="input-emr" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">주증상</label>
            <input type="text" className="input-emr" placeholder="입원 당시 주요 호소 증상" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">주진단명</label>
            <input type="text" className="input-emr" placeholder="최종 확정 진단명" />
          </div>
        </div>
      </div>

      <div className="section-card">
        <header className="section-header">입원사유</header>
        <textarea 
          className="resize-none p-4 text-sm outline-none placeholder:text-slate-300 min-h-[100px]" 
          placeholder="입원이 필요했던 정확한 의학적 사유..." 
        />
      </div>

      <div className="section-card flex-1">
        <header className="section-header">퇴원요약 및 경과</header>
        <textarea 
          className="flex-1 resize-none p-4 text-sm outline-none placeholder:text-slate-300 min-h-[250px]" 
          placeholder="치료 과정 요약, 호전 정도, 퇴원 후 주의사항..." 
        />
      </div>
    </div>
  );
}
