'use client';

import "./NavBarNew.css";
import Tabs, { TabItem } from "@/shared/components/ui/NavTabs";

const NAV_ITEMS: TabItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'nodes', label: 'Nodes' },
  { id: 'channels', label: 'Channels' },
];

export default function NavBarNew() {
  const handleTabChange = (tabId: string) => {
    console.log('Tab changed to:', tabId);
    // 这里可以添加路由跳转或其他业务逻辑
  };

  return (
    <nav className="navbar-fixed z-50 flex items-center justify-between">
      {/* Left item */}
      <div className="flex items-center">
        <div className="glass-card flex justify-center items-center w-[207px] h-12 p-2.5 gap-2.5 rounded-[40px] shrink-0">
          <span className="type-button1 text-primary">Logo</span>
        </div>
      </div>

      {/* Center item - Main NavBar */}
      <div className="flex items-center justify-center px-6">
        <Tabs items={NAV_ITEMS} defaultTab="overview" onTabChange={handleTabChange} />
        
      </div>

      {/* Right item */}
      <div className="flex items-center">
        <span className="ds-type-button1 ds-text-primary">Right Item</span>
      </div>
    </nav>
  );
}
