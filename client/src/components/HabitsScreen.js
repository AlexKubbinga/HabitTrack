import HabitsTable from './HabitsTable';
import HabitsTable2 from './HabitsTable2';
import { sortHabits } from '../utils/utils';
import { Alert, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function HabitScreen({ habits, mainHabit, setMainHabit, setHabits }) {
  if (habits.length)
    return (
      <HabitsTable2
        habits={sortHabits(habits)}
        mainHabit={mainHabit}
        setMainHabit={setMainHabit}
      ></HabitsTable2>
    );
  return (
    <div className="h-3/6 flex justify-center ">
      <div>
        <Alert
          className="mt-20 px-5 mb-10"
          severity="error"
          style={{ border: '1px solid red' }}
        >
          Your habits table is empty.{' '}
        </Alert>
        <Button
          component={Link}
          to={'/newHabit'}
          variant="contained"
          style={{
            textTransform: 'none',
            minWidth: '300px',
          }}
        >
          Click Here to Create a Habit &nbsp;
        </Button>
      </div>
    </div>
  );
}

export default HabitScreen;
