import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import { Button, Container, Row } from 'react-bootstrap'
import './profile.css'
import EmployPosts from '../../Components/EmployPosts/EmployPosts'

// const userData = {
//   "id": 1,
//   "firstName": "Abdelrahman",
//   "lastName": "Ibrahim",
//   "job": "front-end developer",
//   "phone": '+201091532721',
//   "gender": "male",
//   "email": "emily.johnson@x.dummyjson.com",
//   "image": '../../images',
//   /* rest user data */
// }



export default function Profile() {
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


  const [posts, setPosts] = useState(true)
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
      <div className='prof-app'>
        <Header className='position-relative' />
        <Container>
          <Row className='landing'>
            <div className='left-text col-lg-6 col-md-12 col-12 '>
              <div className='text-prof '>
                <h3>{`${dataUser.firstName} ${dataUser.lastName}`}</h3>
                <p>{`Job : ${dataUser.company.title}`}</p>
                <p>{`Phone : ${dataUser.phone}`}</p>
                <p>{ }</p>
              </div>
            </div>
            {/* == */}
            <div className='right-img col-lg-6 col-md-12 col-12'>
              <div className='my-img img-fluid'>
                <img src={dataUser.image} alt="profile" className=' img-fluid rounded-circle  mx-auto' />
              </div>
            </div>
          </Row>
        </Container>
      </div>
      <div className='section1 p-3 '>
        <Container>
          <Row>
            <div className='col-6 col-lg-6 d-flex justify-content-center'>
              <Button className='btn btn-primary' onClick={() => setPosts(true)} >Posts</Button>
            </div>
            <div className='col-6 col-lg-6  d-flex justify-content-center'>
              <Button className='btn btn-primary' onClick={() => setPosts(false)} >Projects</Button>
            </div>
          </Row>
          <div>
            {
              posts ? <EmployPosts bord={'border-black'} userId={dataUser.id} /> : <Profile />
            }
          </div>
        </Container>
      </div>
    </>
  )
}
