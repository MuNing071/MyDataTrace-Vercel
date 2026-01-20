'use client';

import TimeConfig from '@/components/TimeConfig';
import ItemManager from '@/components/ItemManager';
import DataEntry from '@/components/DataEntry';
import ChartVisualization from '@/components/ChartVisualization';
import ExportButton from '@/components/ExportButton';
import { useState } from 'react';

export default function Home() {
  const [showChart, setShowChart] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-glow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">🎨 MyDataTrace - 时光数绘轨迹图</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            用数据当画笔，绘出独属于你的时光轨迹
          </p>
        </div>

        <div className="glass-effect rounded-2xl shadow-2xl p-6 md:p-8 mb-8 card-hover-effect animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <details className="mb-6" open>
            <summary className="cursor-pointer text-lg font-semibold text-gray-700 hover:text-indigo-600 transition-colors flex items-center gap-2">
              <span>📖 如何使用</span>
              <span className="text-sm text-gray-400">（点击展开/收起）</span>
            </summary>
            <div className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg text-sm text-gray-700 space-y-2 border border-indigo-100">
              <p>🖌️ 用数据当画笔，绘出独属于你的时光轨迹</p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>📅 选时间范围：选择要总结的周期（支持季度/月度/年度），默认25年每个季度</li>
                <li>📋 写下想要回顾的问题：对你的回顾最重要的几个问题。可以修改、删除默认问题，也能点击「➕ 添加问题」新增（建议4~12个）</li>
                <li>📝 开始回顾和评分：给每个问题打0-100分，还能加说明（建议30字内）</li>
                <li>📷 最后，一键生成时光数绘轨迹图：数据填完后，直接点「🚀 立即生成并显示」即可</li>
              </ol>
              <p className="mt-2">
                ✋️ 更多内容可关注 小红书{' '}
                <a
                  href="https://www.xiaohongshu.com/user/profile/5a05b24ce8ac2b75beec5026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors"
                >
                  [@沐宁]
                </a>
              </p>
            </div>
          </details>

          <TimeConfig />
          <ItemManager />
          <DataEntry />

          <div className="mt-8">
            <button
              onClick={() => setShowChart(!showChart)}
              className="w-full px-6 py-4 gradient-bg text-white rounded-xl hover:opacity-90 transition-all duration-300 font-bold text-lg shadow-lg button-hover-effect"
            >
              {showChart ? '📊 隐藏图表' : '🚀 立即生成并显示图表'}
            </button>
          </div>
        </div>

        {showChart && (
          <div className="glass-effect rounded-2xl shadow-2xl p-6 md:p-8 mb-8 card-hover-effect animate-slide-up">
            <div id="chart-container">
              <ChartVisualization />
            </div>
            <ExportButton targetId="chart-container" filename="mydatatrace-chart" />
          </div>
        )}

        <footer className="text-center text-sm text-gray-500 mt-12 animate-slide-up">
          <p className="bg-white/50 backdrop-blur-sm rounded-lg p-4 inline-block">
            ⚠️ 生成后记得保存内容和文本哦，网页刷新后可能就没有啦
          </p>
          <p className="mt-4">
            Made with ❤️ using Next.js & Tailwind CSS
          </p>
        </footer>
      </div>
    </main>
  );
}
