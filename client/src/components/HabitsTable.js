import '../App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { getHabits } from '../apiService';
import { calcHabitProgress } from '../utils/utils';
import Button from '@mui/material/Button';

function HabitsTable({ setMainHabit }) {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    getHabits().then((res) => {
      setHabits(res);
    });
    console.log(habits);
  }, []);

  return (
    <div className="habitTable">
      <div id="table">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Habit</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Start Date</TableCell>
                <TableCell align="center">End Date</TableCell>
                <TableCell align="center">Length</TableCell>
                <TableCell align="center">Progress</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {habits.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.start_date}</TableCell>
                  <TableCell align="right">
                    {row.dates[row.length - 1]}
                  </TableCell>
                  <TableCell align="right">{row.length} days</TableCell>
                  <TableCell align="right">
                    {calcHabitProgress(row.start_date, row.length)}%
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      onClick={() => {
                        setMainHabit([row]);
                      }}
                    >
                      Set as main Habit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default HabitsTable;
