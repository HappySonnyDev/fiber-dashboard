"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  SectionHeader,
  Table,
  Pagination,
  ColumnDef,
  SortState,
  GlassCardContainer,
  SearchInput,
  CustomSelect,
  SelectOption,
} from "@/shared/components/ui";
import NodeNetworkMap, { NodeMapData, NodeConnectionData } from "@/shared/components/chart/NodeNetworkMap";

// 节点数据类型
interface NodeData extends Record<string, unknown> {
  nodeId: string;
  nodeName: string;
  channels: number;
  location: string;
  capacity: string;
  autoAccept: string;
  lastSeen: string;
}

// Mock 数据
const mockNodesData: NodeData[] = [
  {
    nodeId: "0x026ba...b1ce",
    nodeName: "fiber-test-OSA-node-1-2",
    channels: 93,
    location: "Osaka, JP",
    capacity: "5.8 M",
    autoAccept: "438.0",
    lastSeen: "Oct 30, 2025",
  },
  {
    nodeId: "0x026ba...b1ce",
    nodeName: "fiber-test-OSA-node-1-2",
    channels: 91,
    location: "Osaka, JP",
    capacity: "5.8 M",
    autoAccept: "438.0",
    lastSeen: "Oct 30, 2025",
  },
  {
    nodeId: "0x026ba...b1ce",
    nodeName: "fiber-test-OSA-node-1-2",
    channels: 87,
    location: "Osaka, JP",
    capacity: "5.8 M",
    autoAccept: "438.0",
    lastSeen: "Oct 30, 2025",
  },
  {
    nodeId: "0x026ba...b1ce",
    nodeName: "fiber-test-OSA-node-1-2",
    channels: 83,
    location: "Osaka, JP",
    capacity: "5.8 M",
    autoAccept: "438.0",
    lastSeen: "Oct 30, 2025",
  },
  {
    nodeId: "0x026ba...b1ce",
    nodeName: "fiber-test-OSA-node-1-2",
    channels: 80,
    location: "Osaka, JP",
    capacity: "5.8 M",
    autoAccept: "438.0",
    lastSeen: "Oct 30, 2025",
  },
  {
    nodeId: "0x026ba...a8f2",
    nodeName: "fiber-test-SG-node-3",
    channels: 76,
    location: "Singapore, SG",
    capacity: "4.2 M",
    autoAccept: "320.5",
    lastSeen: "Oct 29, 2025",
  },
  {
    nodeId: "0x03f1c...d4e9",
    nodeName: "fiber-prod-US-node-12",
    channels: 72,
    location: "New York, US",
    capacity: "7.1 M",
    autoAccept: "550.0",
    lastSeen: "Oct 30, 2025",
  },
];

// Mock 数据：节点地理位置（用于地图显示）
const mockNodeMapData: NodeMapData[] = [
  {
    nodeId: "0x026ba...b1ce",
    nodeName: "fiber-test-OSA-node-1-2",
    city: "Osaka",
    country: "Japan",
    latitude: 34.6937,
    longitude: 135.5023,
    capacity: 5800000,
  },
  {
    nodeId: "0x026ba...a8f2",
    nodeName: "fiber-test-SG-node-3",
    city: "Singapore",
    country: "Singapore",
    latitude: 1.3521,
    longitude: 103.8198,
    capacity: 4200000,
  },
  {
    nodeId: "0x03f1c...d4e9",
    nodeName: "fiber-prod-US-node-12",
    city: "New York",
    country: "United States",
    latitude: 40.7128,
    longitude: -74.0060,
    capacity: 7100000,
  },
  {
    nodeId: "0x02d7...3ded",
    nodeName: "fiber-node-us-west",
    city: "San Francisco",
    country: "United States",
    latitude: 37.7749,
    longitude: -122.4194,
    capacity: 6500000,
  },
  {
    nodeId: "0x03a1...7bef",
    nodeName: "fiber-node-eu-central",
    city: "Frankfurt",
    country: "Germany",
    latitude: 50.1109,
    longitude: 8.6821,
    capacity: 6200000,
  },
  {
    nodeId: "0x06d4...5def",
    nodeName: "fiber-node-oceania",
    city: "Sydney",
    country: "Australia",
    latitude: -33.8688,
    longitude: 151.2093,
    capacity: 4800000,
  },
  {
    nodeId: "0x07e5...8fgh",
    nodeName: "fiber-node-sa",
    city: "São Paulo",
    country: "Brazil",
    latitude: -23.5505,
    longitude: -46.6333,
    capacity: 3500000,
  },
  {
    nodeId: "0x08f6...1hij",
    nodeName: "fiber-node-africa",
    city: "Cape Town",
    country: "South Africa",
    latitude: -33.9249,
    longitude: 18.4241,
    capacity: 2900000,
  },
];

