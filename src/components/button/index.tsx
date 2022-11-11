import React from "react";
import Button from '@mui/material/Button'

interface MyButtonInterface {
    onClick: () => void,
    disabled: boolean
}

const MyButton = ({ onClick, disabled }: MyButtonInterface) => {
    return <Button variant="contained" disabled={disabled} onClick={onClick}>Show Weather Info</Button>
}

export default MyButton;