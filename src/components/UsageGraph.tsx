import React from 'react';
import { BarChart, Bar, ResponsiveContainer, YAxis, Cell } from 'recharts';

interface UsageGraphProps {
  data: { top: number; bottom: number }[];
  topColor?: string;
  bottomColor?: string;
  height?: number;
}

export const UsageGraph: React.FC<UsageGraphProps> = ({
  data,
  topColor = '#FF2D55',
  bottomColor = '#007AFF',
  height = 50,
}) => {
  return (
    <div style={{ width: '100%', height }} className="bg-[#111] rounded-sm overflow-hidden p-1">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }} barGap={1}>
          <YAxis hide domain={[-100, 100]} />
          <Bar dataKey="top" stackId="a" isAnimationActive={false}>
            {data.map((_, index) => (
              <Cell key={`cell-top-${index}`} fill={topColor} />
            ))}
          </Bar>
          <Bar dataKey="bottom" stackId="a" isAnimationActive={false}>
            {data.map((_, index) => (
              <Cell key={`cell-bottom-${index}`} fill={bottomColor} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
