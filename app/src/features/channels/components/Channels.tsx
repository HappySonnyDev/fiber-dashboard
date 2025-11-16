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
  StatusIndicator,
} from "@/shared/components/ui";
import BarChart from "@/shared/components/chart/BarChart";
import PieChart from "@/shared/components/chart/PieChart";

// 通道数据类型
interface ChannelData extends Record<string, unknown> {
  channelId: string;
  transactions: number;
  capacity: string;
  createdOn: string;
  lastCommitted: string;
}

// 柱状图 Mock 数据
const mockBarChartData = [
  { label: "10^0", value: 5 },
  { label: "10^1", value: 15 },
  { label: "10^2", value: 18 },
  { label: "10^3", value: 120 },
  { label: "10^4", value: 20 },
  { label: "10^5", value: 55 },
  { label: "10^6", value: 8 },
  { label: "10^7", value: 3 },
];

// 饼状图 Mock 数据
const mockPieChartData = [
  { name: "Active", value: 500, status: "Active" },
  { name: "Committing", value: 200, status: "Committing" },
  { name: "Closed", value: 300, status: "Closed" },
];

// Mock 数据
const mockChannelsData: ChannelData[] = [
  {
    channelId: "0x0b32379ac032cce...c8ff3190557ed2e00000000",
    transactions: 1,
    capacity: "6.1 B",
    createdOn: "Oct 29, 2025",
    lastCommitted: "Oct 30, 2025",
  },
  {
    channelId: "0x0b32379ac032cce...c8ff3190557ed2e00000000",
    transactions: 2,
    capacity: "6.1 B",
    createdOn: "Oct 29, 2025",
    lastCommitted: "Oct 30, 2025",
  },
  {
    channelId: "0x0b32379ac032cce...c8ff3190557ed2e00000000",
    transactions: 1,
    capacity: "6.1 B",
    createdOn: "Oct 29, 2025",
    lastCommitted: "Oct 30, 2025",
  },
  {
    channelId: "0x0b32379ac032cce...c8ff3190557ed2e00000000",
    transactions: 1,
    capacity: "6.1 B",
    createdOn: "Oct 29, 2025",
    lastCommitted: "Oct 30, 2025",
  },
  {
    channelId: "0x0b32379ac032cce...c8ff3190557ed2e00000000",
    transactions: 1,
    capacity: "6.1 B",
    createdOn: "Oct 29, 2025",
    lastCommitted: "Oct 30, 2025",
  },
  {
    channelId: "0x0b32379ac032cce...c8ff3190557ed2e00000000",
    transactions: 1,
    capacity: "6.1 B",
    createdOn: "Oct 29, 2025",
    lastCommitted: "Oct 30, 2025",
  },
  {
    channelId: "0x0b32379ac032cce...c8ff3190557ed2e00000000",
    transactions: 1,
    capacity: "6.1 B",
    createdOn: "Oct 29, 2025",
    lastCommitted: "Oct 30, 2025",
  },
  {
    channelId: "0x0b32379ac032cce...c8ff3190557ed2e00000000",
    transactions: 1,
    capacity: "6.1 B",
    createdOn: "Oct 29, 2025",
    lastCommitted: "Oct 30, 2025",
  },
  {
    channelId: "0x0b32379ac032cce...c8ff3190557ed2e00000000",
    transactions: 1,
    capacity: "6.1 B",
    createdOn: "Oct 29, 2025",
    lastCommitted: "Oct 30, 2025",
  },
  {
    channelId: "0x0b32379ac032cce...c8ff3190557ed2e00000000",
    transactions: 1,
    capacity: "6.1 B",
    createdOn: "Oct 29, 2025",
    lastCommitted: "Oct 30, 2025",
  },
];

export const Channels = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // 假设总共 10 页

  // 列定义
  const columns: ColumnDef<ChannelData>[] = [
    {
      key: "channelId",
      label: "Channel ID",
      width: "flex-1",
      sortable: false,
      render: (value, row) => (
        <span
          className="text-primary cursor-pointer hover:underline"
          onClick={() => router.push(`/channel/${row.channelId}`)}
        >
          {value as string}
        </span>
      ),
    },
    {
      key: "transactions",
      label: "Transactions",
      width: "w-40",
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
      key: "createdOn",
      label: "Created on",
      width: "w-40",
      sortable: true,
    },
    {
      key: "lastCommitted",
      label: "Last committed",
      width: "w-40",
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

  return (
    <div className="flex flex-col gap-5">
      <SectionHeader
        title="Channel Health & Activities"
        lastUpdated="Last updated: Oct 23, 12:35"
        onRefresh={handleRefresh}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCardContainer>
          <BarChart
            data={mockBarChartData}
            title="Channel Capacity Distribution"
            height="400px"
            tooltipFormatter={item => [
              { label: "Capacity Range", value: item.label },
              { label: "Total Channels", value: item.value.toString() },
              { label: "% of Total", value: "18.3%" },
            ]}
          />
        </GlassCardContainer>

        <GlassCardContainer>
          <PieChart
            data={mockPieChartData}
            title="Channel Status Distribution"
            height="400px"
          />
        </GlassCardContainer>
      </div>

      <SectionHeader
        title="Channels by Status"
        lastUpdated="Last updated: Oct 23, 12:35"
        onRefresh={() => {}}
      />
      <div className="flex gap-4">
        <StatusIndicator text="Open (500)" color="#208C73" mode="dark" />
        <StatusIndicator text="Committing (200)" color="#FAB83D" mode="light" />
        <StatusIndicator text="Closed (300)" color="#B34846" mode="light" />
      </div>

      <GlassCardContainer>
        <Table<ChannelData>
          columns={columns}
          data={mockChannelsData}
          onSort={handleSort}
          defaultSortKey="transactions"
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
