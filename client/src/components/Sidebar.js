import "./Sidebar.css"
import Users from './Users'
import UserDisplay from './UserDisplay'


function Sidebar({users}){

    return (
        <>
        <div className="sidebar" >
            <h3>Suggested Users</h3>
        <ul className="sidebarFriendList">
            <Users user={users} />
        </ul>
        </div>
        </>


    )
}
export default Sidebar