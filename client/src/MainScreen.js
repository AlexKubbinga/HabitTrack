import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import HabitForm from './components/HabitForm';
import HabitsScreen from './components/HabitsScreen';
import { useContext } from 'react';
import AppContext from './App';

function MainScreen() {
  const { averages, mainHabit, chartData, details, setMainHabit, habits } =
    useContext(AppContext);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/home"
          element={
            <Dashboard
              mainHabit={mainHabit}
              details={details}
              data={chartData}
              averages={averages}
            />
          }
        ></Route>
        <Route
          path="/habits"
          element={
            <HabitsScreen
              habits={habits}
              mainHabit={mainHabit}
              setMainHabit={setMainHabit}
              setHabits
            ></HabitsScreen>
          }
        ></Route>
        <Route path="/newHabit" element={<HabitForm />}></Route>
      </Routes>
    </div>
  );
}

export default MainScreen;
