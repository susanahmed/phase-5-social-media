
import {Link} from 'react-router-dom'
import styled from 'styled-components'

function PostCard({posts}){
    const {description, file, id} = posts
    return (
        <Card id={id}>
            <Link to = {`/posts/${id}`}>
                <div>
                    <h3>{description}</h3>
                    <p>{file}</p>
                </div>
            </Link>
            </Card>
    )
}

export default PostCard

const Card = styled.li`
display:flex;
flex-direction:row;
justify-content:start;
font-family:Arial, sans-serif;
margin:5px;
&:hover {
  transform: scale(1.15);
  transform-origin: top left;
}
a{
  text-decoration:none;
  color:white;
}
img{
  width: 180px;
  margin-left:50%;
  mask-image: linear-gradient(to left, rgba(0, 0, 0, .9) 80%, transparent 100%);
}
position:relative;
div{
 position:absolute;
}
`