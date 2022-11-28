import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import oura from '../imgs/ouraLogo.png';
import { oAuthRequest } from '../apiService';

function Login() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard');
  };

  const handleClickRegister = () => {
    navigate('/register');
  };

  const handleClickLogin = () => {};

  return (
    <div className="w-full flex justify-center content-center text-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-60 w-96 h-96 ">
        <h1 className="text-center text-2xl font-extrabold text-blue-500">
          Welcome to HabitTrack
        </h1>
        <p className="text-xs text-gray-500">
          <em>making wearables more useful since '22</em>
        </p>
        <p className="text-[14px] text-gray-300">Current integrations:</p>
        <img
          src={oura}
          alt="oura"
          className="h-16 w-16 rounded-lg mx-auto my-2"
          title="Oura Ring"></img>

        <div className="buttonContainer flex-col flex">
          <button
            onClick={() => handleClickRegister()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border w-1/2 mx-auto my-2">
            Register
          </button>
          <button
            onClick={() => handleClick()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border w-1/2 mx-auto my-2">
            Login
          </button>
          <button
            onClick={() => handleClick()}
            className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border w-1/2 mx-auto my-2">
            See Demo
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;

// <p className="mt-16 mb-4 font-extrabold text-black">
//           Log in with Oura:
//         </p>
//         <a href="https://cloud.ouraring.com/oauth/authorize?response_type=code&client_id=PFJ3IHOSIJDUSZCQ&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2FouraCallback&state=userAuth">
//           <button className="">
// <img
//   src={oura}
//   alt="oura"
//   className="h-16 w-16 rounded-lg"
//   title="www.ouraring.com/login"></img>
//           </button>
//         </a>
