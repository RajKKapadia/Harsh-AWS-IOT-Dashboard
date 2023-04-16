import { Box, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { NavLink } from 'react-router-dom'
import { useGetProfileOfCurrentUserQuery } from "../../redux/slice/userQuery";
import { isLoggedIn, loggedOut } from "../../utils/helperFunction/helperFunction";


import useStyles from "./navBar.styles";

const Navbar = () => {
    const styles = useStyles();
    const isUserLoggedIn = isLoggedIn();

    const {data:userProfile,isError:profileApiError}= useGetProfileOfCurrentUserQuery('profile',{
      skip:!isLoggedIn()
    })
   
    const onLogOut = () =>{
      loggedOut();
      window.location.replace('/login');
    }

    useEffect(()=>{
      if(profileApiError){
        onLogOut()
      }
    },[profileApiError])


    return (
      <Box className={styles.container}>
        <Stack direction='row' sx={{ alignItems: 'center' }}>
          <Typography variant='h4' sx={{ fontWeight: '500' }}>
            VISCON
          </Typography>
          <Box className={styles.linkContainer}>
            <NavLink to='/' className={styles.navLink}>
              Home
            </NavLink>
            {isUserLoggedIn && (
              <NavLink to='/dashboard' className={styles.navLink}>
                Dashboard
              </NavLink>
            )}
          </Box>
        </Stack>
        <Stack direction='row' sx={{ alignItems: 'center' }}>
          {isUserLoggedIn ? (
            <Typography className={styles.navLink} onClick={() => onLogOut()}>
              Log out
            </Typography>
          ) : (
            <NavLink to='/login' className={styles.navLink}>
              Log In
            </NavLink>
          )}
        </Stack>
      </Box>
    )
};

export default Navbar;
