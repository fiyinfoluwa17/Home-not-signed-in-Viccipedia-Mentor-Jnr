import React from 'react'
import './Hero.css'
import img1 from '../assets/images/Frame 10.png'
import { useAuth } from "../AuthContext";


const Hero = () => {

  const { user } = useAuth();

  return (
    <>
    <div className="liner">
    <div className='hero-container'>
    <div className="herotext">
        <h1>From You<br />To The World</h1>
        <p>Lorem ipsum dolor sit amet consectetur. Elementum diam volutpat ultrices nisi. Ligula eu aliquet sagittis sit. In justo lectus at rhoncus faucibus nulla sapien.</p>
        {user ? (
        <a className='clicker' href="/createblog">Create Blog</a>
      ) : (
        <a className='clicker' href="/signup">Get Started</a>
      )}
    </div>
    <div className="imageman"><img src={img1} alt="" /></div>
    </div>
    </div>
    </>
  )
}

export default Hero