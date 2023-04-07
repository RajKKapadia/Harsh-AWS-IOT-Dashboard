import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useEffect, useState } from 'react'
import Input from '../../../../components/Input/input'
import { useAddMachineMutation, useUpdateMachineMutation } from '../../../../redux/slice/machineQuery'

const useStyles = makeStyles((theme) => ({
  inputLabel: {
    color: 'red',
  },
}))

const MachineForm = ({ getAllMachine, setModalStatus, machineById, modalStatus }) => {
  const styles = useStyles()
  const [addMachine] = useAddMachineMutation({
    fixedCacheKey: 'add-machine',
  })
  const [updateMachine] = useUpdateMachineMutation({
    fixedCacheKey:'update-machine'
  })
  const [form, updateForm] = useState({
    name: '',
    type: '',
    machineId: '',
    maker: '',
  })

  useEffect(() => {
    if(modalStatus?.isEdit){
       updateForm(machineById)
    }
  }, [machineById])

  const onSubmit = () => {
    if(modalStatus?.isEdit){
      updateMachine({body:form,id:machineById?._id}).then(({data,error})=>{
        getAllMachine()
        if (!error) {
          setModalStatus({ isOpen: false, isEdit: false })
        }
      })
    }else{
       addMachine(form).then(({ data, error }) => {
         getAllMachine()
         if (!error) {
           setModalStatus({ isOpen: false, isEdit: false })
         }
       })
    }
   
  }
  console.log('form:::::::',form)
  return (
    <Box>
      <Typography variant='h4' sx={{ borderBottom: '1px solid', padding: '1rem' }}>
        Add Machine
      </Typography>
      <Stack sx={{ p: '1rem' }} spacing='1.2rem'>
        <Input label='Machine Id' onChange={(value) => updateForm({ ...form, machineId: value })} value={form?.machineId}/>
        <Input label='Machine Name' onChange={(value) => updateForm({ ...form, name: value })} value={form?.name}/>
        <Input label='Machine Maker' onChange={(value) => updateForm({ ...form, maker: value })} value={form?.maker}/>
        <Input label='Machine Type' onChange={(value) => updateForm({ ...form, type: value })} value={form?.type}/>
        <Button variant='contained' sx={{ fontSize: '1.3rem' }} onClick={() => onSubmit()}>
         {modalStatus?.isEdit ?'Update':'Add'}
        </Button>
      </Stack>
    </Box>
  )
}

export default MachineForm
