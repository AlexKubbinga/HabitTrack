import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { getPersonalInfo, getScoreByMonth } from './apiClient';
import ActivityChart from './ActivityChart';
// import { getScoreByMonth } from './utils/activity';

function App() {
  const [day, setDay] = useState([]);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    getScoreByMonth().then((res) => {
      setDay(res);
    });

    getPersonalInfo().then((res) => {
      setDetails(res);
    });
  }, []);

  return (
    <div className="App">
      <div id="Hello">
        <h1> Hello {details.email}</h1>
        <p>
          You are {details.age} years old, weighing {details.weight}kg and
          {details.height}m tall.
        </p>
      </div>
      <ActivityChart data={day}></ActivityChart>
      {day.map((month) => {
        return (
          <div key={month.month}>
            <h1>{month.value}</h1>
            <h2> {month.month}</h2>
          </div>
        );
      })}
    </div>
  );
}

export default App;
