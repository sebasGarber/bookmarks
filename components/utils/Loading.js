import React from 'react'

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading(props) {

    const {open, noBackdrop } = props;

    if(noBackdrop) {

      return (
        <Backdrop
        
            sx={{  background: '#ffffff2e',color: '#1589A7', fontSize: '50px', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={ open }   > {/* onClick={handleClose} */}

            <CircularProgress color='inherit' size={100} />
        </Backdrop>

      )

    }

    else {

      return (
        <Backdrop
        
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={ open }   > {/* onClick={handleClose} */}
    
            <CircularProgress color="inherit" />
        </Backdrop>
      )

    }
 
}
