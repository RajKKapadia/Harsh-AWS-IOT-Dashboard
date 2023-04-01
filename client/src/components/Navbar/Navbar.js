import { Box, Stack, Typography } from "@mui/material";
import { NavLink } from 'react-router-dom'


import useStyles from "./navBar.styles";

const Navbar = () => {
    const styles = useStyles();
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
            <NavLink to='/dashboard' className={styles.navLink}>
              Dashboard
            </NavLink>
          </Box>
        </Stack>
      </Box>
    )
};

export default Navbar;
