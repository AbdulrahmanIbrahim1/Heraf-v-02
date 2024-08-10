import React, { useEffect, useState } from 'react'
// import Header from '../../Components/Header/Header'
import { Button, Container, Row } from 'react-bootstrap'
import './home.css'
import SemiProfile from '../../Components/semiProfile/SemiProfile'
import WritePost from '../../Components/writePost/WritePost'
import Suggestions from '../../Components/Suggestions/Suggestions'
import { Link, useNavigate } from 'react-router-dom'
import EmployPosts from '../../Components/EmployPosts/EmployPosts'
import ClientPosts from '../../Components/ClientPosts/ClientPosts'
import Cookies from 'js-cookie';

export default function Home() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState('employ')
  const [dataUser, setDataUser] = useState(null);
  const [showMessage, setShowMessage] = useState(false); // حالة لعرض الرسالة





  useEffect(() => {
    if (!Cookies.get('token')) {
      setShowMessage(true); // عرض الرسالة
      setTimeout(() => {
        navigate('/login'); // إعادة التوجيه بعد عرض الرسالة
      }, 3000); // عرض الرسالة لمدة 3 ثوانٍ
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/auth/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
          },
        });

        const data = await response.json();
        setDataUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };

    const refreshToken = async () => {
      try {
        const response = await fetch('https://dummyjson.com/auth/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refreshToken: `${Cookies.get('token')}`,
            expiresInMins: 30, // optional, defaults to 60
          })
        })

        const data = await response.json();
        if (response.ok) {
          Cookies.set('token', data.token, { expires: 7 });
        } else {
          console.error('Failed to refresh token:', data);
          navigate('/login');
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
        navigate('/login');
      }
    };

    // استدعاء دالة جلب بيانات المستخدم عند تحميل الكمبوننت
    fetchUserData();

    // تعيين دالة تجديد التوكين ليتم استدعاؤها كل 30 دقيقة
    const intervalId = setInterval(() => {
      refreshToken();
    }, 30 * 60 * 1000); // 30 دقيقة

    // تنظيف الـ interval عند إزالة الكمبوننت
    return () => clearInterval(intervalId);
  }, [navigate]);

  if (showMessage) {
    return (
      <div className='d-flex flex-column align-items-center'>
        <p className='alert alert-warning mt-3'>You must log in to access the web app. Redirecting to login page...
        </p>
        <div className="spinner-border text-primary mx-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!dataUser) {

    navigate('/login')
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
        {/* <Header /> */}
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
              <WritePost image={dataUser.image} text={"add new post"} />
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
