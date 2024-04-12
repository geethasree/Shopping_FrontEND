import React from 'react'
import Navbar from '../Navbar/Navbar'
import BarChart from './BarChart'
import PieChart from './PieChart'
import BarChart1 from './BarChart1'
export default function Dashboard1() {
  return (
    <div>
        <Navbar/>
        <div style={{display:'flex',justifyContent:'space-around',alignContent:'center'}}>
            <PieChart/>
            <BarChart/>
            <BarChart1/>
        </div>
    </div>
  )
}
