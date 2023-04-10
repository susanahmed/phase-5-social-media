import styled from 'styled-components'
import PostCard from './PostCard'
import './PostCard.css'


function PostCont({posts, handleDelete}) {
console.log(posts)
    return (
     <div className='feed'>
        <div className="feedWrapper">
             {posts?.map(post => <PostCard key={post.id} post={post}  />)}
    </div>
     </div>
    )
  }
  
export default PostCont

