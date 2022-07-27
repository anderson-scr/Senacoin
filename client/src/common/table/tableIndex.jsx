import React, {useState, useEffect, useRef} from 'react'

// User validation
import { useNavigate } from 'react-router-dom'
import { verificaSessao } from 'auth/login/verificaSessao'

// Table
import TablePagination from './components/tablePagination'
import TableFilters from './components/tableFilters'
import { useTable, usePagination, useRowSelect } from 'react-table'

// Select row type
import { RowCheckbox } from './components/rowSelection'
import { RowEdit } from './components/rowEdit'

// Modal imports
import ModalService from 'common/modal/services/modalService' 
import ModalEditItem from 'pages/gerItem/modal/modalEditItem'

// CSS
import './tableStyle.css'

const Table = ({apiRoute, columnSchema, rowSize, setCurrentState = false, filters = true, categoria = false, offset = ''}) => {
  const effectOnce = useRef(true)
  const [dataTabela, setDataTabela] = useState([])
  const navigate = useNavigate()
  
  useEffect(() => {
    if(effectOnce.current) {
      // Verify user session
      if(!verificaSessao()) {
        navigate("/Login", {replace: true})
      }

      // Call the table data on page load        
      (async () => {
        setDataTabela(await apiRoute(offset.offset))
      })()
      // Defines the amount of lines in the page
      setPageSize(rowSize)
      return () => effectOnce.current = false
    }
  }, [navigate])
  
  // Definindo as configs da tabela
  console.log(dataTabela)
  const tableInstance = useTable({
    columns: columnSchema,
    data: dataTabela

    // useRowSelect adds a new row so we can put checkbox in it
  }, usePagination, useRowSelect, (hooks) => {
      hooks.visibleColumns.push(columns => {
        if(columns[0].Header === 'Editar') {
          columns.splice(0, 1)
          return [
            {
              id: 'edit',
              Header: 'Editar',
              Cell: ( ({row}) => (
                <RowEdit {...row.getToggleRowSelectedProps()} />
              ))
            },
            ...columns
          ]
        }
        return [
          {
            id: 'selection',
            Header: ({getToggleAllRowsSelectedProps}) => {
              return (
                <div>
                  <RowCheckbox {...getToggleAllRowsSelectedProps()} />
                </div>
              )
            },
            Cell: ( ({row}) => (
              <RowCheckbox {...row.getToggleRowSelectedProps()} />
            ))
          },
          ...columns
        ]
      })
  })

  // Destructuring props
  const { 
    headerGroups, //Informacoes do header em forma de array. Por isso usar map
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    setPageSize,
    page,
    selectedFlatRows, // Attr for select rows
  } = tableInstance

  // Page current on
  const {  pageIndex } = state

  // Save current selected rows
  useEffect(() => {
    const selectedIDs = []
    selectedFlatRows.forEach(selected => {
      selectedIDs.push(selected.original._id)
    })
    if(setCurrentState !== false) setCurrentState.funcs(selectedIDs)
  }, [selectedFlatRows])
 
  return (
    <div>
      {filters && <TableFilters categoriaOrUnidade={categoria} />}
      <div className='container mt-4 containerTable'>
        <table className="table">
          <thead className='tableHead'>
            {dataTabela &&
            headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="table-group-divider">
          {page.map(row => {
            prepareRow(row)
            return (
              <tr className="rowTabela" {...row.getRowProps()} >
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps(
                    cell.column.Header === 'Editar'? {onClick: () => ModalService.open(ModalEditItem)} : ''
                  )}> {cell.render('Cell')} </td>
                })}
              </tr>
            )
          })
          }
          </tbody>
        </table>
      </div>
      <TablePagination 
        canPreviousPage={canPreviousPage} 
        pageIndex={pageIndex} 
        pageOptions={pageOptions} 
        canNextPage={canNextPage}
        nextPage={nextPage}
        previousPage={previousPage}
      />
    </div>
  )
}

export default Table