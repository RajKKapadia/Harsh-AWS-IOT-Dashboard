import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useEffect, useState } from 'react'
import Input from '../../../../components/common/Input/input'
import { useAddClientMutation, useUpdateClientMutation } from '../../../../redux/slice/clientQuery'
import { useAddMachineMutation, useUpdateMachineMutation } from '../../../../redux/slice/machineQuery'

const useStyles = makeStyles((theme) => ({
  inputLabel: {
    color: 'red',
  },
}))

const ClientForm = ({ getAllClient, setModalStatus, clientById, modalStatus }) => {
  const styles = useStyles()
  const [addClient] = useAddClientMutation({
    fixedCacheKey: 'add-client',
  })
  const [updateClient] = useUpdateClientMutation({
    fixedCacheKey: 'update-client',
  })
  const [form, updateForm] = useState({
    name: '',
    email: '',
    companyName: '',
    phone: '',
    password: '',
  })

  useEffect(() => {
    if (modalStatus.isEdit) {
      updateForm(clientById)
    }
  }, [clientById])

  const onSubmit = () => {
    if (modalStatus?.isEdit) {
      updateClient({ body: form, id: clientById?._id }).then(({ data, error }) => {
        getAllClient()
        if (!error) {
          setModalStatus({ isOpen: false, isEdit: false })
        }
      })
    } else {
      addClient(form).then(({ data, error }) => {
        getAllClient()
        if (!error) {
          setModalStatus({ isOpen: false, isEdit: false })
        }
      })
    }
  }

  return (
    <Box>
      <Typography variant='h4' sx={{ borderBottom: '1px solid', padding: '1rem' }}>
        Add Client
      </Typography>
      <Stack sx={{ p: '1rem' }} spacing='1.2rem'>
        <Input label='Client Name' onChange={(value) => updateForm({ ...form, name: value })} value={form?.name} />
        <Input label='Client Email' onChange={(value) => updateForm({ ...form, email: value })} value={form?.email} />
        <Input label='Client Password' onChange={(value) => updateForm({ ...form, password: value })} value={form?.password} />
        <Input label='Client Phone number' onChange={(value) => updateForm({ ...form, phone: value })} value={form?.phone} />
        <Input label='Client Company' onChange={(value) => updateForm({ ...form, companyName: value })} value={form?.companyName} />
        <Button variant='contained' sx={{ fontSize: '1.3rem' }} onClick={() => onSubmit()}>
          {modalStatus?.isEdit ? 'Update' : 'Add'}
        </Button>
      </Stack>
    </Box>
  )
}

export default ClientForm
