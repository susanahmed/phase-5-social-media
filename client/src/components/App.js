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
import UserProfile from './UserProfile'
import Messages from './Messages'
import MessageList from './MessageList'
import NewMessage from './NewMessage'
import MessageDetail from './MessageDetail'

export const PostContext = React.createContext()

function App({ users, comment}){
    const [messages, setMessages] = useState([])
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
        fetchMessages()
    },[])

    const fetchMessages = () => (
      fetch('/messages')
      .then((r) => r.json())
      .then((messages) => setMessages(messages))
    )

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

    function addPost(newPost) {
    setPosts([newPost, ...posts]);
    }

    function addComment(comment) {
      setComments([comment, ...comments]);
    }

    function updatePost(updatedPost){
        const updatedPosts = posts.map(oldPost => {
            if (oldPost.id === updatePost.id)
            return updatedPost;
            else
            return oldPost;
        })
        setPosts(updatedPosts);
        setRefresh(!refresh);
    }


  // function handleAddMessage(newMessage){
  //     setMessages([...messages, newMessage])
  // }

  function handleDelete(id) {
    fetch(`posts/${id}`, {
      method: "DELETE",
    }) .then((r) => {
      if (r.ok) {
        setPosts((postData) =>
        posts.filter((post) => post.id !== id)
        );
        setRefresh(prev => !prev)
    
      }
    })
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
            <PostDetail handleDelete={handleDelete} updatePost={updatePost} />
            </Route>
            <Route path= '/users/:id'>
                <UserProfile user={users} posts={posts}/>
            </Route>
            <Route path= '/users'>
                <Users user={users} />
            </Route>
            {/* <Route path= '/messages'>
              <NewMessage message={messages}/>
                <MessageList messages={messages} setMessages={setMessages} />
            </Route> */}
            <Route path = '/posts'>
              <PostCont posts={posts} handleDelete={handleDelete} setRefresh={setRefresh} setPosts={setPosts}/>
          
            </Route>
            <Route path = '/login'>
                <Login />
            </Route>
            <Route path= '/feed'>
                <Feed posts = {posts} handleDelete={handleDelete}/>
            </Route>
            <Route path= '/comments'>
                <Comments comments={comments} users={users}/>
            </Route>
            {/* <Route path= '/posts/:id/edit'>
                <EditPostForm updatePost = {updatePost} posts = {posts}/>
            </Route>       */}
            <PostContext.Provider value = {posts} >
            <Route exact path='/profile'>
              <Profile user={user} setUser={setUser} handleDelete={handleDelete} setRefresh={setRefresh} refresh={refresh} setPosts={setPosts} addPost={addPost}/>
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