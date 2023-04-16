import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useEffect, useState } from 'react'
import Input from '../../../../components/common/Input/input'
import InputSelect from '../../../../components/common/Select/select'
import { useGetClientListQuery } from '../../../../redux/slice/clientQuery'
import { useGetEndUserListQuery } from '../../../../redux/slice/endUserQuery'
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
    fixedCacheKey: 'update-machine',
  })
  const { data: clientData, isLoading, isSuccess, refetch: getAllClient, isFetching } = useGetClientListQuery('client')
  const { data: endUserData, isLoading:isEndUserLoading, refetch: getAllEndUser, isFetching:isEndUserFetching } = useGetEndUserListQuery('end-user')

  const [form, updateForm] = useState({
    name: '',
    type: '',
    machineId: '',
    maker: '',
    clientId: '',
    endUserId:''
  })
  const [clientOptions, setClientOptions] = useState([])
  const [endUserOptions,setEndUserOptions] = useState([]);
  const [selectedClientOption, setSelectedClientOption] = useState()

  useEffect(() => {
    if (modalStatus?.isEdit) {
      updateForm(machineById)
    }
  }, [machineById])

  useEffect(() => {
    const options = clientData?.map((client) => {
      return {
        value: client?._id,
        label: client?.name,
      }
    })
    setClientOptions(options)
  }, [clientData])

    useEffect(() => {
      const options = endUserData?.map((endUser) => {
        return {
          value: endUser?._id,
          label: endUser?.name,
        }
      })
      setEndUserOptions(options)
    }, [endUserData])


  const onSubmit = () => {
    if (modalStatus?.isEdit) {
      updateMachine({ body: form, id: machineById?._id }).then(({ data, error }) => {
        getAllMachine()
        if (!error) {
          setModalStatus({ isOpen: false, isEdit: false })
        }
      })
    } else {
      addMachine(form).then(({ data, error }) => {
        getAllMachine()
        if (!error) {
          setModalStatus({ isOpen: false, isEdit: false })
        }
      })
    }
  }
  console.log('form:::::::', endUserOptions)
  return (
    <Box>
      <Typography variant='h4' sx={{ borderBottom: '1px solid', padding: '1rem' }}>
        Add Machine
      </Typography>
      <Stack sx={{ p: '1rem' }} spacing='1.2rem'>
        <Input label='Machine Id' onChange={(value) => updateForm({ ...form, machineId: value })} value={form?.machineId} />
        <Input label='Machine Name' onChange={(value) => updateForm({ ...form, name: value })} value={form?.name} />
        <Input label='Machine Maker' onChange={(value) => updateForm({ ...form, maker: value })} value={form?.maker} />
        <Input label='Machine Type' onChange={(value) => updateForm({ ...form, type: value })} value={form?.type} />
        <InputSelect
          OPTIONS={clientOptions}
          label='Client'
          onChange={(e) => updateForm({ ...form, clientId: e.target.value })}
          value={form?.clientId}
          disabled={modalStatus?.isEdit}
        />
        {endUserData && (
          <InputSelect
            OPTIONS={endUserOptions}
            label='End User'
            onChange={(e) => updateForm({ ...form, endUserId: e.target.value })}
            value={form?.endUserId}
           
          />
        )}
        <Button variant='contained' sx={{ fontSize: '1.3rem' }} onClick={() => onSubmit()}>
          {modalStatus?.isEdit ? 'Update' : 'Add'}
        </Button>
      </Stack>
    </Box>
  )
}

export default MachineForm
