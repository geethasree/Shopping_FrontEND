import React, { useEffect, useRef, useState } from 'react';
import { select } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { max } from 'd3-array';
import axios from 'axios'

const BarChart = () => {
  const svgRef = useRef(null);
  const [statsData, setStatsData] = useState([
    { name: 'XS', data: 40 },
    { name: 'S', data: 20 },
    { name: 'M', data: 10 },
    { name: 'L', data: 20 },
    { name: 'XL', data: 10 },

  ]);




  useEffect(()=>{
    axios.get('http://localhost:3001/sizePercentage').then((res)=>{
      const statsArray = res.data.map(({ name, data }) => ({
        label: name ? name: 'No Size',
        value: parseFloat(data),
      }));
  
      const margin = { top: 20, right: 20, bottom: 50, left: 50 }; 
      const width = 400 - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;
  
      const svg = select(svgRef.current)
        .selectAll('svg')
        .data([null]) // Ensures only one SVG is created
        .join('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
  
      const x = scaleBand().range([0, width]).padding(0.1);
      const y = scaleLinear().range([height, 0]);
  
      x.domain(statsArray.map((d) => d.label));
      y.domain([0, max(statsArray, (d) => d.value)]);
  
      const barWidth = x.bandwidth() - 30;
  
      svg
        .selectAll('.bar')
        .data(statsArray)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => x(d.label) + x.bandwidth() / 2 - barWidth / 2)
        .attr('width', barWidth)
        .attr('y', (d) => y(d.value) || 0)
        .attr('height', (d) => height - (y(d.value) || 0) || 0)
        .attr('rx', 5)
        .attr('fill', '#0f85d4')
        .on('mouseover', (event, d) => {
          // Display tooltip on hover
          const xPos = x(d.label) + x.bandwidth() / 2;
          const yPos = y(d.value) - 10;
  
          svg.append('text')
            .attr('class', 'hover-data')
            .attr('x', xPos)
            .attr('y', yPos)
            .attr('text-anchor', 'middle')
            .style('font-size', '12px')
            .style('font-weight', 'bold')
            .text(`${d.value}%`);
        })
        .on('mouseout', () => {
          // Remove tooltip on mouseout
          svg.selectAll('.hover-data').remove();
        });
  
  
      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(axisBottom(x));
  
        svg.append('g')
        .call(axisLeft(y).ticks(Math.ceil(max(statsArray, (d) => d.value) / 10) + 1))
        .selectAll('path, line')
      
        .selectAll('text')
        .style('font-weight', 'bold')
        .style('font-size', '12px')
        .style('fill', 'var(--bs-gray-500)');
  
      // X-axis label
     svg.append('text')
        .attr('transform', `translate(${width / 2},${height + margin.bottom - 10})`) // Adjusted y-position for better display
        .style('text-anchor', 'middle')
        .text('Sizes');
  
      // Y-axis label with gap
      svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left ) // Adjusted y-position for better display
        .attr('x', 0 - height / 2)
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text('Quantity');
  
    })
    .catch((err)=>{

    })
  })

  return (
    <div className={"card card-xl-stretch mb-xl-4"} style={{ width: '400px' }}>
      <div className='card-header border-0 pt-5'>
        <div ref={svgRef} className='card-body'>
          <h3>Sizes vs Quantity</h3>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
