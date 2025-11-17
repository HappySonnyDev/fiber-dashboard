"use client";

import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import Image from "next/image";

export interface NodeMapData {
  nodeId: string;
  nodeName: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  capacity?: number;
}

export interface NodeConnectionData {
  fromNodeId: string;
  toNodeId: string; 
}

interface NodeNetworkMapProps {
  nodes: NodeMapData[];
  connections?: NodeConnectionData[];
  currentNodeId?: string;
  height?: string;
  className?: string;
  title?: string;
}

export default function NodeNetworkMap({
  nodes,
  connections = [],
  currentNodeId,
  height = "600px",
  className = "",
  title = "Global Nodes Distribution",
}: NodeNetworkMapProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!chartRef.current) return;

    // 初始化图表（透明背景）
    chartInstance.current = echarts.init(chartRef.current, null, {
      renderer: "canvas",
    });

    // 设置响应式
    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!chartInstance.current || nodes.length === 0) {
      setMapLoaded(true);
      return;
    }

    // 获取CSS变量值
    const primaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--text-primary")
      .trim();
    const purpleColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--purple")
      .trim();
    const borderColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--border-default")
      .trim();

    // 转换节点数据为散点图数据
    const nodeScatterData = nodes.map(node => ({
      name: `${node.nodeName || node.nodeId.slice(0, 8)}`,
      value: [node.longitude, node.latitude],
      nodeId: node.nodeId,
      nodeName: node.nodeName,
      city: node.city,
      country: node.country,
      capacity: node.capacity,
      isCurrentNode: node.nodeId === currentNodeId,
    }));

    // 创建节点ID到坐标的映射
    const nodeMap = new Map(
      nodes.map(node => [node.nodeId, [node.longitude, node.latitude]])
    );

    // 分组连线数据（按节点对分组，处理多条连线的情况）
    const connectionGroups = new Map<
      string,
      {
        coords: [[number, number], [number, number]];
        count: number;
        fromNodeId: string;
        toNodeId: string;
      }
    >();

    connections.forEach(conn => {
      if (!nodeMap.has(conn.fromNodeId) || !nodeMap.has(conn.toNodeId)) return;

      const coords1 = nodeMap.get(conn.fromNodeId)!;
      const coords2 = nodeMap.get(conn.toNodeId)!;

      // 创建一致的节点对key（排序确保相同节点对有相同key）
      const nodePairKey = [conn.fromNodeId, conn.toNodeId].sort().join("|");

      if (connectionGroups.has(nodePairKey)) {
        connectionGroups.get(nodePairKey)!.count++;
      } else {
        connectionGroups.set(nodePairKey, {
          coords: [
            [coords1[0], coords1[1]],
            [coords2[0], coords2[1]],
          ],
          count: 1,
          fromNodeId: conn.fromNodeId,
          toNodeId: conn.toNodeId,
        });
      }
    });

    const linesData = Array.from(connectionGroups.values());

    // 生成连线系列和图例数据（根据连接数量分组）
    const baseColor = "#7c3aed"; // 紫蓝色连线
    const connectionRanges = [
      { min: 1, max: 1, width: 1, opacity: 0.4, label: "1 Connection" },
      { min: 2, max: 2, width: 1.5, opacity: 0.5, label: "2 Connections" },
      { min: 3, max: 3, width: 2, opacity: 0.6, label: "3 Connections" },
      {
        min: 4,
        max: Infinity,
        width: 2.5,
        opacity: 0.7,
        label: "4+ Connections",
      },
    ];

    const lineSeries: echarts.LinesSeriesOption[] = [];
    const legendData: string[] = [`Nodes (${nodeScatterData.length})`];

    connectionRanges.forEach(range => {
      const filteredData = linesData.filter(
        line => line.count >= range.min && line.count <= range.max
      );

      if (filteredData.length > 0) {
        const seriesName = `${range.label} (${filteredData.length})`;
        lineSeries.push({
          name: seriesName,
          type: "lines",
          coordinateSystem: "geo",
          data: filteredData.map(line => ({
            coords: line.coords,
            value: line.count,
          })),
          lineStyle: {
            color: baseColor,
            width: range.width,
            opacity: range.opacity,
            curveness: 0,
          },
          silent: false,
          progressive: 100,
          progressiveThreshold: 500,
        });
        legendData.push(seriesName);
      }
    });

    const option: echarts.EChartsOption = {
      backgroundColor: "transparent",
      visualMap: {
        min: 0,
        max: 50,
        left: "left",
        top: "center",
        text: ["High", "Low"],
        textStyle: {
          color: primaryColor,
          fontSize: 10,
        },
        inRange: {
          color: ["#ddd6fe", "#a78bfa", "#7c3aed", "#5b21b6"],
        },
        calculable: false,
        show: true,
        orient: "vertical",
        itemWidth: 20,
        itemHeight: 140,
      },
      legend: {
        data: legendData,
        bottom: 10,
        textStyle: {
          color: primaryColor,
          fontSize: 12,
        },
        itemWidth: 30,
        itemHeight: 3,
        itemGap: 15,
      },
      tooltip: {
        trigger: "item",
        backgroundColor: "var(--surface-popover)",
        borderColor: borderColor,
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        textStyle: {
          color: primaryColor,
        },
        confine: true,
        formatter: (params: unknown) => {
          const param = params as {
            componentType: string;
            seriesType: string;
            name: string;
            value: [number, number] | number;
            data?: {
              nodeId?: string;
              nodeName?: string;
              city?: string;
              country?: string;
              capacity?: number;
              isCurrentNode?: boolean;
            };
          };

          if (param.seriesType === "scatter" && param.data) {
            const location = [param.data.city, param.data.country]
              .filter(Boolean)
              .join(", ");
            let result = `<div style="font-weight:600;margin-bottom:4px;">${param.data.nodeName || param.data.nodeId?.slice(0, 12)}</div>`;
            if (location) {
              result += `<div style="margin-bottom:2px;">📍 ${location}</div>`;
            }
            if (param.data.capacity) {
              result += `<div>Capacity: ${param.data.capacity.toLocaleString()} CKB</div>`;
            }
            if (param.data.isCurrentNode) {
              result += `<div style="color:${purpleColor};margin-top:4px;">● Current Node</div>`;
            }
            return result;
          }
          return param.name;
        },
      },
      xAxis: {
        type: "value",
        min: -180,
        max: 180,
        show: false,
      },
      yAxis: {
        type: "value",
        min: -90,
        max: 90,
        show: false,
      },
      series: [
        // 连线系列
        ...(lineSeries.map(series => ({
          ...series,
          coordinateSystem: "cartesian2d" as const,
        })) as echarts.SeriesOption[]),
        // 节点散点
        {
          name: `Nodes (${nodeScatterData.length})`,
          type: "scatter",
          coordinateSystem: "cartesian2d",
          z: 2,
          data: nodeScatterData,
          symbolSize: (val: unknown, params: unknown) => {
            const p = params as { data?: { isCurrentNode?: boolean } };
            return p.data?.isCurrentNode ? 12 : 8;
          },
          itemStyle: {
            color: (params: unknown) => {
              const p = params as { data?: { isCurrentNode?: boolean } };
              if (p.data?.isCurrentNode) {
                return "#7c3aed"; // 当前节点深紫色
              }
              return "#6366f1"; // 蓝紫色节点
            },
            shadowBlur: 4,
            shadowColor: "rgba(99, 102, 241, 0.4)",
          },
          emphasis: {
            itemStyle: {
              color: "#7c3aed",
              shadowBlur: 12,
              shadowColor: "rgba(124, 58, 237, 0.6)",
            },
            scale: 1.4,
          },
          progressive: 50,
          progressiveThreshold: 300,
          large: true,
          largeThreshold: 100,
          silent: false,
        },
      ],
    };

    chartInstance.current.setOption(option);
    setMapLoaded(true);
  }, [nodes, connections, currentNodeId, title]);

  return (
    <div style={{ position: "relative" }} className={className}>
      {/* SVG 蜂窝地图背景 */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Image
          src="/map.svg"
          alt="World Map with Hexagonal Pattern"
          fill
          style={{ objectFit: "contain", opacity: 0.95 }}
          priority
        />
      </div>

      {/* ECharts 图层（节点和连线） */}
      <div
        ref={chartRef}
        style={{ height, position: "relative", zIndex: 1 }}
      />

      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-muted-foreground">Loading map...</div>
        </div>
      )}
    </div>
  );
}
