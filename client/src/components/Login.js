import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate('/dashboard')} variant="contained">
      Click to Login
    </Button>
  );
}

export default Login;
