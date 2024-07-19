import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import { Button, Container, Row } from 'react-bootstrap'
import './home.css'
import SemiProfile from '../../Components/semiProfile/SemiProfile'
import WritePost from '../../Components/writePost/WritePost'
import Suggestions from '../../Components/Suggestions/Suggestions'
import { Link } from 'react-router-dom'
import EmployPosts from '../../Components/EmployPosts/EmployPosts'
import ClientPosts from '../../Components/ClientPosts/ClientPosts'

export default function Home() {

  const [posts, setPosts] = useState('employ')
  const [dataUser, setDataUser] = useState(null);


  useEffect(() => {
    /* providing token in bearer */
    fetch('https://dummyjson.com/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')} `,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setDataUser(data)
      });
  }, [])

  if (!dataUser) {
    return <div className='d-flex align-items-center '>
      <p>
        Loading...
      </p>
      <div className="spinner-border text-primary mx-3" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  }

  return (
    <>
      <div className='home '>
        <Header />
        <Container className='text-white'>
          <Row>
            <div className='col-lg-3 p-2 col-0 '>
              <Link to={'/profile'} className='text-decoration-none text-white' >
                <SemiProfile img={dataUser.image ? dataUser.image : ""}
                  name={`${dataUser.firstName} ${dataUser.lastName}`}
                  job={dataUser.company.title}
                  location={dataUser.address.country} />
              </Link>
            </div>
            <div className='col-lg-6 p-2 forPosts'>
              <WritePost image={dataUser.image}/>
              <div className='allPosts box my-2 p-2 '>
                <h3>Posts : </h3>
                <div className='d-flex justify-content-around p-2'>
                  <Button onClick={() => setPosts('employ')}>Employ</Button>
                  <Button onClick={() => setPosts('client')}>client</Button>
                </div>
                {/* posts here  */}
                <div className='postsHere'>
                  {posts === 'employ' && <EmployPosts />}
                  {posts === 'client' && <ClientPosts />}
                </div>
              </div>
            </div>
            <div className='col-lg-3 p-2 col-0'>
              <Suggestions />
            </div>

          </Row>
        </Container>
        <div className='overLay'></div>
      </div>
    </>
  )
}
