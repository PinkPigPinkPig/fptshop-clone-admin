import { Box } from "@mui/material"
import { ManageActions } from "ReduxSaga/Manage/ManageRedux"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"

const ManageOrder = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(ManageActions.getOrderRequest({
      data: {},
      callback: (res) => console.log({res})
    }))
  }, [])
  return (
    <Box sx={{ backgroundColor: "#fff", padding: 3, borderRadius: 3 }}>
      <div>ManageOrder</div>
    </Box>
  )
}

export default ManageOrder
