export interface TimeConfig {
  startDate: Date;
  endDate: Date;
  granularity: 'quarter' | 'month' | 'year';
}

export interface DataPoint {
  score: number;
  note: string;
}

export interface ItemData {
  [timePoint: string]: DataPoint;
}

export interface StyleConfig {
  ncol: number;
  nrow: number;
  colorPalette: 'default' | 'custom';
  customColors: string[];
  fontFamily: string;
  backgroundColor: string;
  margin: number;
}

export interface AppState {
  timeConfig: TimeConfig;
  configItems: string[];
  styleConfig: StyleConfig;
  data: Record<string, ItemData>;
}

export const defaultItems = [
  '我的身体有多健康？',
  '我有多少自在闲暇？',
  '我的内心有多安宁平和？',
  '我感到多少爱与被爱？',
  '我做了多少满意的善行？',
  '我体验了丰富的风景和故事？',
  '我有多少自我觉察、理解和同情？',
  '我增进了多少成长和智慧？',
];

export { defaultColors, defaultPalette } from './colors';
