import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import {
  getPersonalInfo,
  getScoreByMonth,
  getCurrentHabitChartData,
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
  const [currentHabit, setCurrentHabit] = useState({}); // want to store users current habit

  useEffect(() => {
    // getScoreByMonth().then((res) => {
    //   setDay(res);
    // });
    // getPersonalInfo().then((res) => {
    //   setDetails(res);
    // });
    getCurrentHabitChartData().then((res) => {
      console.log(res);
      setChartData(res);
    });
  }, []);

  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Dashboard details={details} data={chartData} />}
          ></Route>
          <Route path="/habits" element={<HabitsTable />}></Route>
          <Route path="/newHabit" element={<HabitForm />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
