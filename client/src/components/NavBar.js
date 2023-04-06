import {Link} from 'react-router-dom'
import { BsFillPersonFill, BsBellFill } from 'react-icons/bs'
import { BiMessageAltDetail, BiSearchAlt } from 'react-icons/bi'
import './NavBar.css'

function Navigation() {
    return(
        <>
        <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo"><Link to = '/home'>TECHBOOK</Link></span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <BiSearchAlt className="searchIcon" />
          <input
            placeholder="Search TechBook"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink"><Link to='/home'>Homepage</Link></span>
          <span className="topbarLink"><Link to='/feed'>Timeline</Link></span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <BsFillPersonFill />
            {/* <span className="topbarIconBadge">0</span> */}
          </div>
          <div className="topbarIconItem">
            <BiMessageAltDetail />
            {/* <span className="topbarIconBadge">0</span> */}
          </div>
          <div className="topbarIconItem">
            <BsBellFill />
            {/* <span className="topbarIconBadge">0</span> */}
          </div>
        </div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png" alt="" className="topbarImg"/>
      </div>
    </div>
        </>
    )
}
export default Navigation;

