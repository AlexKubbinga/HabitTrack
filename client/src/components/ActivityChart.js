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
  ResponsiveContainer,
} from 'recharts';

function ActivityChart({ data }) {
  function CustomTooltip({ payload, label, active }) {
    if (active) {
      return (
        <div className="border rounded">
          <p className=" text-black-500 text-md font-bold pl-2">
            Day: &nbsp;{label}
          </p>
          <hr></hr>
          <p className=" text-gray-500 text-md font-bold pr-4 pl-2">
            Baseline: {payload[0]?.value}
          </p>
          {payload[1]?.value && (
            <p className=" text-blue-500 text-md font-bold pr-4 pl-2">
              Habit: {payload[1]?.value || ''}
            </p>
          )}
        </div>
      );
    }

    return null;
  }

  const title = <p className="font-bold text-xl">Day</p>;

  return (
    <ResponsiveContainer height={500}>
      <LineChart
        width={900} //get screen width  //listen to window resize event
        height={500}
        data={data}
        margin={{ top: 5, right: 20, bottom: 50, left: 30 }}
      >
        <Line type="monotone" dataKey="baseline" stroke="#808080" dot={false} />
        <Line type="monotone" dataKey="habit" stroke="#3482F6" />
        <XAxis
          dataKey="y-axis"
          label={{
            value: 'Day',
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
    </ResponsiveContainer>
  );
}

export default ActivityChart;
