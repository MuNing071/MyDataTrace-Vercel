'use client';

import { useAppStore } from '@/store/useAppStore';

export default function ItemManager() {
  const { configItems, addItem, deleteItem, updateItemName } = useAppStore();

  const handleAddItem = () => {
    const newItem = `题项${configItems.length + 1}`;
    addItem(newItem);
  };

  return (
    <div className="mb-8 animate-slide-up">
      <h2 className="text-2xl font-bold mb-4 text-black">📋 写下想要回顾的问题</h2>
      <div className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl mb-4 border border-yellow-200">
        <p className="text-sm text-yellow-800">
          💡 可以根据自己的价值观排序来写，我最看重哪些方面呢？我会如何采访自己呢？<br />
          下面提供了{configItems.length}个默认问题，您可以直接修改或删除它们，也可以添加新问题。建议4~12个
        </p>
      </div>
      <div className="space-y-3">
        {configItems.map((item, index) => (
          <div key={index} className="flex gap-3 items-center">
            <div className="flex-1 min-w-0">
              <input
                type="text"
                value={item}
                onChange={(e) => updateItemName(index, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-black w-full input-focus-effect"
                placeholder="输入问题名称"
              />
            </div>
            <button
              onClick={() => deleteItem(index)}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-medium button-hover-effect"
              aria-label={`删除问题 ${item}`}
            >
              删除
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={handleAddItem}
        className="mt-4 w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold button-hover-effect shadow-lg"
      >
        ➕ 添加问题
      </button>
    </div>
  );
}
