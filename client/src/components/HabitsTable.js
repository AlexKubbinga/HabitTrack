import '../App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect, useContext } from 'react';
import { getHabits, updateMainHabit, deleteHabit } from '../apiService';
import { calcHabitProgress } from '../utils/utils';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { styled } from '@mui/material/styles';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import StarIcon from '@mui/icons-material/Star';
import { AppContext } from '../App';

import { DateTime } from 'luxon';

function HabitsTable({ habits, setMainHabit, mainHabit }) {
  const { setHabits } = useContext(AppContext);
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
    },
    [`&.${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
    },
  }));

  return (
    <div className="px-5">
      <Paper
        className="overflow-x-auto mx-auto m-10 max-w-4xl"
        style={{
          maxWidth: { xs: '400px', sm: '800px' },
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Habit</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Start Date</TableCell>
              <TableCell align="center">End Date</TableCell>
              <TableCell align="center">Length</TableCell>
              <TableCell align="center">Progress</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {habits.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="right">
                  {DateTime.fromISO(row.start_date).toLocaleString(
                    DateTime.DATE_FULL
                  )}
                </TableCell>
                <TableCell align="right">
                  {DateTime.fromISO(row.end_date).toLocaleString(
                    DateTime.DATE_FULL
                  )}
                </TableCell>
                <TableCell align="right">{row.length} days</TableCell>
                <TableCell align="right">
                  <BorderLinearProgress
                    variant="determinate"
                    value={calcHabitProgress(row.start_date, row.length)}
                  />
                </TableCell>
                <TableCell align="center" style={{ minWidth: '180px' }}>
                  {row.name === mainHabit[0]?.name ? ( // check if its the mainhabit
                    <>
                      <StarIcon
                        sx={{ textAlign: 'center' }}
                        style={{
                          position: 'static',
                          right: '60px',
                          color: '#1c74d4',
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        style={{ textTransform: 'none', maxWidth: '120px' }}
                        onClick={() => {
                          updateMainHabit(mainHabit[0]?.name, row.name);
                          let newRow = row;
                          newRow.main_habit = true;
                          // change old main habit in Habits to false
                          //change old main habit in
                          setMainHabit([newRow]);
                        }}
                      >
                        Set as Main Habit
                      </Button>
                    </>
                  )}
                  <DeleteIcon
                    fontSize="medium"
                    style={{
                      position: 'relative',
                      left: '8px',
                    }}
                    onClick={async () => {
                      console.log('DELETED');
                      await deleteHabit(row.name);
                      if (row.name === mainHabit[0].name) {
                        setMainHabit([]);
                      } else {
                        getHabits().then((res) => {
                          setHabits(res);
                        });
                      }
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

export default HabitsTable;
