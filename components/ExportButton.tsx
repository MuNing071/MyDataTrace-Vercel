'use client';

import { useState } from 'react';
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

      // 设置临时样式以确保导出质量
      const originalStyles = {
        opacity: element.style.opacity,
        filter: element.style.filter
      };
      element.style.opacity = '1';
      element.style.filter = 'none';

      // 临时移除所有可能影响导出的动画和过渡效果
      const originalClasses = element.className;
      element.className = element.className.replace(/animate-\w+/g, '');
      element.className = element.className.replace(/transition-\w+/g, '');
      
      // 临时移除所有卡片的过渡效果
      const cards = element.querySelectorAll('.card-hover-effect');
      const originalCardClasses: string[] = [];
      cards.forEach((card, index) => {
        originalCardClasses[index] = card.className;
        card.className = card.className.replace(/card-hover-effect/g, '');
        card.className = card.className.replace(/transition-\w+/g, '');
      });
      
      // 优化html2canvas配置
      const canvas = await html2canvas(element, {
        scale: 3, // 提高分辨率
        // backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
        removeContainer: true,
        // 添加更多选项确保高质量导出
        ignoreElements: (el) => {
          // 忽略可能影响导出的元素
          return el.classList.contains('animate-fade-in') || el.classList.contains('animate-slide-up');
        }
      });
      
      // 恢复原始样式
      element.className = originalClasses;
      cards.forEach((card, index) => {
        card.className = originalCardClasses[index];
      });

      // 恢复原始样式
      Object.assign(element.style, originalStyles);

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
