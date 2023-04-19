import React, {useState, useEffect, useContext} from 'react'
import {AddContext} from './Profile'
import UserDisplay from './UserDisplay' 


function Users({friendsCount, handleAddClick}) {
    const [users, setUsers] = useState([])
    const freindsCount=useContext(AddContext)
    
    useEffect(() => {
        fetch('/users')
          .then(r => r.json())
          .then(data => setUsers(data))
      },[])
    
        return (
            <div >
                {users?.map(user => <UserDisplay key={user.id} user={user} handleAddClick={handleAddClick}  />)}
        </div>
        )
      }
      
    export default Users