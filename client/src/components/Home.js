import React from 'react'
import styled from 'styled-components'
import './Home.css'

function Home(){
   
    return(
        <div className='background'>
            <h2 className="font-link">WELCOME TO TECHBOOK </h2>
            <h3 className="font-link">A COMMUNITY DESIGNED WITH TECH IN MIND</h3>
            <br/>
            <h2 className="font-link">About us:</h2>
            <p className="font-link"> TECHBOOK is a space created for tech professionals to collaborate, learn, and inspire each other. </p>
            <p className="font-link">Explore TECHBOOK now! </p>
            <img className="img" src="https://www.probytes.net/wp-content/uploads/2018/01/20.png" />
        </div>
        
    )
}

export default Home
