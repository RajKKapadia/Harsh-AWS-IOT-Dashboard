import { useEffect, useMemo } from 'react'
import { useTable, useSortBy, useFilters, usePagination } from 'react-table'
import { AiOutlineArrowUp as ArrowUp, AiOutlineArrowDown as ArrowDown } from 'react-icons/ai'

import './table.css'


export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column

  return (
    <span>
      <input value={filterValue || ''} onChange={(e) => setFilter(e.target.value)} onFocus={(e)=>e.preventDefault()}></input>
    </span>
  )
}


const Table = ({ COLUMNS, DATA }) => {
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => DATA, [DATA])

  const tableInstance = useTable(
    {
      columns,
      data: data,
    },
    useFilters,

    useSortBy,
    usePagination
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    prepareRow,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
  } = tableInstance

  const { pageIndex } = state

  useEffect(() => {
    setPageSize(10)
  }, [])

  return (
    <>
      <table {...getTableProps()} id='tags'>
        <thead>
          {headerGroups?.map((headerGroup) => {
            return (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {  headerGroup?.headers?.map((column) => {
                  
                  return (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())} style={column.commonStyle}>
                      {column.hideLabel ? (
                        <></>
                      ) : (
                        <>
                          {' '}
                          {column.render('Header')}
                          <span>{column.isSorted ? column?.isSortedDesc ? <ArrowUp /> : <ArrowDown /> : ''}</span>
                        </>
                      )}
                    </th>
                  )
                })}
              </tr>
            )
          })}
          {headerGroups?.map((headerGroup) => {
            return (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup?.headers?.map((column) => {
                  return (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())} style={column.commonStyle}>
                      <div>{column?.canFilter ? column.render('Filter') : null}</div>
                    </th>
                  )
                })}
              </tr>
            )
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} style={{ ...cell.column.commonStyle }}>
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div></div>
      <div style={{ textAlign: 'center' }}>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions?.length}
          </strong>
        </span>
        <span style={{ marginLeft: '10px' }}>|</span>
        <span style={{ marginLeft: '10px' }}>
          Go to{' '}
          <input
            type='number'
            onChange={(e) => {
              const i = e.target.value ? Number(e.target.value) : 0
              gotoPage(i)
            }}
            max={pageCount - 1}
            min={0}
            style={{ width: '30px' }}></input>
        </span>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} style={{ marginLeft: '10px' }}>
          {'<<'}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
      </div>
    </>
  )
}

export default Table
