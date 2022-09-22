import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { getPersonalInfo, getScoreByMonth } from './apiService';
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
        <HabitsTable />
      </div>
    </>
  );
}

export default App;
