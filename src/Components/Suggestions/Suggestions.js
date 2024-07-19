import React, { useEffect, useState } from 'react'
import './suggestion.css'
// import profileImg from '../../images/Picsart_22-08-28_04-42-23-038.jpg'
import BoxAcount from './BoxAcount'

export default function Suggestions() {
  const [SuggestionsUsers, setUsers] = useState({})
  useEffect(() => {
    fetch('https://dummyjson.com/users?limit=6&skip=10&select=firstName,lastName,age,company,image')
      .then(res => res.json())
      .then(data => {
        console.log(data.users)
        setUsers(data.users)
      });
  }, [])
  return (
    <>
      <div className='box p-3'>
        <h2>Some people :</h2>
        <div className='p-1'>
          {
            Array.isArray(SuggestionsUsers) && SuggestionsUsers.map((user) => {
              return <BoxAcount key={user.id} profileImg={user.image} name={`${user.firstName} ${user.lastName}`} job={user.company.title} />
            })
          }
        </div>
      </div>
    </>
  )
}
