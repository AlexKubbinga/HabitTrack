import { getOffsetLeft } from '@mui/material';
import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Label,
} from 'recharts';

function ActivityChart({ data }) {
  function CustomTooltip({ payload, label, active }) {
    if (active) {
      return (
        <div className="border rounded">
          <p className=" text-gray-500 text-md font-bold pl-2">
            Day: &nbsp;{label}
          </p>
          <hr></hr>
          <p className=" text-purple-500 text-md font-bold pr-4 pl-2">
            Baseline: {payload[0]?.value}
          </p>
          {payload[1]?.value && (
            <p className=" text-green-500 text-md font-bold pr-4 pl-2">
              Habit: {payload[1]?.value || ''}
            </p>
          )}
        </div>
      );
    }

    return null;
  }

  return (
    <LineChart
      width={1000}
      height={500}
      data={data}
      margin={{ top: 5, right: 20, bottom: 50, left: 30 }}
    >
      <Line type="monotone" dataKey="baseline" stroke="#8884d8" dot={false} />
      <Line type="monotone" dataKey="habit" stroke="#82ca9d" />
      <XAxis
        dataKey="y-axis"
        label={{
          value: 'Days',
          position: 'bottom',
        }}
      ></XAxis>
      <YAxis
        label={{
          value: 'Score',
          position: 'insideLeft',
          offset: -20,
        }}
      />
      <Tooltip content={<CustomTooltip />} />
      <Legend verticalAlign="top" height={50} />
    </LineChart>
  );
}

export default ActivityChart;
