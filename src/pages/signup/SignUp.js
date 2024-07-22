import React, { useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import './signup.css'
import photoBack from '../../images/6c5a0fcf260285745079a57ca343b427.jpg'
import { Link } from 'react-router-dom'


export default function SignUp() {

  const [userName, setUserName] = useState('')
  const [pass, setPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [mail, setMail] = useState('')
  const [error, setError] = useState('')

  const handelChange = (type, e) => {
    switch (type) {
      case 'name':
        console.log(e.target.value);
        setUserName(e.target.value);
        setError('')
        break;
        case 'pass':
          console.log(e.target.value);
          setPass(e.target.value);
        setError('')
        break;
        case 'confirm':
          console.log(e.target.value);
        setConfirmPass(e.target.value);
        setError('')
        break;
        case 'mail':
          console.log(e.target.value);
        setMail(e.target.value);
        setError('')
        break;
      default:
        setError('all fields is required!! ')
      }
      if (e.target.value === '') {
        setError('all fields is required!! ')
      }
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    fetch('https://dummyjson.com/users/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username : mail,
        password:pass,
        firstName: userName,
        lastName: userName,
        age: 20,
        /* other user data */
      })
    })
      .then(res => res.json())
      .then(console.log);
  }

  return (
    <>
      <div className='color'>
      </div>
      <Container className='signup-cont'>
        <Row className='signup-row'>
          <div className='signup-left col-lg-4 position-relative'>
            <div className='overlay black-50'>
            </div>
            {/* <img src={photo} alt="" className='img-fluid' /> */}
          </div>
          {/* --- */}
          <div className='signup-right col-lg-8 d-flex justify-content-center align-items-center'>
            <Container className='d-flex justify-content-center align-items-center flex-column'>
              <div className='signup-text text-center'>
                <h2>Welcome to Heraf project </h2>
                <p>Already signed up? <Link to={'/login'}>Log in</Link></p>
                {error && <div className='error-message text-danger'>{error}</div>}
              </div>
              <form className='row gap-3 p-2' onSubmit={handleSubmit} method='POST'>
                {/* <div className='row p-2 '> */}
                {/* <label htmlFor="name" className='col-lg-6 text-center'>Name : </label> */}
                <input type="text" name="name" id='name' className='col-lg-12' placeholder='User Name' onChange={(e) => { handelChange('name', e) }} />
                {/* </div> */}
                {/* <div className='row p-2'> */}
                {/* <label htmlFor="mail" className='col-lg-6 text-center'>Email : </label> */}
                <input type="email" name="mail" id='mail' className='col-lg-12' placeholder='Email ex: example01@gmail.com' onChange={(e) => { handelChange('mail', e) }} />
                {/* </div> */}
                {/* <div className='row p-2'> */}
                {/* <label htmlFor="pass" className='col-lg-6 text-center'>PassWord : </label> */}
                <input type="tetx" name="pass" id='pass' className='col-lg-12' placeholder='Password ex :[A1b2@#1q]' onChange={(e) => { handelChange('pass', e) }} />
                {/* </div> */}
                {/* <div className='row p-2'> */}
                {/* <label htmlFor="confimpass" className='col-lg-6 text-center'>Confirm Password : </label> */}
                <input type="text" name="confimpass" id='confimpass' className='col-lg-12' placeholder='Confirm Password ex: [A1b2@#1q]' onChange={(e) => { handelChange('confirm', e) }} />
                {/* </div> */}
                <input type="submit" className='btn btn-primary' value="Sign UP" />
              </form>
            </Container>
          </div>
        </Row>
      </Container>
      <img src={photoBack} alt="" className='photoback' />
    </>
  )
}
