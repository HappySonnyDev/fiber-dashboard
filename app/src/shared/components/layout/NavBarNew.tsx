'use client';

import "./NavBarNew.css";
import Tabs, { TabItem } from "@/shared/components/ui/NavTabs";
import { CustomSelect, SelectOption } from "@/shared/components/ui/CustomSelect";
import { CustomMenu, MenuItem, MenuOption } from "@/shared/components/ui/CustomMenu";
import Image from "next/image";
import { useState } from "react";

// 基础导航项数据
const NAV_ITEMS_DATA = [
  { id: 'overview', label: 'Overview' },
  { id: 'nodes', label: 'Nodes' },
  { id: 'channels', label: 'Channels' },
];

// 为 Tabs 组件转换数据格式
const NAV_ITEMS: TabItem[] = NAV_ITEMS_DATA;

// 为 CustomMenu 组件转换数据格式
const MENU_ITEMS: MenuItem[] = NAV_ITEMS_DATA.map(item => ({
  value: item.id,
  label: item.label,
}));

// 基础网络选项数据
const NETWORK_DATA = [
  { value: 'mainnet', label: 'Mainnet (Meepo)', iconSrc: '/mainnet.svg' },
  { value: 'testnet', label: 'Testnet (Meepo)', iconSrc: '/testnet.svg' },
];

// 为 CustomSelect 组件转换数据格式
const NETWORK_OPTIONS: SelectOption[] = NETWORK_DATA.map(network => ({
  value: network.value,
  label: network.label,
  icon: (
    <Image src={network.iconSrc} alt={network.label} width={16} height={16} className="w-4 h-4" />
  ),
}));

// 为 CustomMenu 组件转换数据格式
const MENU_OPTIONS: MenuOption[] = NETWORK_DATA.map(network => ({
  value: network.value,
  label: network.label,
  icon: (
    <Image src={network.iconSrc} alt={network.label} width={16} height={16} className="w-4 h-4" />
  ),
}));

export default function NavBarNew() {
  // 统一管理选中的 tab 和 network 状态
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedNetwork, setSelectedNetwork] = useState('mainnet');
  console.log(selectedNetwork,'nerr')

  const handleTabChange = (tabId: string) => {
    setSelectedTab(tabId);
    console.log('Tab changed to:', tabId);
    // 这里可以添加路由跳转或其他业务逻辑
  };

  const handleNetworkChange = (network: string) => {
    setSelectedNetwork(network);
    console.log('Network changed to:', network);
    // 这里可以添加网络切换逻辑
  };

  return (
    <nav className="navbar-fixed z-50">
      <div className="flex items-center justify-between relative h-12">
      {/* Left item - Logo */}
      <div className="flex items-center">
        <div className="glass-card flex justify-center items-center w-[207px] h-12 p-2.5 gap-2.5 rounded-[40px] shrink-0 md:w-12 md:h-12 md:p-2.5 md:rounded-full">
          <span className="type-button1 text-primary">Logo</span>
        </div>
      </div>

      {/* Center item - Main NavBar (hidden on mobile and tablet, visible on desktop) */}
      <div className="hidden lg:flex items-center justify-center px-6">
        <Tabs items={NAV_ITEMS} value={selectedTab} onTabChange={handleTabChange} />
        
      </div>

      {/* Right item - Network Select (hidden on mobile and tablet, visible on desktop) */}
      <div className="hidden lg:flex items-center relative h-12">
        <CustomSelect
          options={NETWORK_OPTIONS}
          value={selectedNetwork}
          onChange={handleNetworkChange}
        />
      </div>

      {/* Collapse button with CustomMenu (visible on mobile and tablet, hidden on desktop) */}
      <div className="flex lg:hidden items-center">
        <CustomMenu
          menuItems={MENU_ITEMS}
          selectedMenuItem={selectedTab}
          onMenuItemChange={handleTabChange}
          options={MENU_OPTIONS}
          selectedOption={selectedNetwork}
          onOptionChange={handleNetworkChange}
        />
      </div>
      </div>
    </nav>
  );
}
