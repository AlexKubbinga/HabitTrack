import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import {
  getPersonalInfo,
  getScoreByMonth,
  getCurrentHabitChartData,
  getMainHabit,
  getHabits,
} from './apiService';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import HabitForm from './components/HabitForm';
import Navbar from './components/Navbar';
import HabitsTable from './components/HabitsTable';
// import { getScoreByMonth } from './utils/activity';

function App() {
  const [details, setDetails] = useState([]);
  const [chartData, setChartData] = useState({});
  const [habits, setHabits] = useState([]);
  const [mainHabit, setMainHabit] = useState([]); // want to store users current habit

  useEffect(() => {
    // getScoreByMonth().then((res) => {
    //   setChartData(res);
    // });
    // getPersonalInfo().then((res) => {
    //   setDetails(res);
    // });
    getMainHabit().then((res) => {
      setMainHabit(res);
    });

    if (mainHabit.length > 0) {
      getCurrentHabitChartData(mainHabit[0].name).then((res) => {
        console.log(res);
        setChartData(res);
      });
    }
  }, []);

  useEffect(() => {
    if (mainHabit.length > 0) {
      getCurrentHabitChartData(mainHabit[0].name).then((res) => {
        console.log(res);
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
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                mainHabit={mainHabit}
                details={details}
                data={chartData}
              />
            }
          ></Route>
          <Route
            path="/habits"
            element={
              <HabitsTable
                habits={habits}
                mainHabit={mainHabit}
                setMainHabit={setMainHabit}
                setHabits
              />
            }
          ></Route>
          <Route path="/newHabit" element={<HabitForm />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
