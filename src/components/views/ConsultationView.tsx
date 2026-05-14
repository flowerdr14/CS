import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface ConsultationRow {
  date: string;
  doctor: string;
  reason: string;
  note: string;
}

export default function ConsultationView() {
  const [rows, setRows] = useState<ConsultationRow[]>([
    { date: '2026-04-20', doctor: '김진수', reason: 'Abdominal pain evaluation', note: 'Recommended ultrasound' },
    { date: '2026-04-22', doctor: '이진아', reason: 'Post-op checkup', note: 'Normal recovery' },
  ]);

  const addRow = () => {
    setRows([...rows, { date: new Date().toISOString().split('T')[0], doctor: '', reason: '', note: '' }]);
  };

  const removeRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const updateRow = (index: number, field: keyof ConsultationRow, value: string) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  return (
    <div id="consultation-view" className="flex h-full flex-col gap-4 overflow-y-auto p-6 custom-scrollbar">
      <div className="section-card flex-1">
        <header className="section-header flex items-center justify-between">
          <span>협진기록 목록</span>
          <button onClick={addRow} className="group flex items-center gap-1.5 text-xs font-bold text-emr-primary hover:text-emr-secondary transition-colors">
            <Plus size={14} className="group-hover:scale-110 transition-transform" />
            협진 추가
          </button>
        </header>

        <div className="overflow-x-auto">
          <table className="table-emr">
            <thead>
              <tr>
                <th className="w-32">협진일</th>
                <th className="w-40">담당의</th>
                <th>협진사유</th>
                <th className="w-1/3">기타노트</th>
                <th className="w-16"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td>
                    <input 
                      type="date" 
                      value={row.date} 
                      onChange={(e) => updateRow(i, 'date', e.target.value)}
                      className="w-full bg-transparent outline-none focus:text-emr-primary"
                    />
                  </td>
                  <td>
                    <input 
                      type="text" 
                      value={row.doctor} 
                      placeholder="의사 이름"
                      onChange={(e) => updateRow(i, 'doctor', e.target.value)}
                      className="w-full bg-transparent outline-none focus:text-emr-primary"
                    />
                  </td>
                  <td>
                    <input 
                      type="text" 
                      value={row.reason} 
                      placeholder="사유 입력"
                      onChange={(e) => updateRow(i, 'reason', e.target.value)}
                      className="w-full bg-transparent outline-none focus:text-emr-primary"
                    />
                  </td>
                  <td>
                    <input 
                      type="text" 
                      value={row.note} 
                      placeholder="참고 사항"
                      onChange={(e) => updateRow(i, 'note', e.target.value)}
                      className="w-full bg-transparent outline-none focus:text-emr-primary"
                    />
                  </td>
                  <td className="text-right">
                    <button 
                      onClick={() => removeRow(i)}
                      className="text-slate-300 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400 italic">
                    기록된 협진 내역이 없습니다. '협진 추가'를 눌러 시작하세요.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
