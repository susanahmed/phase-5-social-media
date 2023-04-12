import './Feed.css'
import PostCont from "./PostCont"

function Feed({posts, handleDelete}) {
    return (
        <>
        <div className="feed">
      <div className="feedWrapper">
        <PostCont posts={posts} handleDelete={handleDelete}/>
      </div>
    </div>
        </>
    )
}

export default Feed