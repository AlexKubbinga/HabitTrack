import '../App.css';
import { useState, useEffect } from 'react';
import ActivityChart from './ActivityChart';
import { getPersonalInfo } from '../apiService';

function Dashboard() {
  const [details, setDetails] = useState([]);
  const [day, setDay] = useState([]);

  useEffect(() => {
    //   getScoreByMonth().then((res) => {
    //     setDay(res);
    //   });
    getPersonalInfo().then((res) => {
      setDetails(res);
    });
  }, []);

  return (
    <div>
      <div id="greeting">
        <h1> Hello {details.email}</h1>
        <p>
          You are {details.age} years old, weighing {details.weight}kg and
          {details.height}m tall.
        </p>
      </div>
      <ActivityChart data={day}></ActivityChart>
    </div>
  );
}

//   {day.map((month) => {
//         return (
//           <div key={month.month}>
//             <h1>{month.value}</h1>
//             <h2> {month.month}</h2>
//           </div>
//         );
//       })}

export default Dashboard;
