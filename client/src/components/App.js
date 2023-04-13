import React, {useEffect, useState} from 'react'
import { Route, Switch } from 'react-router-dom'
import {createGlobalStyle} from 'styled-components'
import Home from './Home'
import Login from './Login'
import Navigation from './NavBar'
import PostForm from './PostForm'
import Profile from './Profile'
import PostCont from './PostCont'
import PostCard from './PostCard'
import Feed from './Feed'
import '../index.css'
import PostDetail from './PostDetail'
import EditPostForm from './EditPostForm'
import Users from './Users'
import Comments from './Comments'

export const PostContext = React.createContext()

function App({handleDelete, users, comment}){
    const [posts, setPosts] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [user, setUser] = useState(null) 
    const [comments, setComments] = useState([])

    function post() {
      setPosts(prevPosts => !prevPosts)
    }

    useEffect(() => {
        fetchSession()
        fetchPosts()
    },[]) 

    const fetchPosts = () => (
        fetch('/posts')
        .then(r => r.json())
        .then(post_data => setPosts(post_data))
    )
    console.log(posts)

    const fetchSession = () => (
      fetch("/authorized")
      .then((r) => {
        if (r.ok) {
          r.json()
          .then((user) => {
            setUser(user)
        })
      } else {
        setUser(null)
    }
  })
    )

    if (!user) return <Login onLogin={setUser} />;

    function addPost(posts) {
    setPosts([posts, ...posts]);
    }

    function addComment(comment) {
      setComments([comment, ...comments]);
    }

    function updatePost(updatedPost){
        const updatedPosts = posts.map(post => {
            if (post.id === updatePost.id)
            return updatedPost;
            else
            return post;
        })
        setPosts(updatedPosts);
        setRefresh(!refresh);
    }

    return(
        <>
        <GlobalStyle />
        <Navigation user={user} setUser={setUser} users={users}/>
          <Switch>         
          <Route path='/home'>
              <Home />
            </Route>
          <Route path='/posts/:id'>
              <PostDetail post={posts}/>
            </Route>
            <Route path= '/posts'>
                <PostForm addPost={addPost} />
            </Route>
            <Route path= '/users'>
                <Users user={users} />
            </Route>
            {/* <Route exact path='/authentication'>
              <Authentication updateUser={updateUser}/>
            </Route> */}
            <Route path = '/posts'>
              <PostCont posts={posts} />
            </Route>
            <Route path = '/login'>
                <Login />
            </Route>
            <Route path= '/feed'>
                <Feed posts = {posts} />
            </Route>
            <Route path= '/comments'>
                <Comments comments={comments} />
            </Route>
            <Route path= '/posts/:id/edit'>
                <EditPostForm updatePost = {updatePost}/>
            </Route>            
            <PostContext.Provider value = {posts} >
            <Route exact path='/profile'>
              <Profile user={user} setUser={setUser} handleDelete={handleDelete} setRefresh={setRefresh} refresh={refresh}/>
            </Route>
            </PostContext.Provider>
            
          </Switch>
          
        </>
      )
    }

export default App

const GlobalStyle = createGlobalStyle`
    body{
      background-color: black; 
      color:white;
    }
    `