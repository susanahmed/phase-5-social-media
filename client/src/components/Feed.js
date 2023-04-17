import './Feed.css'
import PostCont from "./PostCont"

function Feed({posts, handleDelete}) {
  console.log(posts)
    return (
        <>
        <div >
      <div>
        <PostCont posts={posts} handleDelete={handleDelete}/>
      </div>
    </div>
        </>
    )
}

export default Feed