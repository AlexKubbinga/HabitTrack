import '../App.css';
import Button from '@mui/material/Button';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HabitsTable from './HabitsTable';
import Dashboard from './Dashboard';
import HabitForm from './HabitForm';

function Navbar() {
  return (
    <div className="">
      <nav>
        <Button id="home" component={Link} to="/">
          Home
        </Button>
        <Button id="Habits" component={Link} to="/habits">
          Habits
        </Button>
        <Button id="NewHabit" component={Link} to="/newHabit">
          Create a Habit
        </Button>
      </nav>
    </div>
  );
}

export default Navbar;
