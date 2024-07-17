import React from 'react'
import profileImg from '../../images/Picsart_22-08-28_04-42-23-038.jpg'
import './SemiProfile.css'

export default function SemiProfile() {
  return (
    <>
      <div className='box '>
        <div className='box-content img-fluid p-3 '>
          <div className='img-profile mx-auto'>
            <img src={profileImg} alt="profile" className='img-fluid rounded-circle ' />
          </div>
          <h3 >Abdelrahman Ibrahim </h3>
          <p>frontend developer</p>
          <p>Cairo , Egypt</p>
        </div>
      </div>
    </>
  )
}
