import React from 'react';
import { Process } from '../types';

interface ProcessListProps {
  processes: Process[];
  title?: string;
}

export const ProcessList: React.FC<ProcessListProps> = ({ processes, title = "进程" }) => {
  return (
    <div className="mt-4">
      {title && <div className="text-blue-400 text-xs font-medium mb-2">{title}</div>}
      <div className="space-y-2">
        {processes.map((proc, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-gray-800 flex items-center justify-center overflow-hidden">
                <img src={proc.icon} alt="" className="w-4 h-4" referrerPolicy="no-referrer" />
              </div>
              <span className="text-sm text-white font-medium">{proc.name}</span>
            </div>
            <span className="text-sm text-gray-300 font-mono">{proc.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
