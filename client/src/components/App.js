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
import '../index.css'

function App(){
    const [posts, setPosts] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        fetch('/posts')
        .then(r => r.json())
        .then(post_data => setPosts(post_data))
    },[]) 
    console.log(posts)

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
        <div className='background'>
        <Profile />
                <Switch>
                <Route path='/posts'>
                    <PostCont posts={posts} handleDelete={handleDelete}/>
                </Route>
                {/* <Route path='/posts'>
                    <IndividualPlaylist songs={songs} setRefresh={setRefresh} refresh={refresh} />
                </Route>
                <Route path='/playlists'>
                    <Playlists playlists={playlists} setRefresh={setRefresh} refresh={refresh} />
                </Route>
                <Route path='/songs/:id/edit'>
                    <EditSongForm updateSong={updateSong} />
                </Route>
                <Route path='/songs'>
                    <AllSongs songs={songs} handleDelete={handleDelete} />
                </Route> */}

                </Switch>
        </div>
    )
}
export default App