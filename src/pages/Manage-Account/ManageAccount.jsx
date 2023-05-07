import { Box } from "@mui/material"
import React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const ManageAccount = () => {
  const [accountList, setAccountList] = useState([])

  const dispatch = useDispatch()
  const navigate = useNavigate()



  return (
    <Box sx={{ backgroundColor: "#fff", padding: 3, borderRadius: 3 }}>
      <div>ManageAccount</div>
    </Box>
  )
}

export default ManageAccount
