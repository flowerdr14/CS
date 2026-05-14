import React from 'react';

export default function OtherHospitalView() {
  return (
    <div id="other-hospital-view" className="flex h-full flex-col gap-6 overflow-y-auto p-6 custom-scrollbar">
      <div className="section-card">
        <header className="section-header">타 기관 전원 및 이전 진료 정보</header>
        <div className="grid grid-cols-2 gap-6 p-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">타기관명</label>
            <input type="text" className="input-emr" placeholder="이전 진료 병원 이름" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">이전 병동 및 주치의</label>
            <input type="text" className="input-emr" placeholder="Dr. 홍길동 / 302병동" />
          </div>
        </div>
      </div>

      <div className="section-card">
        <header className="section-header">전원 사유</header>
        <textarea 
          className="min-h-[100px] p-4 text-sm outline-none resize-none" 
          placeholder="본원으로 전원된 구체적인 의학적/사회적 사유..." 
        />
      </div>

      <section className="section-card flex-1 min-h-[300px]">
        <header className="section-header">타병원 기록 요약</header>
        <textarea 
          className="flex-1 resize-none p-4 text-sm outline-none" 
          placeholder="이전 병원에서의 검사 결과, 투약 내역, 치료 경과 등 중요 포인트 요약..." 
        />
      </section>
    </div>
  );
}
