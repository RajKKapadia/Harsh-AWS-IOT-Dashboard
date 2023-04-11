import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import Table from '../../../components/common/Table/table'
import { useGetMachineTagsMutation } from '../../../redux/slice/machineTagQuery'


export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column

  return (
    <span>
      <input value={filterValue || ''} onChange={(e) => setFilter(e.target.value)}></input>
    </span>
  )
}

const getTagsRowData = (tags) => {
  const row = tags?.map((tag) => {
    return {
      tag: tag?.tag,
      value: tag?.data?.at(-1)?.v,
      time: tag?.data?.at(-1)?.ts,
    }
  })
  return row
}

const MachineTags = () => {
  const [getTagsByMachineId] = useGetMachineTagsMutation('machine-tag')
  const [tagsData, setTagsData] = useState()
  const {machineId} = useParams()


  useEffect(()=>{
    getTagsByMachineId(machineId).then(({data})=>{
      if(data){
        const tags = getTagsRowData(data)
        setTagsData(tags)
      }
    })
  },[])
  const columns = [
    {
      Header: 'Tag',
      accessor: 'tag',
      Filter: ColumnFilter,
    },
    {
      Header: 'Value',
      accessor: 'value',
      Filter: ColumnFilter,
    },
    {
      Header: 'Time',
      accessor: 'time',
      Filter: ColumnFilter,
    },
  ]

  // if (isError) {
  //     return (
  //         <div>Facing Error...</div>
  //     );
  // }

  
  // useEffect(()=>{

  //   if(tags?.data){
  //       setTagsData(getTagsRowData(tags?.data))
  //   }

  // },[tags])

  // if (isLoading) {
  //   <div>Loading...</div>
  // }

  return (
    <div>
      <h1>Tags</h1>
      <div className='table-container'>{tagsData && <Table COLUMNS={columns} DATA={tagsData} />}</div>
    </div>
  )
}

export default MachineTags
