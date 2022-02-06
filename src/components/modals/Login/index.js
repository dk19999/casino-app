// import './index.css'
import { Button, Dialog, TextField } from '@mui/material';
import { createStyles } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';

const useStyles = makeStyles((theme) =>
  createStyles({
    form: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 40,
    },
    loginBtn: {
      marginTop: 20,
      backgroundColor: '#117A8B',
      textTransform: 'uppercase',
      color: 'white',
      padding: '10px 15px',
      borderRadius: 5,
    },
    formInput: {
      width: 300,
      margin: 10,
      height: 50,
      padding: 10,
    },
  })
);

export default function Login({ open, handleClose }) {
  const { userData, setUserData } = useContext(UserContext);
  const classes = useStyles();

  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const initialFormData = {email: '', password: '' }
  const [formData, setFormData] = useState(initialFormData);

  const isEmailValid = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = re.test(String(email).toLowerCase())

    return isValid;

    };

  const isPasswordValid = (password) => {
    return password.length > 8;
  };

  const handleLogin = (e) => {

    e.preventDefault();


    const { email, password } = formData;

    let error = '';
    if (!(email && password)) {
      error = 'Please enter both email and password';
    }

    if(!error && !isEmailValid(email)){
      error = 'Email is not valid'
    }

    if(!error && !isPasswordValid(password)){
      error = 'Password is not valid'
    }

    setError(error)

    if (error) {
      return;
    }

    const name = email.split('@')[0];


    
    setUserData((state) => ({ ...state, name, loggedIn: true }));
    setFormData(initialFormData)

    handleClose();

  };

  const onChange = (e) => {
    const { type, value } = e.target;

    setFormData((state) => ({ ...state, [type]: value }));
  };

  return (
    <>
      <div className="Login__wrapper">
        <Dialog maxWidth={'lg'} open={open} onClose={handleClose}>
          <form className={classes.form}>
            <input
              value={formData.email}
              onChange={onChange}
              type={'email'}
              className={classes.formInput}
              placeholder="Enter email"
            ></input>
            <input
              className={classes.formInput}
              value={formData.password}
              onChange={onChange}
              type={'password'}
              placeholder="Enter password"
            ></input>
            <button onClick={handleLogin} className={classes.loginBtn}>
              Login
            </button>
            {<span className='text-red'>{error}</span>}
          </form>
        </Dialog>
      </div>
    </>
  );
}
