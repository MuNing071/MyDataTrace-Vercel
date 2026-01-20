import { TimeConfig } from '@/types';
import { defaultColors, defaultPalette } from '@/types/colors';

export function generateTimePoints(config: TimeConfig): string[] {
  const { startDate, endDate, granularity } = config;
  const timePoints: string[] = [];

  if (granularity === 'quarter') {
    let currentYear = startDate.getFullYear();
    let currentQuarter = Math.floor(startDate.getMonth() / 3) + 1;
    const endYear = endDate.getFullYear();
    const endQuarter = Math.floor(endDate.getMonth() / 3) + 1;

    while (currentYear < endYear || (currentYear === endYear && currentQuarter <= endQuarter)) {
      timePoints.push(`${currentYear}Q${currentQuarter}`);
      currentQuarter++;
      if (currentQuarter > 4) {
        currentQuarter = 1;
        currentYear++;
      }
    }
  } else if (granularity === 'month') {
    let currentDate = new Date(startDate);
    const endDateObj = new Date(endDate);

    while (currentDate <= endDateObj) {
      timePoints.push(`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`);
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  } else if (granularity === 'year') {
    for (let year = startDate.getFullYear(); year <= endDate.getFullYear(); year++) {
      timePoints.push(`${year}`);
    }
  }

  return timePoints;
}

export function generateColorPalette(nItems: number, paletteType: 'default' | 'custom', customColors: string[]): string[] {
  if (paletteType === 'default') {
    return Array.from({ length: nItems }, (_, i) => defaultPalette[i % defaultPalette.length]);
  } else {
    if (customColors.length >= nItems) {
      return customColors.slice(0, nItems);
    } else {
      return [
        ...customColors,
        ...Array.from(
          { length: nItems - customColors.length },
          (_, i) => defaultPalette[(customColors.length + i) % defaultPalette.length]
        ),
      ];
    }
  }
}
