import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface PrescriptionRow {
  no: number;
  type: string;
  date: string;
  doctor: string;
  content: string;
  warning: string;
  status: '진행' | '완료' | '보류';
}

export default function PrescriptionView() {
  const tabs = ['검사', '약물', '처치', '접종', '진료', '협진', '퇴원', '기타'];
  const [activeTab, setActiveTab] = useState('검사');
  const [rows, setRows] = useState<PrescriptionRow[]>([
    { no: 1, type: '혈액검사', date: '2026-04-30', doctor: '김진수', content: 'CBC, LFT, Electrolytes', warning: '공복 유지', status: '진행' },
    { no: 2, type: '영상검사', date: '2026-04-30', doctor: '이진아', content: 'Chest X-ray PA', warning: '-', status: '보류' },
  ]);

  const addRow = () => {
    const newRow: PrescriptionRow = {
      no: rows.length + 1,
      type: activeTab,
      date: new Date().toISOString().split('T')[0],
      doctor: '',
      content: '',
      warning: '',
      status: '진행'
    };
    setRows([...rows, newRow]);
  };

  const removeRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const updateRow = (index: number, field: keyof PrescriptionRow, value: string) => {
    const newRows = [...rows];
    (newRows[index] as any)[field] = value;
    setRows(newRows);
  };

  return (
    <div id="prescription-view" className="flex h-full flex-col gap-6 overflow-y-auto p-6 custom-scrollbar">
      <div className="flex flex-wrap gap-2">
        {tabs.map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-5 py-1.5 text-xs font-bold transition-all shadow-sm ${
              activeTab === tab 
                ? 'bg-emr-primary text-white scale-105' 
                : 'bg-white text-slate-500 hover:bg-slate-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="section-card flex-1">
        <header className="section-header flex items-center justify-between">
          <span>{activeTab} 처방 목록</span>
          <button onClick={addRow} className="group flex items-center gap-1.5 text-xs font-bold text-emr-primary hover:text-emr-secondary transition-colors">
            <Plus size={14} className="group-hover:scale-110 transition-transform" />
            처방 추가
          </button>
        </header>

        <div className="overflow-x-auto">
          <table className="table-emr">
            <thead>
              <tr>
                <th className="w-12 text-center">No.</th>
                <th className="w-24">종류</th>
                <th className="w-32">처방일자</th>
                <th className="w-24">담당의</th>
                <th>처방내용</th>
                <th className="w-40">주의사항</th>
                <th className="w-24 text-center">상태</th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td className="text-center font-mono text-slate-400">{row.no}</td>
                  <td>
                    <input 
                      type="text" 
                      value={row.type} 
                      onChange={(e) => updateRow(i, 'type', e.target.value)}
                      className="w-full bg-transparent outline-none focus:text-emr-primary"
                    />
                  </td>
                  <td>{row.date}</td>
                  <td>
                    <input 
                      type="text" 
                      value={row.doctor} 
                      placeholder="의사"
                      onChange={(e) => updateRow(i, 'doctor', e.target.value)}
                      className="w-full bg-transparent outline-none focus:text-emr-primary"
                    />
                  </td>
                  <td>
                    <input 
                      type="text" 
                      value={row.content} 
                      placeholder="내용 입력"
                      onChange={(e) => updateRow(i, 'content', e.target.value)}
                      className="w-full bg-transparent outline-none focus:text-emr-primary font-medium"
                    />
                  </td>
                  <td>
                    <input 
                      type="text" 
                      value={row.warning} 
                      onChange={(e) => updateRow(i, 'warning', e.target.value)}
                      className="w-full bg-transparent outline-none focus:text-emr-primary text-xs"
                    />
                  </td>
                  <td className="text-center">
                    <select 
                      value={row.status} 
                      onChange={(e) => updateRow(i, 'status', e.target.value)}
                      className={`text-xs font-bold rounded-full px-2 py-0.5 outline-none appearance-none cursor-pointer ${
                        row.status === '진행' ? 'bg-blue-100 text-blue-600' : 
                        row.status === '완료' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <option value="진행">진행</option>
                      <option value="완료">완료</option>
                      <option value="보류">보류</option>
                    </select>
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
            </tbody>
          </table>
          {rows.length === 0 && (
            <div className="py-20 text-center text-slate-400 italic">
              해당 카테고리의 처방 내역이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
