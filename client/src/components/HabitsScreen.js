import HabitsTable from './HabitsTable';
import HabitsTable2 from './HabitsTable2';
import { sortHabits } from '../utils/utils';

function HabitScreen({ habits, mainHabit, setMainHabit, setHabits }) {
  return (
    <HabitsTable2
      habits={sortHabits(habits)}
      mainHabit={mainHabit}
      setMainHabit={setMainHabit}
    ></HabitsTable2>
  );
}

export default HabitScreen;
