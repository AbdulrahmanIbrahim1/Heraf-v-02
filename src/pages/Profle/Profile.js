import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import { Button, Container, Row } from 'react-bootstrap'
import './profile.css'
import EmployPosts from '../../Components/EmployPosts/EmployPosts'
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom'
import WritePost from '../../Components/writePost/WritePost'
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

  const [ifmyprofile, setifmyprofile] = useState(true)
  const { id } = useParams()


  const navigate = useNavigate()
  const [posts, setPosts] = useState(true)

  const [dataUser, setDataUser] = useState(null);
  const [showMessage, setShowMessage] = useState(false); // حالة لعرض الرسالة

  useEffect(() => {
    console.log('Current ID:', id);
    console.log('Current ID type:', typeof id);
    if (!Cookies.get('token')) {
      setShowMessage(true); // عرض الرسالة
      setTimeout(() => {
        navigate('/login'); // إعادة التوجيه بعد عرض الرسالة
      }, 3000); // عرض الرسالة لمدة 3 ثوانٍ
      return;
    }

    if (id) {

      fetch(`https://dummyjson.com/users/${id}`)
        .then(res => res.json())
        .then(data => {
          console.log('data is ', data)
          setDataUser(data)
          setifmyprofile(false)
        });
    } else {
      fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
          // 'Authorization': `Bearer ${localStorage.getItem('token')} `,
          'Authorization': `Bearer ${Cookies.get('token')} `,
        },
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setDataUser(data)
        });
    }
  }, [navigate, id])

  if (showMessage) {
    return (
      <div className='d-flex flex-column align-items-center'>
        <p className='alert alert-warning mt-3'>
          You must log in to access the web app. Redirecting to login page...
        </p>
        <div className="spinner-border text-primary mx-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

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
          <Row className='py-3'>
            <div className={`col-6 col-lg-6  d-flex justify-content-center  ${!posts ? "align-items-start" : "align-items-center  flex-column"}`}>
              <Button className='btn btn-primary w-20 ' onClick={() => setPosts(true)} >Posts</Button>
              {posts && ifmyprofile && <div className='add-new-post w-5 my-2'>
                <WritePost img={false} text={"add new post"} />
              </div>}
            </div>
            <div className={`col-6 col-lg-6  d-flex justify-content-center  ${posts ? "align-items-start" : "align-items-center  flex-column"}`}>
              <Button className='btn btn-primary w-20 ' onClick={() => setPosts(false)} >Projects</Button>
              {!posts && ifmyprofile && <div className='add-new-post w-5 my-2'>
                <WritePost img={false} text={"add new project"} />
              </div>}
            </div>
          </Row>
          <div>
            {
              posts ?
                <EmployPosts bord={'border-black'} userId={dataUser.id} />
                : <div className="alert alert-primary m-3 text-center" role="alert">
                  No projects
                </div>
            }
          </div>
        </Container>
      </div>
    </>
  )
}
