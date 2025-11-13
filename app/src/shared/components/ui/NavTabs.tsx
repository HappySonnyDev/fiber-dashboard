'use client';

import { useState } from 'react';

export interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
}

export default function Tabs({ items, defaultTab, onTabChange }: TabsProps) {
  const [selectedTab, setSelectedTab] = useState<string>(defaultTab || items[0]?.id || '');

  const handleTabClick = (tabId: string) => {
    setSelectedTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className="glass-card p-1 rounded-[40px] inline-flex justify-start items-center gap-3">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => handleTabClick(item.id)}
          type="button"
          className={`h-10 px-3 py-2.5 rounded-[999px] flex justify-center items-center gap-2.5 transition-colors cursor-pointer ${
            selectedTab === item.id ? 'bg-inverse' : ''
          }`}
        >
          <div className={`justify-start text-base font-medium font-['Inter'] leading-5 ${
            selectedTab === item.id ? 'text-on' : 'text-tertiary'
          }`}>
            {item.label}
          </div>
        </button>
      ))}
    </div>
  );
}
