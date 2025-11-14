import TimeSeriesChart from "@/shared/components/chart/TimeSeriesChart";
import {
  KpiCard,
  SectionHeader,
  SelectOption,
  GlassCardContainer,
  EasyTable,
} from "@/shared/components/ui";
import { useState } from "react";

const TIME_RANGE_OPTIONS: SelectOption[] = [
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

// Mock data for TimeSeriesChart
const MOCK_TIME_SERIES_DATA = [
  {
    label: "Total capacity",
    data: [
      { timestamp: "2024-10-17", value: 55000000 },
      { timestamp: "2024-10-18", value: 68000000 },
      { timestamp: "2024-10-19", value: 67000000 },
      { timestamp: "2024-10-20", value: 80000000 },
      { timestamp: "2024-10-21", value: 90000000 },
      { timestamp: "2024-10-22", value: 85000000 },
      { timestamp: "2024-10-23", value: 83000000 },
    ],
  },
  {
    label: "Total channels",
    data: [
      { timestamp: "2024-10-17", value: 2500 },
      { timestamp: "2024-10-18", value: 2400 },
      { timestamp: "2024-10-19", value: 2200 },
      { timestamp: "2024-10-20", value: 2100 },
      { timestamp: "2024-10-21", value: 1800 },
      { timestamp: "2024-10-22", value: 2000 },
      { timestamp: "2024-10-23", value: 2200 },
    ],
  },
];

const MOCK_TIME_SERIES_DATA2 = [
  {
    label: "Total active nodes",
    data: [
  { timestamp: "2024-10-17", value: 2500 },
      { timestamp: "2024-10-18", value: 2400 },
      { timestamp: "2024-10-19", value: 2200 },
      { timestamp: "2024-10-20", value: 2100 },
      { timestamp: "2024-10-21", value: 1800 },
      { timestamp: "2024-10-22", value: 2000 },
      { timestamp: "2024-10-23", value: 2200 },
    ],
  }
];

export const DashboardNew = () => {
  const [timeRange, setTimeRange] = useState("weekly");

  const handleRefresh = () => {
    // TODO: 实现刷新逻辑
    console.log("Refreshing data...");
  };

  return (
    <div className="flex flex-col gap-5">
      <SectionHeader
        title="Overview"
        lastUpdated="Last updated: Oct 23, 12:35"
        onRefresh={handleRefresh}
        selectOptions={TIME_RANGE_OPTIONS}
        selectValue={timeRange}
        onSelectChange={setTimeRange}
      />

      {/* 桌面端左右两大块布局 - 7:3 比例 */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* 左侧块 - 70% */}
        <div className="flex flex-col gap-4 lg:w-[70%]">
          {/* 顶部两个 KPI 横向排列 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <KpiCard
              label="TOTAL CAPACITY"
              value="4820000"
              unit="CKB"
              changePercent={12}
              trending="up"
              changeLabel="from last week"
            />
            <KpiCard
              label="TOTAL CHANNELS"
              value="2000"
              unit="CKB"
              changePercent={12}
              trending="down"
              changeLabel="from last week"
              onViewDetails={() => {}}
            />
          </div>

          <GlassCardContainer>
            <TimeSeriesChart
              data={MOCK_TIME_SERIES_DATA}
              height="321px"
              className="w-full"
              colors={["#7459e6", "#fab83d"]}
            />
          </GlassCardContainer>
          
          {/* 左侧下方的 4 个 KPI 卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <KpiCard
              label="MIN CAPACITY"
              value="12.0"
              unit="CKB"
              changePercent={12}
              trending="up"
              changeLabel="from last week"
            />
            <KpiCard
              label="MAX CAPACITY"
              value="249200"
              unit="CKB"
              changePercent={12}
              trending="up"
              changeLabel="from last week"
            />
            <KpiCard
              label="AVG CAPACITY"
              value="27100"
              unit="CKB"
              changePercent={12}
              trending="up"
              changeLabel="from last week"
            />
            <KpiCard
              label="MEDIAN CAPACITY"
              value="12000"
              unit="CKB"
              changePercent={12}
              trending="up"
              changeLabel="from last week"
            />
          </div>
        </div>

        {/* 右侧块 - 30% */}
        <div className="flex flex-col gap-4 lg:w-[30%]">
          <KpiCard
            label="TOTAL ACTIVE NODES"
            value="300"
            changePercent={5.5}
            trending="down"
            onViewDetails={() => {}}
            changeLabel="from last week"
          />
          <GlassCardContainer>
            <TimeSeriesChart
              data={MOCK_TIME_SERIES_DATA2}
              height="321px"
              className="w-full"
              colors={["#59ABE6"]}
            />
          </GlassCardContainer>
          <EasyTable
            title="NODES RANKING"
            actionText="View All"
            onActionClick={() => {}}
            data={[
              { id: "1", node_id: "node-01", capacity: "1000000" },
              { id: "2", node_id: "node-02", capacity: "500000" },
              { id: "3", node_id: "node-03", capacity: "900000" },
            ]}
            columns={[
              {
                key: "node_id",
                label: "Node ID",
              },
              {
                key: "capacity",
                label: "Capacity (CKB)",
                format: value => {
                  const num = Number(value);
                  return new Intl.NumberFormat("en-US", {
                    notation: "compact",
                    maximumFractionDigits: 1,
                  }).format(num);
                },
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
