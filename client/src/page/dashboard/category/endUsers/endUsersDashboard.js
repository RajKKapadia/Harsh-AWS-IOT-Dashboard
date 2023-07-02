import { Box, Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal'

import { ColumnFilter } from '../../../../components/common/Table/table'
import Table from '../../../../components/common/Table/table'
import { useGetMachineByIdMutation, useGetMachineListQuery } from '../../../../redux/slice/machineQuery'
import DeleteButton from '../../../../components/common/Buttons/DeleteButton/deleteButton'
import EditButton from '../../../../components/common/Buttons/EditButton/editButton'
import EndUsersForm from './endUsersForm'
import { useGetClientByIdMutation, useGetClientListQuery } from '../../../../redux/slice/clientQuery'
import { useDeleteEndUserMutation, useGetEndUserByIdMutation, useGetEndUserListQuery } from '../../../../redux/slice/endUserQuery'

const getEndUsersRowData = (endUsers) => {
  const row = endUsers?.map((endUser) => {
    return {
      name: endUser?.name,
      email: endUser?.email ? endUser?.email : '',
      phone: endUser?.phone ? endUser?.phone : '',
      companyName: endUser?.companyName ? endUser?.companyName : '',
      id: endUser?._id,
    }
  })

  return row
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50rem',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
}

const EndUsersDashboard = () => {
  const { data, isLoading, isSuccess, refetch: getAllEndUser, isFetching } = useGetEndUserListQuery('end-user')
  const [endUserById, setEndUserById] = useState()
  const [getEndUserById] = useGetEndUserByIdMutation({
    fixedCacheKey: 'end-user-by-id',
  })
  const [deleteEndUser] = useDeleteEndUserMutation()

  const [endUserData, setEndUserData] = useState()
  const [modalStatus, setModalStatus] = useState({
    isOpen: false,
    isEdit: false,
  })

    useEffect(() => {
      if (!isFetching) {
        setTimeout(() => {
          getAllEndUser()
        }, 10000)
      }
    }, [isFetching])

  const onEdit = (id) => {
    getEndUserById(id).then(({ data, error }) => {
      setEndUserById(data)
      setModalStatus({ isOpen: true, isEdit: true })
    })
  }

      const onDelete = (id) => {
        deleteEndUser(id).then(() => {
          getAllEndUser()
        })
      }
  const columns = [
    {
      Header: 'Delete',
      commonStyle: {
        width: '5rem',
        textTransform: 'capitalize',
        textAlign: 'center',
      },
      hideLabel: true,
      Cell: (tableInstance) => {
        console.log('tabl :::', tableInstance)
        return <DeleteButton onClick={() => onDelete(tableInstance?.row?.original.id)} />
      },
      Filter: ColumnFilter,
    },
    {
      Header: 'Edit',
      commonStyle: {
        width: '5rem',
        textTransform: 'capitalize',
        textAlign: 'center',
      },

      hideLabel: true,
      Cell: (tableInstance) => {
        return <EditButton onClick={() => onEdit(tableInstance?.row?.original.id)} />
      },
      Filter: ColumnFilter,
    },
    {
      Header: 'Name',
      accessor: 'name',
      Filter: ColumnFilter,
    },

    {
      Header: 'Email',
      accessor: 'email',
      Filter: ColumnFilter,
    },
    {
      Header: 'Phone Number',
      accessor: 'phone',
      Filter: ColumnFilter,
    },
    {
      Header: 'Comapny name',
      accessor: 'companyName',
      Filter: ColumnFilter,
    },
  ]

  useEffect(() => {
    console.log('machie data::::::', data)
    setEndUserData(getEndUsersRowData(data))
  }, [data, isFetching])

  const DUMMY_DATA = [
    {
      name: 'abc',
      type: 'sfa',
      tags: 'aa',
    },
    {
      name: 'abc',
      type: 'sfa',
      tags: 'aa',
    },
  ]

  // return <Table/>
  if (isLoading) return <Typography variant='h3'>Loading....</Typography>
  return (
    <Box sx={{ m: '2rem' }}>
      <Typography variant='h4'>End Users</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse', p: '2rem 0' }}>
        <Button
          variant='contained'
          sx={{ fontSize: '1.2rem' }}
          onClick={() => {
            setModalStatus({ isOpen: true, isEdit: false })
          }}>
          {modalStatus?.isEdit ? 'Update End-users' : 'Add End-users'}
        </Button>
      </Box>
      {endUserData && <Table COLUMNS={columns} DATA={endUserData} />}

      <Modal open={modalStatus?.isOpen} onClose={() => setModalStatus({ isOpen: false, isEdit: false })}>
        <Box sx={style}>
          <EndUsersForm setModalStatus={setModalStatus} getAllEndUsers={getAllEndUser} endUsersById={endUserById} modalStatus={modalStatus} />
        </Box>
      </Modal>
    </Box>
  )
}

export default EndUsersDashboard
