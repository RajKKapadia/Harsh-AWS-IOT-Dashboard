import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { RiDeleteBin6Line as DeleteIcon } from 'react-icons/ri'

const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.error.main,
    cursor:'pointer',
    padding:'0.2rem',
    borderRadius:'0.3rem',
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
}))

const DeleteButton = ({ width = '2rem', height = '2rem' }) => {
  const styles = useStyles()
  return (
    <Box sx={{ width: width, height: height }} className={styles.container}>
      <DeleteIcon />
    </Box>
  )
}


export default DeleteButton