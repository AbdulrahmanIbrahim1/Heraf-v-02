import React from 'react'
import './suggestion.css'
import profileImg from '../../images/Picsart_22-08-28_04-42-23-038.jpg'
import BoxAcount from './BoxAcount'

export default function Suggestions() {
  return (
    <>
      <div className='box p-3'>
        <h2>Some people :</h2>
        <div className='p-1'>
          <BoxAcount profileImg={profileImg} name={'Hazem Ali'} job={'Back-end developer'} />
          <BoxAcount profileImg={profileImg} name={'Abdo Ibrahim'} job={'Front-end developer'} />
          <BoxAcount profileImg={profileImg} name={'Hazem Ali'} job={'Back-end developer'} />
          <BoxAcount profileImg={profileImg} name={'Abdo Ibrahim'} job={'Front-end developer'} />
        </div>
      </div>
    </>
  )
}
