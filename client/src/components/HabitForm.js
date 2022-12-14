import { useState, useContext } from 'react';
import '../App.css';
import {
  createHabit,
  validateHabit,
  updateMainHabit,
  getHabits,
} from '../apiService';
import { useForm } from 'react-hook-form';
import ErrorIcon from '@mui/icons-material/Error';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { AppContext } from '../App';
import HabitScreen from './HabitsScreen';
import { useNavigate } from 'react-router-dom';

function HabitForm() {
  const navigate = useNavigate();
  const initialState = {
    name: '',
    description: '',
    start_date: '',
    length: 30,
    area_of_improvement: '',
    main_habit: '',
  };

  const { habits, setHabits, mainHabit, setMainHabit } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [inputState, setInputState] = useState(initialState);
  const [isValidated, setIsValidated] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(inputState);
  };

  const onSubmit = async (data) => {
    let firstFlag = false;
    console.log('submitting');
    data.length = Number(data.length);
    const canCreate = await validateHabit(data.name);
    if (canCreate) {
      setIsValidated(true);

      // case when no habits exist
      if (!data.main_habit) {
        firstFlag = true;
        data.main_habit = 'true';
        setMainHabit([data]);
      }

      const created = await createHabit(data);

      if (data.main_habit === 'true' && !firstFlag) {
        updateMainHabit(mainHabit[0].name, data.name);
        setMainHabit([data]);
      }
      const newHabits = await getHabits();
      setHabits(newHabits);
    } else {
      setIsValidated(false);
    }
    setInputState(initialState);
    navigate('/habits');
  };

  return (
    <div className="bg-gray-100 flex justify-center mt-8">
      <div className="">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-3xl font-extrabold text-blue-500">
            Create a new habit
          </h1>
          <hr className="my-2"></hr>
          {!isValidated && (
            <Alert className="my-3" severity="error">
              <AlertTitle>Habit Name Error</AlertTitle>
              <p>A habit with this name already exists </p>
              <strong>Pick a different habit name!</strong>
            </Alert>
          )}
          <label
            className="block text-gray-700 text-md font-bold mb-2"
            htmlFor="name">
            Habit Name
          </label>
          <input
            className="shadow appearance-none border rounded py-2 px-3 mb-3 text-gray-700 leading-tight focus:border-indigo-500 focus:ring-indigo-500"
            type="text"
            placeholder="Gratitude"
            {...register('name', { required: true })}
            value={inputState.name}
            onChange={handleChange}
          />
          {errors.name && (
            <>
              <div>
                <ErrorIcon className="text-red-700 block mx-1 pb-1" />
                <p className="text-red-700 inline-block">
                  Habit name is required
                </p>
              </div>
            </>
          )}
          <label
            className="block text-gray-700 text-md font-bold mb-2"
            htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded py-2 px-3 mb-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            id="description"
            {...register('description', { required: true })}
            type="text"
            placeholder="Write 3 things I am grateful for each day"
            value={inputState.description}
            onChange={handleChange}></textarea>
          {errors.description && (
            <div className="mb-1 mt-0 p-0">
              <ErrorIcon className="text-red-700 block mx-1 pb-1" />
              <p className="text-red-700 inline">Description is required</p>
            </div>
          )}
          <label
            className="block text-gray-700 text-md font-bold mb-2"
            htmlFor="start_date">
            Start Date
          </label>
          <input
            className="shadow appearance-none border rounded py-2 px-3 mb-3 text-gray-700 leading-tight focus:border-indigo-500 focus:ring-indigo-500"
            type="date"
            placeholder="MM/DD/YYYY"
            {...register('start_date', { required: true })}
            value={inputState.start_date}
            onChange={handleChange}
          />
          {errors.description && (
            <div>
              <ErrorIcon className="text-red-700 block mx-1 pb-1" />
              <p className="text-red-700 inline">Start Date is required</p>{' '}
            </div>
          )}
          <label
            className="block text-gray-700 text-md font-bold mb-2"
            htmlFor="length">
            Length of Habit
          </label>
          <div>
            <input
              className="shadow appearance-none border rounded py-2 px-5 mb-3 text-gray-700 leading-tight focus:border-indigo-500 focus:ring-indigo-500"
              type="number"
              min="0"
              max="100"
              {...register('length', { required: true })}
              placeholder="30"
              value={inputState.length}
              onChange={handleChange}
              style={{ display: 'inline' }}></input>
            <span className="ml-2">days</span>
          </div>
          {errors.length && (
            <p className="text-red-700">Length of Habit is required</p>
          )}
          <p className="block text-gray-700 text-md font-bold my-2">
            Will the habit aim to improve your sleep or activity?
          </p>
          <div className="flex items-center">
            <input
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              type="radio"
              {...register('area_of_improvement', { required: true })}
              id="Sleep"
              value="Sleep"
              style={{ display: 'inline' }}
              onChange={handleChange}
            />
            <label
              htmlFor="Sleep"
              className="ml-3 block text-md font-medium text-gray-700">
              Sleep
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              type="radio"
              {...register('area_of_improvement')}
              id="Activity"
              value="Activity"
              style={{ display: 'inline' }}
              onChange={handleChange}
            />
            <label
              htmlFor="Activity"
              className="ml-3 block text-md font-medium text-gray-700">
              Activity
            </label>
          </div>
          {errors.area_of_improvement && (
            <div className="pt-2">
              <ErrorIcon className="text-red-700 block mx-1 pb-1" />
              <p className="text-red-700 inline">
                A Habit needs to target either Sleep or Activity
              </p>
            </div>
          )}

          {habits.length > 0 && (
            <>
              <p className="block text-gray-700 text-md font-bold my-2">
                Do you want to set this as your current habit?
              </p>
              <div className="flex items-center">
                <input
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  type="radio"
                  {...register('main_habit')}
                  id="true"
                  value="true"
                  style={{ display: 'inline' }}
                  onChange={handleChange}
                />
                <label
                  htmlFor="true"
                  className="ml-3 block text-md font-medium text-gray-700">
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  type="radio"
                  {...register('main_habit')}
                  id="false"
                  value="false"
                  style={{ display: 'inline' }}
                  onChange={handleChange}
                />
                <label
                  htmlFor="false"
                  className="ml-3 block text-md font-medium text-gray-700">
                  No
                </label>
              </div>{' '}
            </>
          )}
          <br></br>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
export default HabitForm;
