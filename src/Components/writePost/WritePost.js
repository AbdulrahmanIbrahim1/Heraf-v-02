import React from 'react'
// import profileImg from '../../images/Picsart_22-08-28_04-42-23-038.jpg'
import './writePost.css'
import { Row } from 'react-bootstrap'
export default function WritePost({image}) {
  return (
    <>
      <div className='box p-3'>
        <Row className='d-flex align-item-center' >
          <div className=' col-lg-2'>
            <img src={image} alt="profile" className='img-profile-post img-fluid rounded-circle  mx-auto' />
          </div>

          <div className=' col-lg-8 rounded-pill d-flex align-items-center'>
            <div className='add-post btn btn-primary px-3 py-2 rounded-pill d-flex align-items-center justify-content-center'>
              add new post
            </div>
          </div>
        </Row>
        {/* <Row className='p-3'>
          <div className='icon col-lg-4'>
            1
          </div>
          <div className='icon col-lg-4'>
            2
          </div>
          <div className='icon col-lg-4'>
            3
          </div>
        </Row> */}
      </div>
    </>
  )
}
