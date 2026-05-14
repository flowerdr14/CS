import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Square } from 'lucide-react';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'NRS' | 'GCS';
}

export default function AssessmentModal({ isOpen, onClose, type }: AssessmentModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex w-full max-w-2xl flex-col bg-white border-2 border-emr-secondary"
          >
            <header className="flex items-center justify-between bg-emr-primary px-4 py-1 text-white">
              <span className="font-bold">{type === 'NRS' ? '통증평가도구 (NRS)' : '의식평가도구 (GCS)'}</span>
              <div className="flex items-center gap-3">
                <Minus size={20} className="cursor-pointer" />
                <Square size={14} className="cursor-pointer" />
                <X size={20} className="cursor-pointer" onClick={onClose} />
              </div>
            </header>

            <div className="flex flex-1 flex-col gap-6 p-8">
              {type === 'NRS' ? (
                <div className="flex flex-col gap-8">
                  <div className="flex justify-between items-end gap-2 overflow-x-auto pb-4">
                    {[0, 2, 4, 6, 8, 10].map((level) => (
                      <div key={level} className="flex flex-col items-center gap-2 min-w-[70px]">
                        <div className="text-4xl">
                           {level === 0 && '😊'}
                           {level === 2 && '🙂'}
                           {level === 4 && '😐'}
                           {level === 6 && '☹️'}
                           {level === 8 && '😫'}
                           {level === 10 && '😭'}
                        </div>
                        <span className="text-xl font-bold">{level}</span>
                        <span className="text-[10px] text-center font-medium leading-tight">
                          {level === 0 && 'No\nPain'}
                          {level === 2 && 'A Little\nPain'}
                          {level === 4 && 'A Little\nMore Pain'}
                          {level === 6 && 'Even More\nPain'}
                          {level === 8 && 'A Whole Lot\nOf Pain'}
                          {level === 10 && 'Worst\nPain'}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-medium">측정시간</span>
                      <input type="text" className="input-emr border-t-0 border-x-0 rounded-none border-b-2" />
                    </div>
                    <button className="btn-emr w-fit mt-4 bg-emr-primary">추가기록</button>
                    <textarea className="input-emr min-h-[150px] mt-2" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                   <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <span className="w-32 text-xl font-medium text-emr-secondary">Eye Opening</span>
                      <input type="text" className="input-emr border-t-0 border-x-0 rounded-none border-b-2" />
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="w-32 text-xl font-medium text-emr-secondary">Verbal Response</span>
                      <input type="text" className="input-emr border-t-0 border-x-0 rounded-none border-b-2" />
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="w-32 text-xl font-medium text-emr-secondary">Motor Response</span>
                      <input type="text" className="input-emr border-t-0 border-x-0 rounded-none border-b-2" />
                    </div>
                   </div>
                   <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-medium">측정시간</span>
                      <input type="text" className="input-emr border-t-0 border-x-0 rounded-none border-b-2" />
                    </div>
                    <button className="btn-emr w-fit mt-4 bg-emr-primary">추가기록</button>
                    <textarea className="input-emr min-h-[150px] mt-2" />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
