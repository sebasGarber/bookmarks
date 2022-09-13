import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';

import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormLogin from './FormLogin';
import RtlMaterialCont from '../../utils/RtlMaterialCont';
import FormNewUser from './FormNewUser';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      <Link color="inherit" href="https://github.com/sebasGarber/bookmarks">
        Bookmarks 2022 Sebas
      </Link>
    </Typography>
  );
}

const theme = createTheme();


export default function loginPageIndex() {

  const [newUserPage, setNewUserPage] = useState(false);
  const [newUserData, setNewUserData] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme} >
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url("img/maxresdefault.jpg")',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'left bottom',
          }}
        />
        <Grid item xs={12} sm={8} md={5} alignContent='center' component={Paper} elevation={6} square>
          <Box
            className="boxCont"
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {newUserPage ? <span>יצירת משתמש</span> : <span>התחברות</span>}
            </Typography>
            <Box component="form"  noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              
            
            {newUserPage ? <RtlMaterialCont content={ <FormNewUser setNewUserPage = {setNewUserPage} newUserData = {newUserData} setNewUserData={setNewUserData} /> } /> : <RtlMaterialCont content={ <FormLogin newUserData = {newUserData} /> } /> }

              <Grid container>
                <Grid item xs>
                  <Link className='buttonPages' href="#" variant="body2" onClick={() => setNewUserPage(!newUserPage)}>
                    {newUserPage ? <span>חזרה להתחברות</span> : <span>משתמש חדש?</span> }
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}