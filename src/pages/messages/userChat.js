import React from 'react'
import img from '../../images/Picsart_22-08-28_04-42-23-038.jpg'


export default function UserChat({ name, lastMsg ='last message....',imag}) {
  return (
    <div className='users-chat text-white d-flex justify-content-between p-2 my-1'>
      <div className='text-user-chat'>
        <h3>{name}</h3>
        <p className='align-self-stretch text-white-50'>{lastMsg}</p>
      </div>
      <div className='img-profile img-user-chat d-flex align-items-center justify-content-center '>
        <img src={img} alt="profile" className='img-fluid rounded-circle ' />
      </div>
    </div>
  )
}
