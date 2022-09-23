import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import {
  getPersonalInfo,
  getHabits,
  getScoreByMonth,
  getCurrentHabitChartData,
  getMainHabit,
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
  const [mainHabit, setMainHabit] = useState([]); // want to store users current habit
  const [habits, setHabits] = useState([]);
  useEffect(() => {
    // getScoreByMonth().then((res) => {
    //   setChartData(res);
    // });
    // getPersonalInfo().then((res) => {
    //   setDetails(res);
    // });
    getMainHabit().then((res) => {
      setMainHabit(res);
      console.log('mainhabit:', mainHabit);
    });
    if (mainHabit.length > 0) {
      getCurrentHabitChartData(mainHabit[0].name).then((res) => {
        console.log(res);
        setChartData(res);
      });
    }

    getHabits().then((res) => {
      setHabits(res);
    });
    console.log(habits);
  }, []);

  useEffect(() => {
    if (mainHabit.length > 0) {
      getCurrentHabitChartData(mainHabit[0].name).then((res) => {
        console.log(res);
        setChartData(res);
      });
    }
  }, [mainHabit]);

  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Dashboard details={details} data={chartData} />}
          ></Route>
          <Route
            path="/habits"
            element={<HabitsTable setMainHabit={setMainHabit} />}
          ></Route>
          <Route path="/newHabit" element={<HabitForm />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
