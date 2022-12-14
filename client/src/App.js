import './App.css';
import { useState, useEffect, createContext } from 'react';
import {
  getCurrentHabitChartData,
  getMainHabit,
  getHabits,
  getAverages,
} from './apiService';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import HabitForm from './components/HabitForm';
import Navbar from './components/Navbar';
import HabitsScreen from './components/HabitsScreen';
import Registration from './components/Registration';

export const AppContext = createContext();

function App() {
  const [details, setDetails] = useState([]);
  const [chartData, setChartData] = useState({});
  const [habits, setHabits] = useState([]);
  const [mainHabit, setMainHabit] = useState([]); // want to store users current habit
  const [averages, setAverages] = useState([]);

  useEffect(() => {
    getMainHabit().then((res) => {
      setMainHabit(res);
    });

    getAverages().then((res) => {
      setAverages(res);
    });
  }, []);

  useEffect(() => {
    if (mainHabit?.length > 0) {
      getCurrentHabitChartData(mainHabit[0].name).then((res) => {
        setChartData(res);
      });
    }
    getHabits().then((res) => {
      setHabits(res);
    });
  }, [mainHabit]);

  return (
    <>
      <div className="App">
        <AppContext.Provider
          value={{
            habits,
            setHabits,
            mainHabit,
            setMainHabit,
            averages,
            chartData,
            details,
          }}>
          <Navbar />

          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/register" element={<Registration />}></Route>
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  mainHabit={mainHabit}
                  details={details}
                  data={chartData}
                  averages={averages}
                />
              }></Route>
            <Route
              path="/habits"
              element={
                <HabitsScreen
                  habits={habits}
                  mainHabit={mainHabit}
                  setMainHabit={setMainHabit}
                  setHabits></HabitsScreen>
              }></Route>
            <Route path="/newHabit" element={<HabitForm />}></Route>
          </Routes>
        </AppContext.Provider>
      </div>
    </>
  );
}

export default App;
