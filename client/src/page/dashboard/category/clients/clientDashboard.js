import { Box, Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal'

import { ColumnFilter } from '../../../../components/Table/table'
import Table from '../../../../components/Table/table'
import { useGetMachineByIdMutation, useGetMachineListQuery } from '../../../../redux/slice/machineQuery'
import DeleteButton from '../../../../components/Buttons/DeleteButton/deleteButton'
import EditButton from '../../../../components/Buttons/EditButton/editButton'
import ClientForm from './clientForm'
import { useDeleteClientMutation, useGetClientByIdMutation, useGetClientListQuery } from '../../../../redux/slice/clientQuery'

const getClientsRowData = (clients) => {
  const row = clients?.map((client) => {
    return {
      name: client?.name,
      email: client?.email ? client?.email : '',
      phone: client?.phone ? client?.phone : '',
      companyName: client?.companyName ? client?.companyName : '',
      id: client?._id,
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

const ClientDashboard = () => {
  const { data, isLoading, isSuccess, refetch: getAllClient, isFetching } = useGetClientListQuery('client')
  const [clientById, setClientById] = useState()
  const [getClientById] = useGetClientByIdMutation({
    fixedCacheKey: 'client-by-id',
  })
  const [deleteClient] = useDeleteClientMutation()

  const [clientData, setClientData] = useState()
  const [modalStatus, setModalStatus] = useState({
    isOpen: false,
    isEdit: false,
  })

  const onEdit = (id) => {
    getClientById(id).then(({ data, error }) => {
      setClientById(data)
      setModalStatus({ isOpen: true, isEdit: true })
    })
  }

    const onDelete = (id) => {
      deleteClient(id).then(() => {
        getAllClient()
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
    setClientData(getClientsRowData(data))
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
      <Typography variant='h4'>Client</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse', p: '2rem 0' }}>
        <Button
          variant='contained'
          sx={{ fontSize: '1.2rem' }}
          onClick={() => {
            setModalStatus({ isOpen: true, isEdit: false })
          }}>
          {modalStatus?.isEdit ? 'Update Client' : 'Add Client'}
        </Button>
      </Box>
      {clientData && <Table COLUMNS={columns} DATA={clientData} />}

      <Modal open={modalStatus?.isOpen} onClose={() => setModalStatus({ isOpen: false, isEdit: false })}>
        <Box sx={style}>
          <ClientForm setModalStatus={setModalStatus} getAllClient={getAllClient} clientById={clientById} modalStatus={modalStatus} />
        </Box>
      </Modal>
    </Box>
  )
}

export default ClientDashboard
