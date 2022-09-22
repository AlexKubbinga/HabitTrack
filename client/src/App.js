import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { getPersonalInfo, getScoreByMonth } from './apiService';
import Dashboard from './components/Dashboard';
import HabitForm from './components/HabitForm';
import Navbar from './components/Navbar';
// import { getScoreByMonth } from './utils/activity';

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <HabitForm />
      </div>
    </>
  );
}

export default App;
