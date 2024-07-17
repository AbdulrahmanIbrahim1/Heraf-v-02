// import React, { useState } from 'react'()
import { Container, Nav, Navbar } from 'react-bootstrap'
import './Header.css'

export default function Header() {
  //const [isLogin  ] = useState(false)
  const isLogin = false;
  return (
    <Navbar expand="lg" className="bg-primary">
      <Container>
        <Navbar.Brand href="#home" className='text-white fw-bold'>Heraf</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className='text-white'>Home</Nav.Link>
            <Nav.Link href="category" className='text-white'>categories</Nav.Link>
            <Nav.Link href="about" className='text-white'> about us</Nav.Link>
            <Nav.Link href={isLogin ? "profile" : "login"} className='text-white'>profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
