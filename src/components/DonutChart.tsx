import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const DATA = [
  { label: "Role Play", value: 92 },
  { label: "Game strategy", value: 8 },
];
const COLORS = ["#FFE8FD", "#A2DFFF"]; // 粉、蓝，与参考图一致
const SIZE = 180;
const MARGIN = 10; // 缩小边距让圆更大
const INNER_RATIO = 0.52; // 内圆半径比例（空心）
const OUTER_RATIO = 0.92; // 外圆半径比例（圆环更粗、圆更大）

export default function DonutChart(): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const radius = Math.min(SIZE, SIZE) / 2 - MARGIN;
    const innerRadius = radius * INNER_RATIO;
    const outerRadius = radius * OUTER_RATIO;

    const pie = d3
      .pie<{ label: string; value: number }>()
      .sort(null)
      .value((d) => d.value);
    const dataReady = pie(DATA);

    const arc = d3
      .arc<d3.PieArcDatum<{ label: string; value: number }>>()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    d3.select(el).selectAll("*").remove();
    const svg = d3
      .select(el)
      .append("svg")
      .attr("viewBox", `0 0 ${SIZE} ${SIZE}`)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("preserveAspectRatio", "xMidYMid meet")
      .attr("overflow", "visible");

    const g = svg
      .append("g")
      .attr("transform", `translate(${SIZE / 2},${SIZE / 2})`)
      .attr("overflow", "visible");

    // 扇形
    g.selectAll("path")
      .data(dataReady)
      .join("path")
      .attr("d", (d) => arc(d))
      .attr("fill", (_, i) => COLORS[i])
      .attr("stroke", "#000")
      .attr("stroke-width", 0.8);

    // 引线：左侧蓝段 → 左上折 → 水平到标签；右侧粉段 → 右上折 → 水平到标签（与左侧垂直翻转）
    const pointOnOuter = (r: number, angle: number): [number, number] => [
      r * Math.sin(angle),
      -r * Math.cos(angle),
    ];
    const lineGap = 18;
    const upOffset = 20;
    const labelPositions: [number, number][] = [
      [radius * 1.3, -radius * 0.38],
      [-radius * 1.4, -radius * 0.22],
    ];
    g.selectAll("polyline")
      .data(dataReady)
      .join("polyline")
      .attr("stroke", "rgba(255,255,255,0.9)")
      .attr("stroke-width", 1.2)
      .attr("fill", "none")
      .attr("points", function (d, i) {
        // 右侧粉段从弧的靠左上处引出（约 5% 处）；左侧蓝段仍用弧中点
        const angle =
          i === 0
            ? d.startAngle + (d.endAngle - d.startAngle) * 0.05
            : (d.startAngle + d.endAngle) / 2;
        const segmentPoint = pointOnOuter(outerRadius, angle);
        const [labelX] = labelPositions[i];
        if (i === 0) {
          // 右侧：粉段外缘 → 向右上折 → 水平向右到标签
          const breakPoint: [number, number] = [
            segmentPoint[0] + lineGap,
            segmentPoint[1] - upOffset,
          ];
          const rightLabelPoint: [number, number] = [labelX, segmentPoint[1] - upOffset];
          return [segmentPoint, breakPoint, rightLabelPoint].join(" ");
        }
        // 左侧：蓝段外缘 → 向左上折 → 水平向左到标签
        const breakPoint: [number, number] = [
          segmentPoint[0] - lineGap,
          segmentPoint[1] - upOffset,
        ];
        const leftLabelPoint: [number, number] = [labelX, segmentPoint[1] - upOffset];
        return [segmentPoint, breakPoint, leftLabelPoint].join(" ");
      });

    // 标签：右侧 Role Play 92%（字在水平线左端/上方）；左侧 Game strategy 8%（字在水平线上方居中）
    g.selectAll("text.chart-label")
      .data(dataReady)
      .join("text")
      .attr("class", "chart-label")
      .attr("x", (d, i) => {
        const angle =
          i === 0
            ? d.startAngle + (d.endAngle - d.startAngle) * 0.05
            : (d.startAngle + d.endAngle) / 2;
        const seg = pointOnOuter(outerRadius, angle);
        if (i === 0) return labelPositions[0][0];
        return (seg[0] - lineGap + labelPositions[1][0]) / 2;
      })
      .attr("y", (d, i) => {
        const angle =
          i === 0
            ? d.startAngle + (d.endAngle - d.startAngle) * 0.05
            : (d.startAngle + d.endAngle) / 2;
        return pointOnOuter(outerRadius, angle)[1] - upOffset;
      })
      .attr("dy", "-0.7em")
      .attr("text-anchor", (_, i) => (i === 0 ? "end" : "middle"))
      .attr("fill", "#fff")
      .attr("font-size", "12px")
      .attr("font-family", "sans-serif")
      .style("pointer-events", "none")
      .text((d, i) =>
        i === 0 ? "Role Play  " + d.data.value + "%" : d.data.label + "   " + d.data.value + "%"
      );

    // 中心文字
    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", "#fff")
      .attr("font-weight", "bold")
      .attr("font-size", "12px")
      .attr("font-family", "sans-serif")
      .selectAll("tspan")
      .data(["Companion", "Chat Topics"])
      .join("tspan")
      .attr("x", 0)
      .attr("dy", (_, i) => (i ? "1.1em" : 0))
      .text((d) => d);

    return () => {
      d3.select(el).selectAll("*").remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[140px] sm:max-w-[170px] md:max-w-[200px] lg:max-w-[220px] aspect-square shrink-0 overflow-visible"
      aria-hidden
    />
  );
}
