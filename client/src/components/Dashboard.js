import '../App.css';
import ActivityChart from './ActivityChart';
import { getPersonalInfo, getScoreByMonth } from '../apiService';
import Typography from '@mui/material/Typography';
import StatCard from './StatCard';
import Card from '@mui/material/Card';
import { ResponsiveContainer } from 'recharts';
import { height } from '@mui/system';
import { DateTime } from 'luxon';
import { useContext } from 'react';
import { AppContext } from '../App';
import CardsGrid from './CardsGrid';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorIcon from '@mui/icons-material/Error';

function Dashboard({ details, data, mainHabit, averages }) {
  const { habits } = useContext(AppContext);
  if (habits.length)
    return (
      <div style={{ backgroundColor: '#F5F5F5', width: '100%', height: '90%' }}>
        <CardsGrid />
        {new Date(mainHabit[0]?.start_date) > new Date() && (
          <>
            <div className="flex justify-center">
              <h1 className="bg-red-100 rounded-lg w-fit px-3">
                This habit will start on{' '}
                {DateTime.fromISO(mainHabit[0]?.start_date).toLocaleString(
                  DateTime.DATE_FULL
                )}
              </h1>
            </div>
          </>
        )}
        {mainHabit.length > 0 && (
          <div className="flex justify-center w-full">
            <Card
              className="font-light p-4 m-5"
              variant="outlined"
              sx={{ maxWidth: '90%', width: '1200px' }}>
              <h1 className="text-4xl font mb-4 border-slate-500 border-solid  text-center flex justify-center">
                <div className="bg-blue-100 rounded-lg w-fit px-3">
                  <span className="text-3xl font-bold  ">Current Habit:</span>
                  <span className="text-2xl">
                    &nbsp;{mainHabit[0].description}
                  </span>
                </div>
              </h1>
              <ActivityChart data={data}></ActivityChart>
            </Card>
          </div>
        )}
      </div>
    );

  return (
    <div style={{ backgroundColor: '#F5F5F5', width: '100%', height: '90%' }}>
      <CardsGrid />
      <div className="flex justify-center content-center">
        <Card
          className="font-light p-4 m-5"
          variant="outlined"
          sx={{
            maxWidth: '90%',
            width: '1200px',
            height: '500px',
            alignItems: 'center',
            flexDirection: 'column',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <h1 className="text-4xl font mb-4 border-slate-500 border-solid  text-center flex justify-center">
            <div className="bg-red-100 rounded-lg w-fit px-3">
              <ErrorIcon
                fontSize="large"
                className="text-red-700 block mx-1 pb-1"
              />
              <span className="text-3xl font-bold">
                You don't have any habits added...
              </span>
              <br></br>
            </div>
          </h1>
          <p className="text-center">
            Once you create a habit, its data will be graphed here.
          </p>
          <br></br>
          <Button
            component={Link}
            to={'/newHabit'}
            variant="contained"
            style={{
              textTransform: 'none',
            }}
            sx={{}}>
            Click Here to Create a Habit
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
