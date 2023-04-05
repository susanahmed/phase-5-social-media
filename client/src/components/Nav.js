import { useState } from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import { ImMenu3 } from 'react-icons/im'

function Navigation() {
    const [menu, setMenu] = useState(false)
    
    return(
        <Nav>
            <Menu>
                {!menu?
                <div onClick= {() => setMenu(!menu)}>
                    <ImMenu3 size={50} />

                </div>:
                <ul>
                    <li onClick={() => setMenu(!menu)}>x</li>
                    <li><Link to= '/profile'>My Profile</Link></li>
                    <li><Link to= '/feed'>Feed</Link></li>
                    <li><Link to= '/posts'>My Posts</Link></li>
                    </ul>
                    }
            </Menu>
        </Nav>
    )
}

export default Navigation;

const Nav = styled.div`
  display: flex;
  justify-content:space-between;
  
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  font-family:Arial;
  a{
    text-decoration: none;
    color: black;
  }
  a:hover{
    color:grey
  }
  ul{
    list-style:none;
  }
  
`;