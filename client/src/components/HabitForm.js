import { useState } from 'react';
import '../App.css';
import { createHabit } from '../apiService';

function HabitForm() {
  const initialState = {
    name: '',
    description: '',
    start_date: '',
    length: 30,
    area_of_improvement: '',
    main_habit: '',
  };

  const [state, setState] = useState(initialState);

  const validateForm = () => {
    return (
      !state.name ||
      !state.description ||
      !state.start_date ||
      !state.length ||
      !state.area_of_improvement ||
      !state.main_habit
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(state);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await createHabit(state);
    // if (!res) {
    // }
    setState(initialState);

    // props.setIsAuthenticated(true);
    // auth.login(() => navigate('/profile'));
  };

  return (
    <div className="createHabit">
      <h1>Create a new habit</h1>
      <div id="exampleHabit"></div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Habit Name</label>
        <input
          type="text"
          placeholder="Gratitude"
          name="name"
          value={state.name}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          type="text"
          placeholder="Write 3 things I am grateful for each day"
          value={state.description}
          onChange={handleChange}
        ></input>
        <label htmlFor="start_date">Start Date</label>
        <input
          type="date"
          placeholder="MM/DD/YYYY"
          name="start_date"
          value={state.start_date}
          onChange={handleChange}
        />
        <label htmlFor="length">Length of Habit</label>
        <div>
          <input
            type="number"
            min="0"
            max="100"
            name="length"
            placeholder="30"
            value={state.length}
            onChange={handleChange}
            style={{ display: 'inline' }}
          ></input>
          <span>days</span>
        </div>
        <p>Will the habit aim to improve your sleep or activity?</p>
        <input
          type="radio"
          name="area_of_improvement"
          id="Sleep"
          value="Sleep"
          style={{ display: 'inline' }}
          onChange={handleChange}
        />
        <label htmlFor="Sleep"> Sleep</label>&nbsp;
        <input
          type="radio"
          name="area_of_improvement"
          id="Activity"
          value="Activity"
          style={{ display: 'inline' }}
          onChange={handleChange}
        />
        <label htmlFor="Activity">Activity</label>
        <p>Do you want to set this as your current habit?</p>
        <input
          type="radio"
          name="main_habit"
          id="true"
          value="true"
          style={{ display: 'inline' }}
          onChange={handleChange}
        />
        <label htmlFor="true">Yes</label>&nbsp;
        <input
          type="radio"
          name="main_habit"
          id="false"
          value="false"
          style={{ display: 'inline' }}
          onChange={handleChange}
        />
        <label htmlFor="false">No</label>
        <br></br>
        <button type="submit" disabled={validateForm()}>
          Submit
        </button>
      </form>
    </div>
  );
}
export default HabitForm;

/*
import { useNavigate } from 'react-router-dom';

const initialState = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
};

const Register = (props) => {
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add logic to send send a request to the API service /register
    const email = e.target.email.value;
    const password = e.target.password.value;
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const details = { email, password, firstName, lastName };
    const res = await apiService.register(details);
    console.log(res);
    // This sets isAuthenticated = true and redirects to profile
    props.setIsAuthenticated(true);
    auth.login(() => navigate('/profile'));
  };



  return (
    <section>
      <h2>Register</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name@mail.com"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="supersecretthingy"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Name"
          name="firstName"
          value={state.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Nameson"
          name="lastName"
          value={state.lastName}
          onChange={handleChange}
        />
        <button className="form-submit" type="submit" disabled={validateForm()}>
          &nbsp;Register&nbsp;
        </button>
      </form>
    </section>
  );
};
*/
