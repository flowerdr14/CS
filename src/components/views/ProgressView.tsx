import React from 'react';

export default function ProgressView() {
  return (
    <div id="progress-view" className="grid h-full grid-cols-1 gap-6 overflow-y-auto p-6 custom-scrollbar lg:grid-cols-2">
      <section className="section-card min-h-[500px]">
        <header className="section-header">SOAP Progress Note</header>
        <div className="flex-1 flex flex-col p-4 bg-slate-50/30">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-bold text-indigo-500 uppercase">Subjective</span>
              <textarea className="w-full mt-1 bg-transparent outline-none text-sm min-h-[80px]" placeholder="Patient's reported symptoms..." />
            </div>
            <div>
              <span className="text-[10px] font-bold text-indigo-500 uppercase">Objective</span>
              <textarea className="w-full mt-1 bg-transparent outline-none text-sm min-h-[80px]" placeholder="Clinical observations and V/S..." />
            </div>
            <div>
              <span className="text-[10px] font-bold text-indigo-500 uppercase">Assessment</span>
              <textarea className="w-full mt-1 bg-transparent outline-none text-sm min-h-[80px]" placeholder="Diagnosis and analysis..." />
            </div>
            <div>
              <span className="text-[10px] font-bold text-indigo-500 uppercase">Plan</span>
              <textarea className="w-full mt-1 bg-transparent outline-none text-sm min-h-[80px]" placeholder="Treatment and follow-up plan..." />
            </div>
          </div>
        </div>
      </section>

      <section className="section-card min-h-[500px]">
        <header className="section-header">Physical Examination</header>
        <textarea 
          className="flex-1 resize-none p-6 outline-none text-sm whitespace-pre-wrap placeholder:text-slate-300" 
          placeholder="Detailed physical examination findings..."
        />
      </section>
    </div>
  );
}
