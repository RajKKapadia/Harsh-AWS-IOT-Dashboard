import { Box, Stack, Typography } from "@mui/material";
import { NavLink } from 'react-router-dom'
import { isLoggedIn, loggedOut } from "../../utils/helperFunction/helperFunction";


import useStyles from "./navBar.styles";

const Navbar = () => {
    const styles = useStyles();
    const isUserLoggedIn = isLoggedIn();
   
    const onLogOut = () =>{
      loggedOut();
      window.location.reload();
    }

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
