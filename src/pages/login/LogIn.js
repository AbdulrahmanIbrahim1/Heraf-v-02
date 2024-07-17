import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import './login.css'
import { Link, useNavigate } from 'react-router-dom';



const apiLogin = {
  email: "test@gmail.com",
  pass: "A1234",
}





export default function LogIn() {
  const [mail, setMail] = useState("")
  const [pass, setPass] = useState("")
  const navigate = useNavigate()


  const [emailError, setEmailError] = useState("");
  const [passError, setpassError] = useState("");
  const [errorMailOrPass, setErrorMailOrPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mail === apiLogin.email && pass === apiLogin.pass) {
      navigate("/profile")
    } else {
      // window.alert("the email or pass is wrong")
      setErrorMailOrPass("the email or pass is wrong Or Empty")
      setpassError('')
      setEmailError('')
    }
  }

  const handleBlurEmail = (e) => {
    if (e.target.value.trim() === "") {
      setEmailError("This field is required: Please enter your email");
    } else {
      setEmailError("");
    }
  };

  const handleBlurPass = (e) => {
    if (e.target.value.trim() === "") {
      setpassError("This field is required: Please enter your Password");
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
            <img src="https://seeklogo.com/images/C/citymall-logo-B9F9982941-seeklogo.com.png" className=' img-fluid' alt="city mall logo " />
          </div>

          <div className='login d-flex flex-column justify-content-center align-items-center'>
            <div className='text'>
              <h2>Login To Your Account</h2>
            </div>

            <form className='login-form p-3 my-2 d-flex flex-column ' onSubmit={handleSubmit} >
              {errorMailOrPass && <div className='error-message text-danger'>{errorMailOrPass}</div>}
              <div className='field my-4 d-flex justify-content-between align-items-center'>
                <label htmlFor="email" className='fs-3' >E-mail : </label>
                <input type='email' id='email' name='email' placeholder='EX: abc@example.com' onChange={(e) => { setMail(e.target.value); handleBlurEmail(e) }} onBlur={handleBlurEmail} />

              </div>
              {emailError && <div className='error-message text-danger'>{emailError}</div>}

              <div className='field my-4 d-flex justify-content-between align-items-center'>
                <label htmlFor="pass" className='fs-3'>Pass : </label>
                <input type='password' id='pass' name='pass' placeholder='Adjb#01@ab#' onChange={(e) => { setPass(e.target.value); handleBlurPass(e) }} onBlur={handleBlurPass} />
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
