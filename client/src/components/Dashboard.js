import '../App.css';
import ActivityChart from './ActivityChart';
import { getPersonalInfo, getScoreByMonth } from '../apiService';

function Dashboard({ details, data, mainHabit }) {
  return (
    <div>
      <div id="greeting">
        <h1> Hello {details.email}</h1>
        <p className="mx-4 font-bold text-blue-300">
          You are {details.age} years old, weighing {details.weight}kg and
          {details.height}m tall.
        </p>
      </div>
      {mainHabit.length > 0 && (
        <div>
          <h1>Current Habit: {mainHabit[0].description}</h1>
          <ActivityChart data={data}></ActivityChart>
        </div>
      )}
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
