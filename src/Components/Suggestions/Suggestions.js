import React, { useEffect, useState } from 'react'
import './suggestion.css'
// import profileImg from '../../images/Picsart_22-08-28_04-42-23-038.jpg'
import BoxAcount from './BoxAcount'
import { Link } from 'react-router-dom'


function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// مثال لاستخدام الدالة
const randomNumber = getRandomNumber(1, 20);
console.log(randomNumber); 


export default function Suggestions() {
  const [SuggestionsUsers, setUsers] = useState({})
  useEffect(() => {
    fetch(`https://dummyjson.com/users?limit=6&skip=${randomNumber}&select=firstName,lastName,age,company,image`)
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
              return(
                <Link to={`profile/${user.id}`} key={user.id} className='text-decoration-none text-white'>
                  <BoxAcount profileImg={user.image} name={`${user.firstName} ${user.lastName}`} job={user.company.title} />
                </Link>
                ) 
              
            })
          }
        </div>
      </div>
    </>
  )
}
