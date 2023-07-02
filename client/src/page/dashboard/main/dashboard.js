import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useGetProfileOfCurrentUserQuery } from '../../../redux/slice/userQuery'

import useStyles from './dashboard.styles'
const links = [
  {
    name: 'Machines',
    id: 'machines',
  },
  {
    name: 'Clients',
    id: 'clients',
  },
  {
    name: 'Users',
    id: 'users',
  },
]

const getLinks = (role)=>{
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
const Dashboard = () => {
  const styles = useStyles()
  const navigate = useNavigate()
  const { data: userProfile } = useGetProfileOfCurrentUserQuery('profile')

  const links = getLinks(userProfile?.role)

  return (
    <Box>
      <Box sx={{ height: '3rem', background: '#dfe4ed' }}></Box>
      <Box className={styles.linkContainer}>
        {links?.map((item) => {
          if (item?.hide) return
          return (
            <Box
              className={styles.linkButton}
             
              onClick={() => {
                navigate(`/dashboard/${item?.id}`)
              }}>
              {item?.name}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default Dashboard
