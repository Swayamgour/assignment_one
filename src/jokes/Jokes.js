import React, { useState, useEffect } from 'react'
import './Jokes.css'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function Jokes() {

    const [list, setList] = useState([])
    const [newlist, setNewlist] = useState([])
    const [newUser, setNewUser] = useState()
    const [newUsers, setNewUsers] = useState()
    const [open, setOpen] = useState(false);


    const handleClose = () => {
        setOpen(false);
        setNewUser(newUser)
    }
    const nextjoke = () => {

        setNewUsers(newlist)
    }

    useEffect(() => {
        fetch('https://api.chucknorris.io/jokes/categories')
            .then((res) => res.json())
            .then((data) => setList(data))
    }, [])

    useEffect(() => {
        fetch(`https://api.chucknorris.io/jokes/random?${newUser}`)

            .then((res) => res.json())
            .then((data) => setNewlist([data]))
    }, [newUser , newUsers])

    const handleClickOpen = (item) => {
        setOpen(true);
        setNewUser(item)
    }

    return (
        <>
            <div className="animation-container">
                <h1 className="up-down-animation">Chuck Norries</h1>
            </div>
            <div>
                {list.map((item, i) =>
                    <span  key={i} className='categories'><button style={{ color: 'black', border: '1px solid black', marginBottom: '40px' }} onClick={() => handleClickOpen(item)} className='jokes_button'>{item}  <p style={{ fontSize: '12px', marginRight: '0%', marginTop: '10%' }}>Unlimited Jokes On {item}</p></button> </span>

                )}
            </div>


            <div>

                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Modal title
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                    </IconButton>
                    <DialogContent dividers>


                        <Typography gutterBottom>

                            <div style={{fontSize:'30px' , display:'flex'}}>{newUser}

                            <Button style={{ marginLeft: '70%' }} autoFocus onClick={handleClose}>
                                <CloseIcon />
                            </Button>
                            </div>
                            {
                                newlist.map((x) =>
                                    <h1>{x.value}</h1>)
                            }
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={nextjoke}>
                            Next joke
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            </div>

        </>
    )
}

export default Jokes;