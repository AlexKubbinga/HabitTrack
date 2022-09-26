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
                <TableCell align="center">Actions</TableCell>
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
                    <BorderLinearProgress
                      variant="determinate"
                      value={calcHabitProgress(row.start_date, row.length)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    {row.name === mainHabit[0]?.name ? (
                      <>
                        <StarIcon
                          style={{
                            position: 'relative',
                            right: '60px',
                            color: '#1c74d4',
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          style={{ textTransform: 'none' }}
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
                        getHabits().then((res) => {
                          setHabits(res);
                        });
                      }}
                    />
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
