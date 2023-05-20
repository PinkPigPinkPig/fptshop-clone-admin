import { Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import homepageImg from '../../assets/icon/Smartthings.avif'
import './Home.scss'

const Home = () => {
  const dispatch = useDispatch()
 
  return (
    <div className='container'>
      <div className="image">
        <img src={homepageImg} width="630px" />
      </div>
    </div>
  )
}

export default Home