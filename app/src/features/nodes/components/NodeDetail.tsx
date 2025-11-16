import { DetailCard, PageHeader, KpiCard, SectionHeader, Table, Pagination, GlassCardContainer, StatusBadge } from "@/shared/components/ui";
import type { ColumnDef } from "@/shared/components/ui";
import { useState } from "react";

// Mock 数据
interface ChannelData extends Record<string, unknown> {
  channelId: string;
  status: "Active" | "Inactive";
  capacity: string;
  createdOn: string;
  lastCommittedOn: string;
}

const mockChannels: ChannelData[] = Array.from({ length: 93 }, () => ({
  channelId: `0x0b32379ac032cce...f3190557ed2e00000000`,
  status: "Active",
  capacity: "5.8 M",
  createdOn: "Oct 27, 2025",
  lastCommittedOn: "Oct 30, 2025",
}));

export const NodeDetail = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(mockChannels.length / itemsPerPage);
  
  // 分页数据
  const paginatedData = mockChannels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 表格列定义
  const columns: ColumnDef<ChannelData>[] = [
    {
      key: "channelId",
      label: "Channel ID",
      width: "flex-1",
    },
    {
      key: "status",
      label: "Status",
      width: "w-32",
      render: (value) => (
        <StatusBadge text={value as string} status={value as "Active" | "Inactive"} />
      ),
    },
    {
      key: "capacity",
      label: "Capacity (CKB)",
      width: "w-40",
      sortable: true,
      render: (value) => <span className="text-purple font-semibold">{value as string}</span>,
    },
    {
      key: "createdOn",
      label: "Created on",
      width: "w-36",
      sortable: true,
    },
    {
      key: "lastCommittedOn",
      label: "Last committed on",
      width: "w-50",
      sortable: true,
    },
  ];
  return (
    <div>
      <PageHeader title="Node Details" />
      <DetailCard
        name="fiber-test-OSA-node-1-2"
        status="Active"
        hash="0x02b77c5360325c28c9968a5155cdeb490877dd00e5a971964d3686d2a54c9d3ded"
        location="Osaka, Japan"
        lastSeen="Oct 30, 2025"
        onCopyHash={() => console.log("已复制")}
      />
      
      {/* KPI 卡片 */}
      <div className="grid grid-cols-3 gap-4 mt-4 mb-5">
        <KpiCard
          label="TOTAL CHANNELS"
          value="93"
        />
        <KpiCard
          label="CAPACITY"
          value="5800000"
          unit="CKB"
        />
        <KpiCard
          label="AUTO ACCEPT"
          value="438.0"
          unit="CKB"
        />
      </div>
      <SectionHeader title="Channels(93)" />
      
      {/* 表格和分页 */}
      <GlassCardContainer className="mt-4">
        <Table columns={columns} data={paginatedData} />
        <div className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </GlassCardContainer>
    </div>
  );
};
