import React from 'react'
import { Button } from 'react-bootstrap'

export default function BoxAcount({ profileImg, name, job }) {
  return (
    <>
      <div className='box-account d-flex align-items-center justify-content-between  flex-sm-column flex-lg-row '  >
        <div className=' col-lg-2'>
          <img src={profileImg} alt="profile" className='img-profile-post img-fluid rounded-circle  mx-auto' />
        </div>
        <div className='box-account-text text-center '>
          <h3>{name}</h3>
          <p>{job}</p>
        </div>
        <Button> Follow </Button>
      </div>
    </>
  ) 
}
