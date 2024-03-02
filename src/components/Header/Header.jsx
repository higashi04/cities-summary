import React from 'react'
import headerImg from '../../assets/ben-o-bro-wpU4veNGnHg-unsplash.jpg' 
import './Header.css';

const Header = () => {
  return (
    <div className='imgContainer'>
      <img className='img-fluid' src={headerImg} alt="Cityscape" />
    </div>
  )
}

export default Header
