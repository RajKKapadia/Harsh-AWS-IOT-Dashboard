import { Box, Button, Stack, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Input from '../../components/common/Input/input'
import BG_IMG from '../../components/Image/login-bg.jpeg'
import { useAddUserMutation } from '../../redux/slice/userQuery'

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
    position: 'absolute',
    right: '10rem',
    top: '12rem',
    height: 'fit-content',
  },
  actionbutton: {
    fontSize: '1.3rem',
  },
}))

const Signup = () => {
  const [addUser] = useAddUserMutation()

  const styles = useStyles()
  const [form,updateForm] = useState({
    name:'',
    email:'',
    password:'',
    confirm_password:''
  })

  const onSubmit = () =>{
    if(form?.password !== form?.confirm_password){
      alert('password not matched')
    }else{
      const payload = {
        name:form?.name,
        email:form?.email,
        password:form?.password,
        role:'ADMIN'
      }
      addUser({body:payload})
    }
  }


  return (
    <Box sx={{ backgroundImage: `url(${BG_IMG})` }} className={styles.container}>
      <Stack className={styles.formContainer} spacing={'1rem'}>
        <Typography variant='h6' sx={{ mb: '1rem' }}>
          Sign Up
        </Typography>
        <Input label='Name' onChange={(value) => updateForm({ ...form, name: value })} />
        <Input label='Email' onChange={(value) => updateForm({ ...form, email: value })} />
        <Input label='Password' onChange={(value) => updateForm({ ...form, password: value })} />
        <Input label='Confirm Password' onChange={(value) => updateForm({ ...form, confirm_password: value })} />
        <Typography variant='subtitle1'>
          Already have an account? <Link to='/login'>Sign-in</Link> here
        </Typography>
        <Button variant='contained' className={styles.actionbutton} onClick={()=>onSubmit()}>
          Sign-up
        </Button>
      </Stack>
    </Box>
  )
}

export default Signup
