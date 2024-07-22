import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import './login.css'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png'
// import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserlLogin, getError, getIsUserLogin, getStatus } from '../../RTK/slices/userSlice';
import { STATUS } from '../../RTK/status';


export default function LogIn() {
  const status = useSelector(getStatus);
  const isUserLogin = useSelector(getIsUserLogin);
  const geterror = useSelector(getError);
  const dispatch = useDispatch()

  const [mail, setMail] = useState("")
  const [pass, setPass] = useState("")
  const navigate = useNavigate()


  const [emailError, setEmailError] = useState("");
  const [passError, setpassError] = useState("");
  const [errorMailOrPass, setErrorMailOrPass] = useState("");


  useEffect(() => {
    if (status === STATUS.SUCCEEDED && isUserLogin) {
      navigate("/profile");
    }
    if (status === STATUS.LOADING) {
      setErrorMailOrPass('loading . . . ');

    }
    if (status === STATUS.FAILD) {
      setErrorMailOrPass(geterror + '  try agin later ');
      setpassError('');
      setEmailError('');
    }
  }, [status, isUserLogin, geterror, navigate]);



  const expiresInMins = 30;
  const expiresInDays = expiresInMins / (60 * 24);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mail && pass) {
      try {
        dispatch(fetchUserlLogin({ mail, pass, expiresInMins, expiresInDays }))
      } catch {
        setErrorMailOrPass("An error occurred. Please try again later.");
      }
      console.log('status is ', status);
      console.log('isUserLogin is ', isUserLogin);
    }

    // try {
    //   const response = await fetch('https://dummyjson.com/user/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       username: mail,
    //       password: pass,
    //       expiresInMins: expiresInMins, // optional, defaults to 60
    //     })
    //   });

    //   const data = await response.json();
    //   if (response.ok) {
    //     console.log(data);
    //     // localStorage.setItem('token', data.token)
    //     Cookies.set('token', data.token, { expires: expiresInDays })
    //     navigate("/profile");
    //   } else {
    //     // Handling non-200 responses
    //     setErrorMailOrPass("The email or password is incorrect or empty");
    //     setpassError('');
    //     setEmailError('');
    //   }
    // } catch (error) {
    //   console.error("Error during login:", error);
    //   setErrorMailOrPass("An error occurred. Please try again later.");
    //   setpassError('');
    //   setEmailError('');
    // }
  };


  const handleBlurEmail = (e) => {
    if (e.target.value.trim() === "") {
      setEmailError("This field is required: Please enter your email");
      setErrorMailOrPass('')
    } else {
      setEmailError("");
    }
  };

  const handleBlurPass = (e) => {
    if (e.target.value.trim() === "") {
      setpassError("This field is required: Please enter your Password");
      setErrorMailOrPass('')
    } else {
      setpassError("");
    }
  }

  return (
    <>


      <Row className='parent'>
        {/* left */}
        <Col className='left p-4 col-lg-6 col-md-12 col-12'>
          <div className='logo rounded-circle mx-4'>
            <img src={logo} className=' img-fluid' alt="city mall logo " />
            <Link to={'acounts'}>acounts</Link>
          </div>

          <div className='login d-flex flex-column justify-content-center align-items-center'>
            <div className='text'>
              <h2>Login To Your Account</h2>
            </div>

            <form className='login-form p-3 my-2 d-flex flex-column ' onSubmit={handleSubmit} >
              {errorMailOrPass && <div className='error-message text-danger'>{errorMailOrPass}</div>}
              <div className='field my-4 d-flex justify-content-between align-items-center'>
                <label htmlFor="email" className='fs-3' >E-mail : </label>
                <input type='text' id='email' name='email' placeholder='EX: abc@example.com' autoComplete="username" onChange={(e) => { setMail(e.target.value); handleBlurEmail(e) }} onBlur={handleBlurEmail} />

              </div>
              {emailError && <div className='error-message text-danger'>{emailError}</div>}

              <div className='field my-4 d-flex justify-content-between align-items-center'>
                <label htmlFor="pass" className='fs-3'>Pass : </label>
                <input type='password' id='pass' name='pass' placeholder='Adjb#01@ab#' autoComplete='current-password' onChange={(e) => { setPass(e.target.value); handleBlurPass(e) }} onBlur={handleBlurPass} />
              </div>
              {passError && <div className='error-message text-danger'>{passError}</div>}
              <input type="submit" name="submit" value="Login" className='btn btn-primary mx-auto align-self-center' />
            </form>
            {/* <Link to={"/signup"} className='text-decoration-none ' > Create new account</Link> */}
          </div>
        </Col>
        {/* right */}
        <Col className='right col-lg-6 col-md-12 col-12 p-0'>
          {/* <img src={img} className='img-fluid' alt="000" /> */}
          <div className='overlay'>
          </div>
          <div className='signUp'>
            <div className='text text-light text-center'>
              <h1>New Here ?</h1>
              <p>Sign up and discover a great amount of new opportunities</p>
              <Link to={'/signup'} className='btn btn-primary btn-signup  mx-auto align-self-center'>Sign Up </Link>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
