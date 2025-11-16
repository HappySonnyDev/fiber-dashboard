"use client";

import { useRouter } from "next/navigation";
import {
  DetailCard,
  KpiCard,
  SectionHeader,
  PageHeader,
} from "@/shared/components/ui";
import {
  mockChannelDetailData,
  type ChannelDetailData,
} from "@/features/channels/components/mockChannelDetail";

export default function ChannelDetailPage() {
  const router = useRouter();

  // 使用 mock 数据
  const channelData: ChannelDetailData = mockChannelDetailData;



  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Channel Details" />
      {/* Channel 基本信息卡片 */}
      <DetailCard
        name="Channel"
        status={channelData.status}
        hash={channelData.channelId}
        createdOn={channelData.createdOn}
        lastCommitted={channelData.lastCommitted}
      />

      {/* KPI 卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <KpiCard
          label="CAPACITY"
          value={channelData.capacity}
          unit="CKB"
        />
        <KpiCard
          label="TOTAL TRANSACTIONS"
          value={channelData.totalTransactions.toString()}
        />
      </div>

      {/* Channel Transactions */}
      <SectionHeader title={`Channel Transactions (${channelData.totalTransactions})`} />
     

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {channelData.transactions.map((tx, index) => (
          <DetailCard
            key={tx.id}
            name={`Transaction #${index + 1}`}
            showStatus={false}
            hash={tx.transactionHash}
            topRightLabel={`BLOCK #${tx.blockNumber}`}
          />
        ))}
      </div>

      {/* Nodes */}
      {/* <div className="type-h3 text-primary">Nodes</div> */}
      <SectionHeader title="Nodes" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {channelData.nodes.map((node, index) => (
          <DetailCard
            key={node.id}
            name={node.nodeName}
            status={node.status}
            hash={node.nodeId}
            location={node.location}
            lastSeen={node.lastSeen}
            topExtra={
              <div className="flex items-center justify-between">
                <div className="type-button1 text-secondary">
                  NODE #{index + 1}
                </div>
                <button
                  onClick={() => router.push(`/nodes/${node.nodeId}`)}
                  className="type-button1 text-purple cursor-pointer"
                >
                  View details
                </button>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
}
