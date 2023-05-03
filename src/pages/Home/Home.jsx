import { Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'

const Home = () => {
  const dispatch = useDispatch()
  const handleClcik = () => {
    
  }
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}

export default Home