import {useParams, useHistory} from 'react-router-dom'
import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import PostCard from './PostCard'

function PostDetail({post}){
  console.log(post)
    const {id, title, description, file, likes, comments} = post
 
    return (
      <>
      <Link to={`/posts/${id}`}> 
      <PostCard  key={post.id} post={post}/>
      </Link>
      </>

    )
}

export default PostDetail