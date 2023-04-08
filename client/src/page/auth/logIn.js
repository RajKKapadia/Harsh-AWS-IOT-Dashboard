import { Box, Button, Stack, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Input from '../../components/common/Input/input'
import BG_IMG from '../../components/Image/login-bg.jpeg'
import { useLogInUserMutation } from '../../redux/slice/userQuery'
import { setAuthToken } from '../../utils/helperFunction/helperFunction'


const useStyles = makeStyles((theme) => ({
  container: {
    width: '100vw',
    height: 'calc(100vh - 5rem)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  
  },
  formContainer: {
    width: '30rem',
    border: '1px solid',
    borderRadius: '0.3rem',
    padding: '3rem ',
    background: theme.palette.primary.contrastText,
    position:'absolute',
    right:'10rem',
    top:'20rem',
    height: 'fit-content',
  },
  actionbutton:{
    fontSize:'1.3rem'
  }
}))

const LogIn = () => {
  const [logInUser] = useLogInUserMutation()

  const styles = useStyles()
  const [form,updateForm] = useState({
    email:'',
    password:''
  })

  const onSubmit = () =>{
    logInUser(form).then(({data,error})=>{
      if(error){
        alert(error.data.message)
      }else{
       setAuthToken(data?.token)
       window.location.replace('/')
      }
    })
  }


  return (
    <Box sx={{ backgroundImage: `url(${BG_IMG})` }} className={styles.container}>
      <Stack className={styles.formContainer} spacing={'1rem'}>
        <Typography variant='h6' sx={{ mb: '1rem' }}>
          Log in
        </Typography>
        <Input label='Email' onChange={(value) => updateForm({ ...form, email: value })} />
        <Input label='Password' onChange={(value) => updateForm({ ...form, password: value })} />
        <Typography variant='subtitle1'>
          Don't have account yet? <Link to='/signup'>Sign-up</Link> here
        </Typography>
        <Button variant='contained' className={styles.actionbutton} onClick={()=>onSubmit()}>
          Sign-In
        </Button>
      </Stack>
    </Box>
  )
}

export default LogIn;
