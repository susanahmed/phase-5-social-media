
import {Link} from 'react-router-dom'
import styled from 'styled-components'

function PostCard({post}){
    const {file, id} = post
    return (
        // <Card id={id}>
            <Link to = {`/posts/${id}`}>
                <div>
                    <p>{file}</p>
                    <img src = "https://techresearchonline.com/wp-content/uploads/2022/08/Zetaplus-%F0%9F%87%B9%F0%9F%87%AC-on-Twitter.webp" />
                </div>
            </Link>
            // {/* </Card> */}
    )
}

export default PostCard

// const Card = styled.li`
// display:flex;
// flex-direction:row;
// justify-content:start;
// font-family:Arial, sans-serif;
// margin:5px;
// &:hover {
//   transform: scale(1.15);
//   transform-origin: top left;
// }
// a{
//   text-decoration:none;
//   color:white;
// }
// img{
//   width: 180px;
//   margin-left:50%;
//   mask-image: linear-gradient(to left, rgba(0, 0, 0, .9) 80%, transparent 100%);
// }
// position:relative;
// div{
//  position:absolute;
// }
// `