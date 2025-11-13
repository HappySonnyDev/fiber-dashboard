'use client';

import "./NavBarNew.css";
import Tabs, { TabItem } from "@/shared/components/ui/NavTabs";
import { CustomSelect, SelectOption } from "@/shared/components/ui/CustomSelect";
import Image from "next/image";

const NAV_ITEMS: TabItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'nodes', label: 'Nodes' },
  { id: 'channels', label: 'Channels' },
];

const NETWORK_OPTIONS: SelectOption[] = [
  {
    value: 'mainnet',
    label: 'Mainnet (Meepo)',
    icon: (
      <Image src="/mainnet.svg" alt="Mainnet" width={16} height={16} className="w-4 h-4" />
    ),
  },
  {
    value: 'testnet',
    label: 'Testnet (Meepo)',
    icon: (
      <Image src="/testnet.svg" alt="Testnet" width={16} height={16} className="w-4 h-4" />
    ),
  },
];

export default function NavBarNew() {
  const handleTabChange = (tabId: string) => {
    console.log('Tab changed to:', tabId);
    // 这里可以添加路由跳转或其他业务逻辑
  };

  const handleNetworkChange = (network: string) => {
    console.log('Network changed to:', network);
    // 这里可以添加网络切换逻辑
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
      <div className="flex items-center relative h-12">
        <CustomSelect
          options={NETWORK_OPTIONS}
          defaultValue="mainnet"
          onChange={handleNetworkChange}
        />
      </div>
    </nav>
  );
}
