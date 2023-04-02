import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { FaRegEdit as EditIcon } from 'react-icons/fa'

const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.primary.light,
    cursor: 'pointer',
    padding: '0.2rem',
    borderRadius: '0.3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

const EditButton = ({ width = '2rem', height = '2rem', onClick }) => {
  const styles = useStyles()
  return (
    <Box sx={{ width: width, height: height }} className={styles.container} onClick={() => onClick()}>
      <EditIcon />
    </Box>
  )
}

export default EditButton
