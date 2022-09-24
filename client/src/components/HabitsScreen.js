import HabitsTable from './HabitsTable';

function HabitScreen({ habits, mainHabit, setMainHabit, setHabits }) {
  return (
    <div className="habitsScreen">
      <HabitsTable
        habits={habits}
        mainHabit={mainHabit}
        setMainHabit={setMainHabit}
        setHabits
      ></HabitsTable>
    </div>
  );
}

export default HabitScreen;
