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
    <div style={{ backgroundColor: '#F5F5F5', width: '100%', height: '90%' }}>
      <div className="flex justify-center">
        <div className="p-10  grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-1 ">
          {averages.map((average) => (
            <StatCard key={average.name} average={average}></StatCard>
          ))}
        </div>
      </div>

      {mainHabit.length > 0 && (
        <div className="flex justify-center w-full">
          <Card
            className="font-light p-4 m-5"
            variant="outlined"
            sx={{ maxWidth: '90%', width: '1200px' }}
          >
            <h1 className="text-4xl font mb-4 border-slate-500 border-solid  text-center flex justify-center">
              <div className="bg-blue-100 rounded-lg w-fit px-3">
                <span className="text-3xl font-bold  ">Current Habit:</span>

                {/* <Typography sx={{ display: 'inline' }}> */}
                <span className="text-2xl">
                  &nbsp;{mainHabit[0].description}
                </span>
                {/* </Typography> */}
              </div>
            </h1>
            <ActivityChart data={data}></ActivityChart>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
