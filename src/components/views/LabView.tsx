import React from 'react';

const mockLabResults = [
  { id: 1, cbc: '12.5', ua: 'Neg', immune: 'Pos', lft: '45', pft: '98%', tumor: '0.1', electro: '140', crp: '0.5', esr: '10', spec: '-' },
  { id: 2, cbc: '13.1', ua: 'Neg', immune: 'Neg', lft: '42', pft: '99%', tumor: '0.1', electro: '138', crp: '0.3', esr: '12', spec: '-' },
];

export default function LabView() {
  return (
    <div id="lab-view" className="flex h-full flex-col gap-6 overflow-y-auto p-6 custom-scrollbar">
      <div className="grid grid-cols-2 gap-6">
        {/* SOAP Section */}
        <section className="section-card min-h-[120px]">
          <header className="section-header bg-slate-600 text-white">SOAP Summary</header>
          <div className="flex-1 p-4 text-xs font-medium bg-slate-50">
            <span className="text-slate-400 block mb-2 underline decoration-indigo-200">Recent Findings:</span>
            <p className="text-slate-600 leading-relaxed">Patient reports mild improvement in nausea. Vital signs stable. Preparing for follow-up endoscopy.</p>
          </div>
        </section>

        {/* Nursing Record Section */}
        <section className="section-card min-h-[120px]">
          <header className="section-header bg-slate-600 text-white">Daily Nursing Summary</header>
          <div className="flex-1 p-4 text-xs font-medium bg-slate-50">
            <span className="text-slate-400 block mb-2 underline decoration-emerald-200">Staff Observations:</span>
            <p className="text-slate-600 leading-relaxed">Administered IV fluids as per prescription. Monitored output. Patient resting comfortably.</p>
          </div>
        </section>
      </div>

      <section className="section-card border-none ring-1 ring-slate-200">
        <header className="section-header flex items-center justify-between">
          <span>진단 및 영상 검사 결과</span>
          <div className="flex gap-2">
            <button className="rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-bold text-indigo-600 hover:bg-indigo-100 transition-colors">영상검사</button>
            <button className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-600 hover:bg-emerald-100 transition-colors">진단검사</button>
          </div>
        </header>
        
        <div className="overflow-x-auto">
          <table className="table-emr border-t border-slate-100">
            <thead>
              <tr className="bg-slate-50/50">
                <th>CBC</th>
                <th>UA</th>
                <th>감염</th>
                <th>LFT</th>
                <th>PFT</th>
                <th>Tumor</th>
                <th>Electro</th>
                <th>CRP</th>
                <th>ESR</th>
                <th>특수혈액</th>
              </tr>
            </thead>
            <tbody>
              {mockLabResults.map((row, i) => (
                <tr key={i}>
                  <td className="font-medium text-indigo-600">{row.cbc}</td>
                  <td>{row.ua}</td>
                  <td className="font-bold text-red-500">{row.immune}</td>
                  <td>{row.lft}</td>
                  <td>{row.pft}</td>
                  <td>{row.tumor}</td>
                  <td>{row.electro}</td>
                  <td className="text-emerald-600 font-medium">{row.crp}</td>
                  <td>{row.esr}</td>
                  <td className="text-slate-400">{row.spec}</td>
                </tr>
              ))}
              {/* Fill remaining empty rows for UI structure */}
              {Array.from({ length: 10 }).map((_, i) => (
                <tr key={i + 10} className="border-none opacity-20">
                  {Array.from({ length: 10 }).map((_, j) => (
                    <td key={j} className="h-10 p-0" />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
