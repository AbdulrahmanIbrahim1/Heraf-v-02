import React, { useEffect, useState } from 'react'
import './empPosts.css'
import profileImg from '../../images/Picsart_22-08-28_04-42-23-038.jpg'
import { Button } from 'react-bootstrap'

export default function EmployPosts({ bord, userId }) {
  const [posts, setPosts] = useState([])
  const [like, setlike] = useState(false)
  const [disLike, setDisLike] = useState(false)
  const apiLink = 'https://dummyjson.com/posts'

  useEffect(() => {
    if (userId) {
      /* getting posts by user with id 5 */
      fetch(`${apiLink}/user/${userId}`)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setPosts(data.posts)
        });
      } else {
        fetch(`${apiLink}`)
        .then(res => res.json())
        .then((data) => setPosts(data.posts));
        console.log(posts);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  if (posts.length===0) {
    return <div className="alert alert-primary m-3 text-center" role="alert">
      no posts yet
    </div>
  }
  
  return (<>
    <div>EmployPosts</div>
    <div className='postsEmp p-3'>
      {posts.map(post => (
        <div key={post.id} className={`post ${bord} p-3 my-3`}>
          <div className='d-flex align-items-center justify-content-around p-2'>
            <div className=' col-lg-2'>
              <img src={profileImg} alt="profile" className='img-profile-post img-fluid rounded-circle  mx-auto' />
            </div>
            <div>
              <h5>Abdelrahman Ibrahim</h5>
              <span>Front-end Developer</span>
            </div>
            <Button className={`bg-transparent ${bord ? 'text-black btn-folw-prof' : ''} color-primary`}> Follow </Button>
          </div>
          <div className='p-3'>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <div className={`reactions ${bord} d-flex justify-content-around`}>
              <div className='d-flex align-items-center flex-column'>
                {like ? <i className="fa-solid fa-heart fs-2" onClick={() => {
                  setlike(false)
                  // setDisLike(true)
                  console.log(`like is ${like}`);
                }
                }></i> :
                  <i className=" fa-regular fa-heart fs-2" onClick={() => {
                    setlike(true)
                    disLike ? setDisLike(false) : setDisLike(false)
                    console.log(like);
                  }
                  }></i>}
                <span>{post.reactions.likes}</span>
              </div>
              <div className='d-flex align-items-center flex-column '>
                {disLike ?
                  <i className="fa-solid fa-thumbs-down fs-2" onClick={() => {
                    setDisLike(false)
                    console.log(`diiiis ${disLike}`);
                  }}></i> :
                  <i className=" fa-regular fa-thumbs-down fs-2" onClick={() => {
                    setDisLike(true)
                    like ? setlike(false) : setlike(false)
                    console.log(`dislike ${disLike}`);
                  }}></i>
                }
                <span>{post.reactions.dislikes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </>
  )
}
