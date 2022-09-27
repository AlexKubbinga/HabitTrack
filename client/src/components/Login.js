import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import oura from '../imgs/ouraLogo.png';

function Login() {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-center content-center text-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-60 w-96 h-96 ">
        <h1 className="text-center text-2xl font-extrabold text-blue-500">
          {' '}
          Welcome to HabitTrack
        </h1>
        <p className="text-xs text-gray-500">
          <em>making wearables more useful since '22</em>
        </p>
        <p className="mt-16 mb-4 font-extrabold text-black">
          {' '}
          Log in with Oura:
        </p>
        <button className="" onClick={() => navigate('/dashboard')}>
          <img
            src={oura}
            alt="oura"
            className="h-16 w-16 rounded-lg"
            title="www.ouraring.com/login"
          ></img>
        </button>
      </div>
    </div>
  );
}

export default Login;
