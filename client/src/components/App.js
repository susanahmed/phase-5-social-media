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

function App({handleDelete}){
    const [posts, setPosts] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [user, setUser] = useState(null) 

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

    function addPost(post) {
    setPosts([post, ...posts]);
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
        <Navigation user={user} setUser={setUser}/>
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
            {/* <Route exact path='/authentication'>
              <Authentication updateUser={updateUser}/>
            </Route> */}
            <Route exact path='/profile'>
              <Profile posts={posts} user={user} setUser={setUser} handleDelete={handleDelete} setRefresh={setRefresh} refresh={refresh}/>
            </Route>
            <Route path = '/posts'>
              <PostCont posts={posts} />
            </Route>
            <Route path = '/login'>
                <Login />
            </Route>
            <Route path= '/feed'>
                <Feed posts = {posts} />
            </Route>
            <Route path= '/posts/:id/edit'>
                <EditPostForm updatePost = {updatePost}/>
            </Route>
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