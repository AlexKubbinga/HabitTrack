import '../App.css';
import ActivityChart from './ActivityChart';
import { getPersonalInfo, getScoreByMonth } from '../apiService';
import Typography from '@mui/material/Typography';
import StatCard from './statCard';
import Card from '@mui/material/Card';
import { ResponsiveContainer } from 'recharts';
import { height } from '@mui/system';

function Dashboard({ details, data, mainHabit, averages }) {
  return (
    <div style={{ backgroundColor: '#F5F5F5', width: '100%', height: '100%' }}>
      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {averages.map((average) => (
          <StatCard key={average.name} average={average}></StatCard>
        ))}
      </div>

      {mainHabit.length > 0 && (
        <div className="flex justify-center w-full">
          <Card
            className="font-light p-4 m-5"
            variant="outlined"
            sx={{ maxWidth: '90%' }}
          >
            <h1 className="text-4xl font-bold mb-4">
              <span className="underline">Current Habit:</span>
              <span className="text-4xl font-light">
                &nbsp;{mainHabit[0].description}
              </span>
            </h1>
            <ResponsiveContainer width="80%">
              <ActivityChart data={data}></ActivityChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
