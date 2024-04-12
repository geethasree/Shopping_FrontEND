import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios'

const colorScheme = {
  'Bags': '#2E5090',
  'Dresses': '#73C2FB',
  'Hoodies': '#00356B',
  'Jackets':'#2774AE',
  'Jeans':'#AFDBF5',
  'Shoes':'#1da1f2',
  'Suits':'#6495ED',
  'T-Shirts':'#B0C4DE'
};

const PieChart = () => {
  const svgRef = useRef(null);

  const [pieChartData, setPieChartData] = useState([])


  useEffect(()=>{
      axios.get('http://localhost:3001/typePercentage').then((res)=>{
        setPieChartData(res.data)

        const width = 275;
        const height = 275;
        const radius = Math.min(width, height) / 2;
    
        const svg = d3.select(svgRef.current);
    
        svg.selectAll('*').remove(); 
    
        const pieChartGroup = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`);
    
        const color = d3.scaleOrdinal().domain(Object.keys(colorScheme)).range(Object.values(colorScheme));
    
        const pie = d3.pie().value((d) => d.data);
        const arc = d3.arc().innerRadius(0).outerRadius(radius);
    
        const arcs = pieChartGroup.selectAll('arc').data(pie(res.data)).enter().append('g');
    
        const tooltip = d3.select('body')
          .append('div')
          .style('position', 'absolute')
          .style('z-index', '10')
          .style('visibility', 'hidden')
          .style('background', '#000')
          .style('color', '#fff')
          .style('padding', '10px')
          .style('border-radius', '3px')
          .style('font-size', '14px');
    
        arcs
          .append('path')
          .attr('d', arc)
          .attr('fill', (d) => color(d.data.name))
          .attr('stroke', 'white')
          .style('stroke-width', '2px')
          .style('opacity', 0.9)
          .on('mouseover', (event, d) => {
            const hoverArc = d3.arc().innerRadius(0).outerRadius(radius * 0.9);
            d3.select(event.currentTarget).transition().duration(200).attr('d', hoverArc);
            tooltip.text(`${d.data.name}: ${d.data.data}%`);
            tooltip.style('visibility', 'visible');
          })
          .on('mousemove', (event) => {
            if (event) {
              tooltip.style('top', `${event.pageY - 10}px`).style('left', `${event.pageX + 10}px`);
            }
          })
          .on('mouseout', function () {
            const originalArc = d3.arc().innerRadius(0).outerRadius(radius);
            d3.select(this).transition().duration(200).attr('d', originalArc);
            tooltip.style('visibility', 'hidden');
          });
    
        arcs
          .append('text')
          .attr('transform', (d) => `translate(${arc.centroid(d)})`)
          .attr('text-anchor', 'middle') 
          .style('font-size', '12px')
          .style('font-weight', 'bold')
          .style('fill','white')
          .text((d) => `${d.data.data}%`);


      })
      .catch((err)=>{
        console.log(err);
      })
  },[])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',   }} >
        <h3>Types vs Quantity</h3>
      <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div style={{ alignSelf: 'flex-end', padding: '20px' }}>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {pieChartData.length>0 && <svg ref={svgRef} style={{ width: '400px',height:'300px',alignSelf:'center' }}></svg>}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', alignSelf: 'center' }}>
          <div style={{ marginTop: '15px' }}>
          </div>
          {pieChartData.length>0  && pieChartData.map((dataItem, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', }}>
              <div
                style={{
                  width: '15px',
                  height: '15px',
                  backgroundColor: colorScheme[dataItem.name],
                  marginRight: '10px',
                  display: 'flex',
                }}
              />
              <div>
                <p style={{ textAlign: 'center', marginTop: '10px',fontSize:'14px' }}>{dataItem.name}: {dataItem.data}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChart;
