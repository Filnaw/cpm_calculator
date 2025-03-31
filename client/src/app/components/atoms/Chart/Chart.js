"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import dagre from "dagre";
import "./Chart.css";
import '../../../../../__variables.css';

const Chart = ({ tasks, dependencies }) => {
    const svgRef = useRef(null);

    useEffect(() => {
        const g = new dagre.graphlib.Graph();

        if (!tasks || tasks.length === 0) {
        d3.select(svgRef.current).selectAll("*").remove();
        return;
        }
        g.setGraph({ rankdir: "LR", nodesep: 50, edgesep: 30 });

        tasks.forEach((task) => {
            g.setNode(task.id, {
                width: 100,
                height: 60,
                data: task,
            });
        });

        const existingTaskIds = new Set(tasks.map(task => task.id));

        dependencies
            .filter(dep => existingTaskIds.has(dep.from) && existingTaskIds.has(dep.to))
            .forEach((dep) => {
            g.setEdge(dep.from, dep.to, {
                label: dep.label || "",
            });
        });
        dagre.layout(g);

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();
        const container = svg.append("g");

        container.selectAll(".edge")
            .data(g.edges().filter(d => g.node(d.v) && g.node(d.w)))
            .enter()
            .append("line")
            .attr("x1", (d) => g.node(d.v).x)
            .attr("y1", (d) => g.node(d.v).y)
            .attr("x2", (d) => g.node(d.w).x)
            .attr("y2", (d) => g.node(d.w).y)
            .attr("stroke", "white")
            .attr("stroke-width", 2);

        container.selectAll(".edge-label")
            .data(g.edges().filter(d => g.node(d.v) && g.node(d.w)))
            .enter()
            .append("text")
            .attr("x", (d) => (g.node(d.v).x + g.node(d.w).x) / 2)
            .attr("y", (d) => (g.node(d.v).y + g.node(d.w).y) / 2 - 10)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("fill", "white")
            .style("font-weight", "bold")
            .text((d) => g.edge(d).label)
            .each(function () {
                const bbox = this.getBBox();
                d3.select(this.parentNode)
                    .insert("rect", ":first-child")
                    .attr("x", bbox.x - 3)
                    .attr("y", bbox.y - 2)
                    .attr("width", bbox.width + 6)
                    .attr("height", bbox.height + 4)
                    .attr("fill", "transparent");
            });

        container.selectAll(".node")
            .data(g.nodes().filter(d => g.node(d) && g.node(d).x !== undefined && g.node(d).y !== undefined))
            .enter()
            .append("rect")
            .attr("x", (d) => g.node(d).x - 50)
            .attr("y", (d) => g.node(d).y - 30)
            .attr("width", 100)
            .attr("height", 80)
            .attr("fill", (d) => g.node(d).data.critical ? "#ff9900" : "rgba(188,186,186,0.3)")
            .attr("stroke", "black");

        container.selectAll(".node-label")
            .data(g.nodes().filter(d => g.node(d) && g.node(d).x !== undefined && g.node(d).y !== undefined))
            .enter()
            .append("text")
            .attr("x", (d) => g.node(d).x)
            .attr("y", (d) => g.node(d).y - 10)
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .style("fill", "white")
            .style("font-weight", "bold")
            .text((d) => g.node(d).data.id);

        container.selectAll(".node-text")
            .data(g.nodes().filter(d => g.node(d) && g.node(d).x !== undefined && g.node(d).y !== undefined))
            .enter()
            .append("text")
            .attr("x", (d) => g.node(d).x)
            .attr("y", (d) => g.node(d).y + 5)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("fill", "white")
            .selectAll("tspan")
            .data((d) => [
                `ES: ${g.node(d).data.earliest_start}  EF: ${g.node(d).data.earliest_finish}`,
                `LS: ${g.node(d).data.latest_start}  LF: ${g.node(d).data.latest_finish}`,
            ])
            .enter()
            .append("tspan")
            .attr("x", (d, i, nodes) => d3.select(nodes[i].parentNode).attr("x"))
            .attr("dy", "1.2em")
            .text((t) => t);

        const { width, height } = svgRef.current.getBoundingClientRect();
        const graphWidth = g.graph().width || 500;
        const graphHeight = g.graph().height || 300;

        const scale = Math.min(width / graphWidth, height / graphHeight, 1);
        const translateX = (width - graphWidth * scale) / 2;
        const translateY = (height - graphHeight * scale) / 2;

        container.attr("transform", `translate(${translateX}, ${translateY}) scale(${scale})`);


        const legendData = [
      { color: "#ff9900", label: "Critical task" },
      { color: "rgba(188,186,186,0.3)", label: "Non-critical task" },
    ];


    const legendGroup = svg.append("g")
      .attr("class", "legend")
      .attr("transform", "translate(20, 20)");


    legendGroup.selectAll("rect")
      .data(legendData)
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", (d, i) => i * 30)
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", (d) => d.color)
      .attr("stroke", "black");


    legendGroup.selectAll("text")
      .data(legendData)
      .enter()
      .append("text")
      .attr("x", 30)
      .attr("y", (d, i) => i * 30 + 15)
      .style("fill", "white")
      .style("font-size", "14px")
      .text((d) => d.label);

    }, [tasks, dependencies]);

    return (
        <div className="chart">
            <svg ref={svgRef} width="100%" height="500px" style={{ display: "block", margin: "0 auto" }} />
        </div>
    );
};

export default Chart;
