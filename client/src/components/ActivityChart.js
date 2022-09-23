import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

function ActivityChart({ data }) {
  const renderLineChart = (
    <LineChart
      width={1000}
      height={400}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="baseline" stroke="#8884d8" dot={false} />
      <Line type="monotone" dataKey="habit" stroke="#82ca9d" />
      {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
      <XAxis dataKey="y-axis" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );

  return <div id="habitChart">{renderLineChart} </div>;
}

export default ActivityChart;
