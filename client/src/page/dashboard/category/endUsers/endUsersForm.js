import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useEffect, useState } from 'react'
import Input from '../../../../components/common/Input/input'
import InputSelect from '../../../../components/common/Select/select'
import { useAddClientMutation, useGetClientListQuery, useUpdateClientMutation } from '../../../../redux/slice/clientQuery'
import { useAddEndUserMutation, useUpdateEndUserMutation } from '../../../../redux/slice/endUserQuery'
import { useAddMachineMutation, useUpdateMachineMutation } from '../../../../redux/slice/machineQuery'
import { useGetProfileOfCurrentUserQuery } from '../../../../redux/slice/userQuery'
import { isLoggedIn } from '../../../../utils/helperFunction/helperFunction'

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
  const { data: userProfile, isError: profileApiError } = useGetProfileOfCurrentUserQuery('profile', {
    skip: !isLoggedIn(),
  })
    const { data: clientData, isLoading, isSuccess, refetch: getAllClient, isFetching } = useGetClientListQuery('client')

  const [form, updateForm] = useState({
    name: '',
    email: '',
    companyName: '',
    phone: '',
    password: '',
  })
    const [clientOptions, setClientOptions] = useState([])

  useEffect(() => {
    console.log("end user by id:::",endUsersById,modalStatus)
    let data = { ...form, ...endUsersById }
    if (userProfile?.role === 'CLIENT') {
      data = {...data, clientId: userProfile?.clientId }
    }
    if (modalStatus.isEdit) {
      updateForm(data)
    }
    
  }, [endUsersById,userProfile])

  useEffect(() => {
    const options = clientData?.map((client) => {
      return {
        value: client?._id,
        label: client?.name,
      }
    })
    setClientOptions(options)
  }, [clientData])

  useEffect(()=>{
    
  },[userProfile])

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
        
        if (!error) {
          setModalStatus({ isOpen: false, isEdit: false })
        }
      })
    }
  }
  console.log(' :::',form)
  return (
    <Box>
      <Typography variant='h4' sx={{ borderBottom: '1px solid', padding: '1rem' }}>
        End User
      </Typography>
      <Stack sx={{ p: '1rem' }} spacing='1.2rem'>
        <Input label='End-user Name' onChange={(value) => updateForm({ ...form, name: value })} value={form?.name} />
        <Input label='End-user Email' onChange={(value) => updateForm({ ...form, email: value })} value={form?.email} />
        <Input label='End-user Password' onChange={(value) => updateForm({ ...form, password: value })} value={form?.password} />
        <Input label='End-user Phone number' onChange={(value) => updateForm({ ...form, phone: value })} value={form?.phone} />
        {userProfile?.role === 'ADMIN' && (
          <InputSelect
            OPTIONS={clientOptions}
            label='Client'
            onChange={(e) => updateForm({ ...form, clientId: e.target.value })}
            value={form?.clientId}
            disabled={modalStatus?.isEdit}
          />
        )}
        <Input label='End-user Company' onChange={(value) => updateForm({ ...form, companyName: value })} value={form?.companyName} />
        <Button variant='contained' sx={{ fontSize: '1.3rem' }} onClick={() => onSubmit()}>
          {modalStatus?.isEdit ? 'Update' : 'Add'}
        </Button>
      </Stack>
    </Box>
  )
}

export default EndUsersForm
