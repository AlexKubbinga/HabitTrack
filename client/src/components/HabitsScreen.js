import HabitsTable from './HabitsTable';
import { sortHabits } from '../utils/utils';

function HabitScreen({ habits, mainHabit, setMainHabit, setHabits }) {
  return (
    <div className="habitsScreen">
      <HabitsTable
        habits={sortHabits(habits)}
        mainHabit={mainHabit}
        setMainHabit={setMainHabit}
        setHabits
      ></HabitsTable>
    </div>
  );
}

export default HabitScreen;
