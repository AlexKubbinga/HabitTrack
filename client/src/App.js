import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { getPersonalInfo, getScoreByMonth } from './apiService';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import HabitForm from './components/HabitForm';
import Navbar from './components/Navbar';
import HabitsTable from './components/HabitsTable';
// import { getScoreByMonth } from './utils/activity';

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/habits" element={<HabitsTable />}></Route>
          <Route path="/newHabit" element={<HabitForm />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
