import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

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
const Dashboard = () => {
  const styles = useStyles()
  const navigate = useNavigate()

  return (
    <Box>
      <Box className={styles.linkContainer}>
        {links?.map((item) => {
          return (
            <Button
              className={styles.linkButton}
              variant='outlined'
              onClick={() => {
                navigate(`/dashboard/${item?.id}`)
              }}>
              {item?.name}
            </Button>
          )
        })}
      </Box>
    </Box>
  )
}

export default Dashboard
