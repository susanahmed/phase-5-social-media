import React, {useEffect, useState} from 'react'
import { Route, Switch } from 'react-router-dom'
import {createGlobalStyle} from 'styled-components'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import Home from './Home'
import MessageForm from './MessageForm'
import Navigation from './NavBar'
import PostCard from './PostCard'
import PostContainer from './PostContainer'
import PostForm from './PostForm'
import EditPostForm from './EditPostForm'
import Profile from './Profile'
import PostCont from './PostCont'
import Authentication from './SignupForm'
import Feed from './Feed'
import '../index.css'

function App(){
    const [posts, setPosts] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        fetchUser()
        fetchPosts()
    },[]) 

    const fetchPosts = () => (
        fetch('/posts')
        .then(r => r.json())
        .then(post_data => setPosts(post_data))
    )
    console.log(posts)

    const fetchUser = () => (
    fetch('authorized')
    .then(res => {
        if(res.ok){
            res.json()
            .then(data => {
                setUser(data)
            })
        } else {
            setUser(null)
        }
    })
    )

    const updateUser = (user) => setUser(user)
    // if(!user) return (
    //     <>
    //     <Authentication updateUser={updateUser} />
    //     </>
    // )

    function handleDelete(id) {
        fetch(`/posts/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        })
          .then(() => setRefresh(!refresh))
      }

      function addPost(post) {
        setPosts([post, ...posts]);
      }

    return(
        <>
        <GlobalStyle />
        <Navigation updateUser={updateUser}/>
          <Switch>
            {/* <Route path='/productions/new'>
              <ProductionForm addProduction={addProduction}/>
            </Route> */}
            <Route path='/posts/:id'>
                <PostCard />
            </Route>
            <Route path= '/newposts'>
                <PostForm addPost={addPost} />
            </Route>
            {/* <Route exact path='/authentication'>
              <Authentication updateUser={updateUser}/>
            </Route> */}
            <Route exact path='/profile'>
              <Profile posts={posts} addPost={addPost}/>
            </Route>
            <Route path = '/posts'>
              <PostCont posts={posts} addPost={addPost}/>
            </Route>
            <Route path = '/home'>
                <h1>WELCOME TO TECHBOOK</h1>
            </Route>
            <Route path= '/feed'>
                <Feed posts = {posts}/>
            </Route>
          </Switch>
        </>
      )
    }
    //     <div className='background'>
    //     <Profile />
    //             <Switch>
    //             <Route path='/posts'>
    //                 <PostCont posts={posts} handleDelete={handleDelete}/>
    //             </Route>
    //             {/* <Route path='/posts'>
    //                 <IndividualPlaylist songs={songs} setRefresh={setRefresh} refresh={refresh} />
    //             </Route>
    //             <Route path='/playlists'>
    //                 <Playlists playlists={playlists} setRefresh={setRefresh} refresh={refresh} />
    //             </Route>
    //             <Route path='/songs/:id/edit'>
    //                 <EditSongForm updateSong={updateSong} />
    //             </Route>
    //             <Route path='/songs'>
    //                 <AllSongs songs={songs} handleDelete={handleDelete} />
    //             </Route> */}

    //             </Switch>
    //     </div>
    // )
    //         }
export default App

const GlobalStyle = createGlobalStyle`
    body{
      background-color: black; 
      color:white;
    }
    `