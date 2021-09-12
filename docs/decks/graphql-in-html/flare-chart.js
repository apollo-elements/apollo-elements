import * as d3 from "https://cdn.skypack.dev/d3@7";
import { forceSimulation, forceLink, forceManyBody, forceCenter } from "https://cdn.skypack.dev/d3-force@3";
const data = window.FLARE_CHART_JSON;

const selector = '#deep-graph';
const width = 700;
const height = 700;

const links = data.links.map(d => Object.create(d));
const nodes = data.nodes.map(d => Object.create(d));

const simulation = forceSimulation(nodes)
  .force("link", forceLink(links).id(d => d.id))
  .force("charge", forceManyBody())
  .force("center", forceCenter(width / 2, height / 2))
  .stop();

const svg = d3.select(selector)
  .attr("viewBox", [0, 0, width, height]);

const link = svg.append("g")
  .attr("stroke", "#999")
  .attr("stroke-opacity", 0.6)
  .selectAll("line")
  .data(links)
  .join("line")
  .attr("stroke-width", d => Math.sqrt(d.value));

const drag = simulation => d3.drag()
  .on("start", function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  })
  .on("drag", function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  })
  .on("end", function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  });

const node = svg.append("g")
  .attr("stroke", "#fff")
  .attr("stroke-width", 1.5)
  .selectAll("circle")
  .data(nodes)
  .join("circle")
  .attr("r", 5)
  .attr("fill", function color() {
    const scale = d3.scaleOrdinal(d3.schemeCategory10);
    return d => scale(d.group);
  })
  .call(drag(simulation));

node.append("title")
  .text(d => d.id);

simulation.on("tick", () => {
  link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);

  node
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);
});

document.querySelector(selector)
  .closest('slidem-slide')
  .addEventListener('activated', function() {
    simulation.restart();
  });
