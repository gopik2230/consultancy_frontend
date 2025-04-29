import React from 'react'
import {Typography} from '@mui/material';

export default function ErrorField({children}) {
    console.log("childrevn ",children)
  return (
    <Typography sx={{color:"red", fontSize:"12px"}}>{children}</Typography>
  )
}
