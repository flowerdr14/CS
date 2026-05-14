import React from 'react';

export default function OtherView() {
  return (
    <div id="other-view" className="flex h-full flex-col p-6 overflow-hidden">
      <section className="section-card flex-1">
        <header className="section-header">기타 기록 (Notes)</header>
        <textarea 
          className="flex-1 resize-none p-6 outline-none text-base leading-relaxed placeholder:text-slate-300" 
          placeholder="카테고리에 분류되지 않는 기타 임상 기록이나 행정적인 메모를 입력하세요..." 
        />
      </section>
    </div>
  );
}
