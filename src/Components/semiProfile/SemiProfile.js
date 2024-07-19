import React from 'react'
// import profileImg from '../../images/Picsart_22-08-28_04-42-23-038.jpg'
import './SemiProfile.css'

export default function SemiProfile({img , name , job , location}) {
  return (
    <>
      <div className='box '>
        <div className='box-content img-fluid p-3 '>
          <div className='img-profile mx-auto'>
            <img src={img} alt="profile" className='img-fluid rounded-circle ' />
          </div>
          <h3>{name}</h3>
          <p>{job}</p>
          <p>{location}</p>
        </div>
      </div>
    </>
  )
}
