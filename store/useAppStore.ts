import { create } from 'zustand';
import { AppState, defaultItems, defaultColors, TimeConfig, StyleConfig } from '@/types';

interface AppStore extends AppState {
  setTimeConfig: (config: Partial<TimeConfig>) => void;
  setConfigItems: (items: string[]) => void;
  addItem: (item: string) => void;
  deleteItem: (index: number) => void;
  updateItemName: (index: number, newName: string) => void;
  setStyleConfig: (config: Partial<StyleConfig>) => void;
  setData: (itemName: string, timePoint: string, data: { score: number; note: string }) => void;
  resetData: () => void;
}

const initialTimeConfig: TimeConfig = {
  startDate: new Date('2025-01-01'),
  endDate: new Date('2025-12-31'),
  granularity: 'quarter',
};

const initialStyleConfig: StyleConfig = {
  ncol: 2,
  nrow: 6,
  colorPalette: 'default',
  customColors: defaultColors,
  fontFamily: 'STKaiti',
  backgroundColor: '#FFFFFF',
  margin: 10,
};

const createInitialData = (items: string[]) => {
  const data: Record<string, any> = {};
  items.forEach(item => {
    data[item] = {};
  });
  return data;
};

export const useAppStore = create<AppStore>((set) => ({
  timeConfig: initialTimeConfig,
  configItems: defaultItems,
  styleConfig: initialStyleConfig,
  data: createInitialData(defaultItems),

  setTimeConfig: (config) => set((state) => ({
    timeConfig: { ...state.timeConfig, ...config },
  })),

  setConfigItems: (items) => set({ configItems: items }),

  addItem: (item) => set((state) => {
    const newItems = [...state.configItems, item];
    return {
      configItems: newItems,
      data: { ...state.data, [item]: {} },
    };
  }),

  deleteItem: (index) => set((state) => {
    const itemToDelete = state.configItems[index];
    const newItems = state.configItems.filter((_, i) => i !== index);
    const newData = { ...state.data };
    delete newData[itemToDelete];
    return {
      configItems: newItems,
      data: newData,
    };
  }),

  updateItemName: (index, newName) => set((state) => {
    const oldName = state.configItems[index];
    const newItems = [...state.configItems];
    newItems[index] = newName;
    const newData = { ...state.data };
    if (oldName in newData) {
      newData[newName] = newData[oldName];
      delete newData[oldName];
    }
    return {
      configItems: newItems,
      data: newData,
    };
  }),

  setStyleConfig: (config) => set((state) => ({
    styleConfig: { ...state.styleConfig, ...config },
  })),

  setData: (itemName, timePoint, data) => set((state) => ({
    data: {
      ...state.data,
      [itemName]: {
        ...state.data[itemName],
        [timePoint]: data,
      },
    },
  })),

  resetData: () => set((state) => ({
    data: createInitialData(state.configItems),
  })),
}));
