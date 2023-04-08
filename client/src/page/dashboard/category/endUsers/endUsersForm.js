import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useEffect, useState } from 'react'
import Input from '../../../../components/common/Input/input'
import { useAddClientMutation, useUpdateClientMutation } from '../../../../redux/slice/clientQuery'
import { useAddEndUserMutation, useUpdateEndUserMutation } from '../../../../redux/slice/endUserQuery'
import { useAddMachineMutation, useUpdateMachineMutation } from '../../../../redux/slice/machineQuery'

const useStyles = makeStyles((theme) => ({
  inputLabel: {
    color: 'red',
  },
}))

const EndUsersForm = ({ getAllEndUsers, setModalStatus, endUsersById, modalStatus }) => {
  const styles = useStyles()
  const [addEndUser] = useAddEndUserMutation({
    fixedCacheKey: 'add-end-user',
  })
  const [updateEndUser] = useUpdateEndUserMutation({
    fixedCacheKey: 'update-end-user',
  })
  const [form, updateForm] = useState({
    name: '',
    email: '',
    companyName: '',
    phone: '',
  })

  useEffect(() => {
    if(modalStatus.isEdit){
          updateForm(endUsersById)
    }

  }, [endUsersById])

  const onSubmit = () => {
    if (modalStatus?.isEdit) {
      updateEndUser({ body: form, id: endUsersById?._id }).then(({ data, error }) => {
        getAllEndUsers()
        if (!error) {
          setModalStatus({ isOpen: false, isEdit: false })
        }
      })
    } else {
      addEndUser(form).then(({ data, error }) => {
        getAllEndUsers()
        console.log("add client::::",error,!error)
        if (!error) {
          setModalStatus({ isOpen: false, isEdit: false })
        }
      })
    }
  }

  return (
    <Box>
      <Typography variant='h4' sx={{ borderBottom: '1px solid', padding: '1rem' }}>
        Add Machine
      </Typography>
      <Stack sx={{ p: '1rem' }} spacing='1.2rem'>
        <Input label='End-user Name' onChange={(value) => updateForm({ ...form, name: value })} value={form?.name} />
        <Input label='End-user Email' onChange={(value) => updateForm({ ...form, email: value })} value={form?.email} />
        <Input label='End-user Phone number' onChange={(value) => updateForm({ ...form, phone: value })} value={form?.phone} />
        <Input label='End-user Company' onChange={(value) => updateForm({ ...form, companyName: value })} value={form?.companyName} />
        <Button variant='contained' sx={{ fontSize: '1.3rem' }} onClick={() => onSubmit()}>
          {modalStatus?.isEdit ? 'Update' : 'Add'}
        </Button>
      </Stack>
    </Box>
  )
}

export default EndUsersForm
