import React, { useRef,useContext } from 'react';
import { useAlert } from 'react-alert';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import "./register.css";


const Register = () => {
  const server =process.env.REACT_APP_SERVER;
  const navigate = useNavigate();
  const { isFetching, dispatch, } = useContext(AuthContext);

  //----------------getting user input using useRef------------------------
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  // ---------------------middleware for alert-----------------------------
  const alert = useAlert();

  //-----------------------handling register button-------------------------------    
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword.current.value !== password.current.value) {
      alert.show('Confirm password mismatch!', { type: 'error' });
    } else {
      dispatch({ type: "LOGIN_START" });
      const userCreds = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      }
      //sending req to register a user with creds
      const response = await axios.post(`${server}/api/auth/register`, userCreds);
      if (response.data.success) {
        console.log(response.data.user);
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data.user })
        localStorage.setItem('user', JSON.stringify(response.data.user));
        alert.show('Successfully Registered!', { type: 'success' });
        localStorage.setItem("loggedin", true)
        navigate('/home');
      } else {
        dispatch({ type: "LOGIN_FAILURE", payload: response.data.success })
        console.log(response.data.success);
        alert.show('Try again with unique details!', { type: 'error' });
        localStorage.setItem("loggedin", false);
      }
      // navigate('/login');
    }

  }

  return (
    <div className='login'>
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLeftLogo">FriendsAdda</h3>
          <span className="loginLeftDesc">
            Connect with your friends and the world around you on FriendsAdda.<br></br><br></br>
            <h5>Developer : Sankalp Sachan </h5>
          </span>
        </div>
        <div className="loginRight">
          <form onSubmit={handleSubmit} className="loginBox">
            <input
              ref={username}
              placeholder='Username'
              type="Text"
              className="loginRightInput" />
            <input
              ref={email}
              placeholder='Email'
              type="Email"
              className="loginRightInput" />
            <input
              ref={password}
              placeholder='Password'
              type="Password"
              className="loginRightInput"
              minLength={5} />
            <input
              ref={confirmPassword}
              placeholder='Confirm Password'
              type="Password"
              className="loginRightInput" />
            <button type='submit' className="loginRightBtn">{isFetching?<CircularProgress style={{ color: 'white', fontSize: '10px' }} />:"Sign Up"}</button>
          </form>
          <button onClick={() => { navigate('/') }} className="loginRightRegBtn">Login into Account</button>
        </div>
      </div>
    </div>
  )
}

export default Register