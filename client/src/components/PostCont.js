import styled from 'styled-components'
import PostCard from './PostCard'


function PostCont({posts}) {

    return (
     <div>
         <CardContainer>
             {posts?.map(post => <PostCard  key={post.id} post={post}  />)}
         </CardContainer>
     </div>
    )
  }
  
export default PostCont

const CardContainer = styled.ul`
    display:flex;
    flex-direction:column;
`