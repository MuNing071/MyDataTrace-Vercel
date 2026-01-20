'use client';

import { useAppStore } from '@/store/useAppStore';
import { generateTimePoints } from '@/utils/helpers';

export default function TimeConfig() {
  const { timeConfig, setTimeConfig } = useAppStore();

  const timePoints = generateTimePoints(timeConfig);

  return (
    <div className="mb-8 animate-slide-up">
      <h2 className="text-2xl font-bold mb-4 text-black">📅 选时间范围</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            开始时间
          </label>
          <input
            type="date"
            value={timeConfig.startDate.toISOString().split('T')[0]}
            onChange={(e) => setTimeConfig({ startDate: new Date(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-black input-focus-effect"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            结束时间
          </label>
          <input
            type="date"
            value={timeConfig.endDate.toISOString().split('T')[0]}
            onChange={(e) => setTimeConfig({ endDate: new Date(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-black input-focus-effect"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            时间粒度
          </label>
          <select
            value={timeConfig.granularity}
            onChange={(e) => setTimeConfig({ granularity: e.target.value as 'quarter' | 'month' | 'year' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-black input-focus-effect"
          >
            <option value="quarter">季度</option>
            <option value="month">月份</option>
            <option value="year">年度</option>
          </select>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
        <p className="text-sm text-blue-800 break-words">
          生成的时间点: <span className="font-semibold">{timePoints.join(', ')}</span>
        </p>
      </div>
    </div>
  );
}
