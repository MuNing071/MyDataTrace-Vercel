'use client';

import { useAppStore } from '@/store/useAppStore';
import { generateTimePoints, generateColorPalette } from '@/utils/helpers';
import { useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartDataset,
  ChartMeta,
  TooltipItem,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartDatasetWithNotes extends ChartDataset<'line'> {
  notes?: string[];
}

const chartNotePlugin = {
  id: 'chartNotePlugin',
  afterDraw: (chart: ChartJS<'line'>) => {
    const ctx = chart.ctx;
    
    // 遍历所有数据集
    chart.data.datasets.forEach((dataset: ChartDatasetWithNotes, datasetIndex: number) => {
      const meta = chart.getDatasetMeta(datasetIndex) as ChartMeta<'line'>;
      if (!meta.data) return;

      // 遍历当前数据集的所有点
      meta.data.forEach((point: { x?: number; y?: number }, index: number) => {
        if (point && point.x !== undefined && point.y !== undefined) {
          // 获取当前点的说明文本
          const note = dataset.notes?.[index];
          if (note && note.trim()) {
            const x = point.x;
            const y = point.y;

            ctx.save();
            ctx.font = '11px Arial';
            ctx.fillStyle = '#333333';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            
            // 计算文本尺寸
            const textWidth = ctx.measureText(note).width;
            const padding = 5;
            const boxWidth = Math.max(textWidth + padding * 2, 80);
            const boxHeight = 22;
            
            // 绘制背景框（位于点下方）
            ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
            ctx.strokeStyle = typeof dataset.borderColor === 'string' ? dataset.borderColor : '#333333';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.roundRect(
              x - boxWidth / 2,
              y + 10, // 调整位置到点下方
              boxWidth,
              boxHeight,
              4
            );
            ctx.fill();
            ctx.stroke();
            
            // 绘制文本
            ctx.fillStyle = '#333333';
            ctx.fillText(note, x, y + 21); // 调整文本位置到框内
            
            ctx.restore();
          }
        }
      });
    });
  },
};

export default function ChartVisualization() {
  const { timeConfig, configItems, data, styleConfig } = useAppStore();
  const chartRefs = useRef<(ChartJS<'line'> | null)[]>([]);

  const timePoints = generateTimePoints(timeConfig);
  const colors = generateColorPalette(
    configItems.length,
    styleConfig.colorPalette,
    styleConfig.customColors
  );

  const chartData = configItems.map((item, index) => {
    const scores = timePoints.map(tp => data[item]?.[tp]?.score || 70);
    const notes = timePoints.map(tp => data[item]?.[tp]?.note || '');
    const color = colors[index];

    return {
      labels: timePoints,
      datasets: [
        {
          label: item,
          data: scores,
          borderColor: color,
          backgroundColor: `${color}20`,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: color,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
          notes: notes,
        },
      ],
      notes,
      color,
    };
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: '',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
        padding: {
          bottom: 10,
        },
      },
      tooltip: {
        callbacks: {
          afterLabel: (context: TooltipItem<'line'>) => {
            const dataIndex = context.dataIndex;
            const chartIndex = chartData.findIndex(
              d => d.datasets[0].label === context.dataset.label
            );
            const note = chartData[chartIndex]?.notes[dataIndex];
            return note ? `说明: ${note}` : '';
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
        },
        grid: {
          color: '#E0E0E0',
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  return (
    <div id="chart-container" className="mb-8 animate-slide-up">
      <h2 className="text-2xl font-bold mb-4 text-black">📊 时光数绘轨迹图</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {chartData.map((chart, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl border-2 shadow-lg card-hover-effect"
            style={{ borderColor: chart.color }}
          >
            <div style={{ height: '350px', backgroundColor: '#ffffff' }}>
              <Line
                ref={(el) => (chartRefs.current[index] = el as ChartJS<'line'> | null)}
                data={chart}
                options={{
                  ...options,
                  backgroundColor: '#ffffff',
                  plugins: {
                    ...options.plugins,
                    title: {
                      ...options.plugins.title,
                      text: chart.datasets[0].label,
                      color: chart.color,
                    },
                    [chartNotePlugin.id]: chartNotePlugin,
                  },
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
