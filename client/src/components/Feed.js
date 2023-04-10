import './Feed.css'
import Post from "./Post"
import PostCont from "./PostCont"

function Feed({posts, handleDelete}) {
    return (
        <>
        <div className="feed">
      <div className="feedWrapper">
        {/* {posts?.map((p) => (
          <Post key={p.id} post={p} />
        ))} */}
        <PostCont posts={posts} handleDelete={handleDelete}/>
      </div>
    </div>
        </>
    )
}

export default Feed