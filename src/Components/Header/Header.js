// import React, { useState } from 'react'()
import { Container, Nav, Navbar } from 'react-bootstrap'
import './Header.css'
import logo from '../../images/logo.png'
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {  logOut } from '../../RTK/slices/userSlice';


export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (Cookies.get('token')) {
      setIsLogin(true)
    }
  }, [isLogin])

  const handleLogOut = () => {
    // Cookies.remove('token')
    dispatch(logOut());
    navigate('/login');
  }

  return (
    <Navbar expand="lg" className="bg-primary">
      <Container>
        <div className='logo-1'>
          <Navbar.Brand href="/" className='text-white fw-bold'>
            <img src={logo} alt="" className='img-fluid' />
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className='text-white'>Home</Nav.Link>
            <Nav.Link href="category" className='text-white'>categories</Nav.Link>
            <Nav.Link href="about" className='text-white'> about us</Nav.Link>
            <Nav.Link onClick={() => {
              if (isLogin) handleLogOut()
            }} className='text-white'>{isLogin ? <i className="fa-solid fa-right-from-bracket"></i> : "login"}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
