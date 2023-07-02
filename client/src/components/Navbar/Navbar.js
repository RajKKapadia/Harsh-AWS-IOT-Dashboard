import { Box, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useGetProfileOfCurrentUserQuery } from '../../redux/slice/userQuery'
import { isLoggedIn, loggedOut } from '../../utils/helperFunction/helperFunction'

import useStyles from './navBar.styles'

const getLinks = (role) => {
  return [
    {
      name: 'Machines',
      id: 'machines',
    },
    {
      name: 'Clients',
      id: 'clients',
      hide: role === 'CLIENT' || role === 'USER' ? true : false,
    },
    {
      name: 'Users',
      id: 'users',
      hide: role === 'USER' ? true : false,
    },
  ]
}

const Navbar = ({ children }) => {
  const styles = useStyles()
  const isUserLoggedIn = isLoggedIn()
  const navigate = useNavigate()

  const { data: userProfile, isError: profileApiError } = useGetProfileOfCurrentUserQuery('profile', {
    skip: !isLoggedIn(),
  })
   

    const links = getLinks(userProfile?.role)

  const onLogOut = () => {
    loggedOut()
    window.location.replace('/login')
  }

  useEffect(() => {
    if (profileApiError) {
      onLogOut()
    }
  }, [profileApiError])

  return (
    <Box>
      <Box className={styles.container}>
        <Stack direction='row' sx={{ alignItems: 'center' }}>
          <Typography variant='h4' sx={{ fontWeight: '500', display: 'flex', alignItems: 'center' }}>
            <img src='/logo.png' height='40px'></img>
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
      {isUserLoggedIn && (
        <Box className={styles.sideBar}>
          <Box
            className={`${styles.sideBarItem} ${window.location.pathname === '/dashboard' ? styles.activeSideBarItem : ''}`}
            onClick={() => navigate('/dashboard')}>
            Dashboard
          </Box>
          <Box
            className={`${styles.sideBarItem} ${window.location.pathname === '/dashboard/machines' ? styles.activeSideBarItem : ''}`}
            onClick={() => navigate('/dashboard/machines')}>
            Machines
          </Box>
          <Box
            className={`${styles.sideBarItem} ${window.location.pathname === '/dashboard/clients' ? styles.activeSideBarItem : ''}`}
            onClick={() => navigate('/dashboard/clients')}>
            Client
          </Box>
          <Box
            className={`${styles.sideBarItem} ${window.location.pathname === '/dashboard/users' ? styles.activeSideBarItem : ''}`}
            onClick={() => navigate('/dashboard/users')}>
            {' '}
            User
          </Box>
        </Box>
      )}

      {isUserLoggedIn ? <Box className={styles.contentContainer}>{children}</Box> : <>{children}</>}
    </Box>
  )
}

export default Navbar
