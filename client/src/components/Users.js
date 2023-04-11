import React, {useState, useEffect} from 'react'
import Profile from './Profile'
import UserDisplay from './UserDisplay' 


function Users() {
    const [users, setUsers] = useState([])
    
    useEffect(() => {
        fetch('/users')
          .then(r => r.json())
          .then(data => setUsers(data))
      },[])
    
        return (
            <div >
                 {users?.map(user => <UserDisplay key={user.id} user={user}  />)}
        </div>
        )
      }
      
    export default Users