// Mock 数据：节点连接关系
const mockConnectionData: NodeConnectionData[] = [
  { fromNodeId: "0x026ba...b1ce", toNodeId: "0x026ba...a8f2" },
  { fromNodeId: "0x026ba...b1ce", toNodeId: "0x03f1c...d4e9" },
  { fromNodeId: "0x026ba...a8f2", toNodeId: "0x06d4...5def" },
  { fromNodeId: "0x03f1c...d4e9", toNodeId: "0x02d7...3ded" },
  { fromNodeId: "0x02d7...3ded", toNodeId: "0x03a1...7bef" },
  { fromNodeId: "0x03f1c...d4e9", toNodeId: "0x07e5...8fgh" },
  { fromNodeId: "0x06d4...5def", toNodeId: "0x08f6...1hij" },
  { fromNodeId: "0x07e5...8fgh", toNodeId: "0x08f6...1hij" },
];

export const Nodes = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [locationValue, setLocationValue] = useState('');
  const totalPages = 10; // 假设总共 10 页

  // 列定义
  const columns: ColumnDef<NodeData>[] = [
    {
      key: 'nodeId',
      label: 'Node ID',
      width: 'w-36',
      sortable: false,
      render: (value, row) => (
        <span
          className="text-primary cursor-pointer hover:underline"
          onClick={() => router.push(`/nodes/${row.nodeId}`)}
        >
          {value as string}
        </span>
      ),
    },
    {
      key: "nodeName",
      label: "Node name",
      width: "flex-1",
      sortable: false,
    },
    {
      key: "channels",
      label: "Channels",
      width: "w-32",
      sortable: true,
    },
    {
      key: "location",
      label: "Location",
      width: "w-36",
      sortable: true,
    },
    {
      key: "capacity",
      label: "Capacity (CKB)",
      width: "w-40",
      sortable: true,
      className: "text-purple font-bold",
    },
    {
      key: "autoAccept",
      label: "Auto Accept (CKB)",
      width: "w-48",
      sortable: false,
      showInfo: true,
      infoTooltip: "The minimum CKB a peer must fund when opening a channel to this node",
    },
    {
      key: "lastSeen",
      label: "Last seen on",
      width: "w-48",
      sortable: true,
    },
  ];
  const handleRefresh = () => {
    // TODO: 实现刷新逻辑
    console.log("Refreshing data...");
  };

  const handleSort = (key: string, state: SortState) => {
    console.log("Sort:", key, state);
    // TODO: 实现排序逻辑
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("Page changed to:", page);
    // TODO: 实现分页数据加载逻辑
  };

  const handleSearch = (value: string) => {
    console.log("Search:", value);
    // TODO: 实现搜索逻辑
  };

  const handleLocationChange = (value: string) => {
    setLocationValue(value);
    console.log("Location changed:", value);
    // TODO: 实现地区筛选逻辑
  };

  // 地区选项
  const locationOptions: SelectOption[] = [
    { value: "CN", label: "CN" },
    { value: "US", label: "US" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <SectionHeader
        title="Global Nodes Distribution"
        lastUpdated="Last updated: Oct 23, 12:35"
        onRefresh={handleRefresh}
      />
      
      {/* Network Map */}
      <GlassCardContainer>
        <NodeNetworkMap
          nodes={mockNodeMapData}
          connections={mockConnectionData}
          height="600px"
          title="Global Nodes Distribution"
        />
      </GlassCardContainer>

      <div className="flex justify-between items-center">
        <span className="type-h2">Active Nodes(300)</span>
        <div className="flex items-center gap-3">
          <SearchInput
            value={searchValue}
            placeholder="Search nodes by ID or name"
            onChange={setSearchValue}
            onSearch={handleSearch}
          />
        </div>
      </div>

      <CustomSelect
        options={locationOptions}
        value={locationValue}
        onChange={handleLocationChange}
        placeholder="All Location"
        className="w-[145px]"
      />
      <GlassCardContainer>
        <Table<NodeData>
          columns={columns}
          data={mockNodesData}
          onSort={handleSort}
          defaultSortKey="channels"
          defaultSortState="descending"
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mt-4"
        />
      </GlassCardContainer>
    </div>
  );
};
