import React, {useEffect, useState} from 'react'
import { Route, Switch } from 'react-router-dom'
import {createGlobalStyle} from 'styled-components'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import Home from './Home'
import MessageForm from './MessageForm'
import Navigation from './Nav'
import PostCard from './PostCard'
import PostContainer from './PostContainer'
import PostForm from './PostForm'
import EditPostForm from './EditPostForm'

function App(){

    return(
        <>
        <h1>TECHBOOK</h1>
        <Navigation />
        </>
    )
}
export default App