import { React, useContext, useRef } from 'react';
import "./login.css";
import { AuthContext } from '../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert'
import axios from 'axios';


const Login = () => {
const server =process.env.REACT_APP_SERVER;
//  setting the logged in boolean in localStorage
localStorage.setItem("loggedin",false)


  //----------------getting user input using useRef------------------------
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  //-----------------destructuring context exports--------------------------
  const { isFetching, dispatch, } = useContext(AuthContext);
  const alert = useAlert();


  //-----------------------handling login button-------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    const userCreds = {
      email: email.current.value,
      password: password.current.value
    }

    // try {
    const res = await axios.post(`${server}/api/auth/login`, userCreds);
    if (res.data.success) {
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user })
      localStorage.setItem('user', JSON.stringify(res.data.user));
      console.log(res.data.user)
      alert.show('Successfully Logged-in!',{type: 'success'});
      localStorage.setItem("loggedin",true)
      navigate('/home');
    } else {
      dispatch({ type: "LOGIN_FAILURE", payload: res.data.success })
      console.log(res.data.success);
      alert.show('Login with correct credentials!',{type: 'error'});
      localStorage.setItem("loggedin",false);
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
          <form className="loginBox" onSubmit={handleSubmit}>
            <input placeholder='Email' type="Email" required className="loginRightInput" ref={email} />
            <input placeholder='Password' type="Password" required minLength={3} className="loginRightInput" ref={password} />
            <button type='submit' disabled={isFetching} className="loginRightBtn">{isFetching ? <CircularProgress style={{ color: 'white', fontSize: '10px' }} /> : "Login"}</button>
            <span className="loginRightForgot">Forgot Password?</span>
          </form>
            <button onClick={()=>{navigate('/register')}} className="loginRightRegBtn">Create New Account</button>
        </div>
      </div>
    </div>
  )
}

export default Login