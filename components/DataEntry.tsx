'use client';

import { useAppStore } from '@/store/useAppStore';
import { generateTimePoints } from '@/utils/helpers';
import { useState, useEffect } from 'react';

export default function DataEntry() {
  const { timeConfig, configItems, data, setData } = useAppStore();
  const [expandedTimePoint, setExpandedTimePoint] = useState<string | null>(null);

  const timePoints = generateTimePoints(timeConfig);

  useEffect(() => {
    // 当时间点变化时，检查当前展开的时间点是否仍然存在
    if (timePoints.length > 0) {
      if (!expandedTimePoint || !timePoints.includes(expandedTimePoint)) {
        // 如果当前展开的时间点不存在，设置为第一个时间点
        setExpandedTimePoint(timePoints[0]);
      }
    } else {
      setExpandedTimePoint(null);
    }
  }, [timePoints, expandedTimePoint]);

  const handleScoreChange = (itemName: string, timePoint: string, value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;
    const clampedValue = Math.max(0, Math.min(100, numValue));
    setData(itemName, timePoint, {
      score: clampedValue,
      note: data[itemName]?.[timePoint]?.note || '',
    });
  };

  const handleNoteChange = (itemName: string, timePoint: string, value: string) => {
    const truncatedValue = value.slice(0, 300);
    setData(itemName, timePoint, {
      score: data[itemName]?.[timePoint]?.score || 70,
      note: truncatedValue,
    });
  };

  return (
    <div className="mb-8 animate-slide-up">
      <h2 className="text-2xl font-bold mb-4 text-black">📝 开始回顾和评分</h2>
      {timePoints.length === 0 ? (
        <div className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200">
          <p className="text-sm text-yellow-800">请先配置时间点</p>
        </div>
      ) : (
        <>
          <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl mb-4 border border-purple-100">
            <p className="text-sm text-purple-800">
              ✨画下你的成长曲线，每一笔都是时光的礼物<br /><br />
              📋 共 {timePoints.length} 个时间点 × {configItems.length} 个问题
            </p>
          </div>
          <div className="space-y-4">
            {timePoints.map((timePoint) => (
              <div key={timePoint} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <button
                  onClick={() => setExpandedTimePoint(expandedTimePoint === timePoint ? null : timePoint)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 text-left font-semibold flex justify-between items-center text-black"
                  aria-expanded={expandedTimePoint === timePoint}
                >
                  <span className="text-lg text-black">{timePoint}</span>
                  <span className="text-2xl transition-transform duration-200">
                    {expandedTimePoint === timePoint ? '▼' : '▶'}
                  </span>
                </button>
                {expandedTimePoint === timePoint && (
                  <div className="p-4 space-y-6 animate-fade-in bg-white">
                    {configItems.map((item) => {
                      const itemData = data[item]?.[timePoint] || { score: 70, note: '' };
                      return (
                        <div key={item} className="border-b border-gray-200 pb-4 last:border-b-0">
                          <h4 className="text-lg font-semibold mb-3 text-black">{item}</h4>
                          <div className="mb-3">
                            <label className="block text-sm font-medium text-black mb-2">
                      得分 (0-100)
                    </label>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              step="0.1"
                              value={itemData.score}
                              onChange={(e) => handleScoreChange(item, timePoint, e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-black input-focus-effect"
                            />
                            <div className="mt-2">
                              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                                <div
                                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full transition-all duration-300"
                                  style={{ width: `${itemData.score}%` }}
                                ></div>
                              </div>
                              <p className="text-sm text-black mt-1 text-right">{itemData.score.toFixed(1)}/100</p>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-black mb-2">
                              说明
                            </label>
                            <textarea
                              value={itemData.note}
                              onChange={(e) => handleNoteChange(item, timePoint, e.target.value)}
                              placeholder="为什么是这个得分呢？可以回顾相册、朋友圈、聊天记录，写写发生的事的关键词"
                              rows={3}
                              maxLength={300}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all text-black input-focus-effect"
                            />
                            <p className="text-xs text-black mt-1">{itemData.note.length}/300 字符</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
