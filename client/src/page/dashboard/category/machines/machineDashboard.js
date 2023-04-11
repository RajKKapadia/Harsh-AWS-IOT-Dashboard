import { Box, Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal'
import { useNavigate } from 'react-router-dom'

import { ColumnFilter } from '../../../../components/common/Table/table'
import Table from '../../../../components/common/Table/table'
import { useDeleteMachineMutation, useGetMachineByIdMutation, useGetMachineListQuery } from '../../../../redux/slice/machineQuery'

import MachineForm from './machineForm'
import DeleteButton from '../../../../components/common/Buttons/DeleteButton/deleteButton'
import EditButton from '../../../../components/common/Buttons/EditButton/editButton'
import { useGetProfileOfCurrentUserQuery } from '../../../../redux/slice/userQuery'
import { isLoggedIn } from '../../../../utils/helperFunction/helperFunction'

const getMachinesRowData = (machines) => {
  const row = machines?.map((machine) => {
    return {
      name: machine?.name,
      type: machine?.type ? machine?.type : '',
      tags: machine?.machineData?.length > 0 ? machine?.machineData?.map((item) => item?.tag)?.join(', ') : '',
      machineId: machine?.machineId,
      maker: machine?.maker,
      id: machine?._id,
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

const MachineDashboard = () => {
  const { data, isLoading, isSuccess, refetch: getAllMachine, isFetching } = useGetMachineListQuery('machine')
  const { data: userProfile, isError: profileApiError } = useGetProfileOfCurrentUserQuery('profile', {
    skip: !isLoggedIn(),
  })
  const [machineById, setMachineById] = useState()
  const [getMachineById] = useGetMachineByIdMutation({
    fixedCacheKey: 'machine-by-id',
  })
  const [deleteMachine] = useDeleteMachineMutation()

  const [machineData, setMachineData] = useState()
  const [modalStatus, setModalStatus] = useState({
    isOpen: false,
    isEdit: false,
  })

  const navigate = useNavigate()
  const onEdit = (id,machineId) => {
    if(userProfile?.role === 'USER'){
      navigate(`/dashboard/machines-tags/${machineId}`)
    }else{
       getMachineById(id).then(({ data, error }) => {
         setMachineById(data)
         setModalStatus({ isOpen: true, isEdit: true })
       })
    }
   
  }

  const onDelete = (id) => {
    deleteMachine(id).then(() => {
      getAllMachine()
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
        return <EditButton onClick={() => onEdit(tableInstance?.row?.original.id, tableInstance?.row?.original.machineId)} />
      },
      Filter: ColumnFilter,
    },
    {
      Header: 'ID',
      accessor: 'machineId',
      Filter: ColumnFilter,
    },

    {
      Header: 'Name',
      accessor: 'name',
      Filter: ColumnFilter,
    },
    {
      Header: 'Type',
      accessor: 'type',
      Filter: ColumnFilter,
    },
    {
      Header: 'Maker',
      accessor: 'maker',
      Filter: ColumnFilter,
    },

    {
      Header: 'Tags',
      accessor: 'tags',
      Filter: ColumnFilter,
    },
  ]

  useEffect(() => {
    setMachineData(getMachinesRowData(data))
  }, [data, isFetching])

  if (isLoading) return <Typography variant='h3'>Loading....</Typography>
  return (
    <Box sx={{ m: '2rem' }}>
      <Typography variant='h4'>Machine</Typography>
      {userProfile?.role === 'ADMIN' && (
        <Box sx={{ display: 'flex', flexDirection: 'row-reverse', p: '2rem 0' }}>
          <Button
            variant='contained'
            sx={{ fontSize: '1.2rem' }}
            onClick={() => {
              setModalStatus({ isOpen: true, isEdit: false })
            }}>
            {modalStatus?.isEdit ? 'Update Machine' : 'Add Machine'}
          </Button>
        </Box>
      )}
      {machineData && <Table COLUMNS={columns} DATA={machineData} />}

      <Modal open={modalStatus?.isOpen} onClose={() => setModalStatus({ isOpen: false, isEdit: false })}>
        <Box sx={style}>
          <MachineForm setModalStatus={setModalStatus} getAllMachine={getAllMachine} machineById={machineById} modalStatus={modalStatus} />
        </Box>
      </Modal>
    </Box>
  )
}

export default MachineDashboard
