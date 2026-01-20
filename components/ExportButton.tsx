'use client';

import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

interface ExportButtonProps {
  targetId: string;
  filename?: string;
}

export default function ExportButton({ targetId, filename = 'mydatatrace-chart' }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [format, setFormat] = useState<'png' | 'jpg'>('png');

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById(targetId);
      if (!element) {
        alert('未找到要导出的元素');
        return;
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `${filename}.${format}`;
      link.href = canvas.toDataURL(`image/${format}`, 0.95);
      link.click();
    } catch (error) {
      console.error('导出失败:', error);
      alert('导出失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="mb-8 animate-slide-up">
      <h2 className="text-2xl text-black font-bold mb-4">📷 导出图片</h2>
      <div className="p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              输出格式
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as 'png' | 'jpg')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-black input-focus-effect"
            >
              <option value="png">PNG</option>
              <option value="jpg">JPG</option>
            </select>
          </div>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed font-semibold button-hover-effect shadow-lg"
          >
            {isExporting ? '导出中...' : '🚀 一键导出'}
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          点击按钮将图表导出为图片文件
        </p>
      </div>
    </div>
  );
}
