// Channel Detail Mock Data

export interface ChannelDetailData {
  channelId: string;
  status: "Active" | "Inactive";
  capacity: string;
  totalTransactions: number;
  createdOn: string;
  lastCommitted: string;
  transactions: ChannelTransaction[];
  nodes: ChannelNode[];
}

export interface ChannelTransaction {
  id: string;
  transactionHash: string;
  blockNumber: string;
}

export interface ChannelNode {
  id: string;
  nodeName: string;
  nodeId: string;
  status: "Active" | "Inactive";
  location: string;
  lastSeen: string;
}

export const mockChannelDetailData: ChannelDetailData = {
  channelId:
    "0x0b32379ac032cce5727cf45980357bf824056d5bf03e021c8c8ff3190557e2e00000000",
  status: "Active",
  capacity: "5800000",
  totalTransactions: 2,
  createdOn: "Sep 29, 2025 03:06:30",
  lastCommitted: "Oct 30, 2025 15:03:43",
  transactions: [
    {
      id: "1",
      transactionHash:
        "0x0b32379ac032cce5727cf45980357bf824056d5bf03e021c8c8ff3190557ed2e",
      blockNumber: "18661917",
    },
    {
      id: "2",
      transactionHash:
        "0x0b32379ac032cce5727cf45980357bf824056d5bf03e021c8c8ff3190557ed2e",
      blockNumber: "18661917",
    },
  ],
  nodes: [
    {
      id: "1",
      nodeName: "fiber-test-OSA-node-1-2",
      nodeId:
        "0x02b77c5360325c28c9968a5155cdeb490877dd00e5a971964d3686d2a54c9d3ded",
      status: "Active",
      location: "Osaka, Japan",
      lastSeen: "Oct 30, 2025",
    },
    {
      id: "2",
      nodeName: "fiber-test-SAO-node-2-3",
      nodeId:
        "0x03b729e5d304cc88a14d5a607233d84ff4a2dcce76b9316b5288f57f1af1e74b70",
      status: "Active",
      location: "Osaka, Japan",
      lastSeen: "Oct 30, 2025",
    },
  ],
};
