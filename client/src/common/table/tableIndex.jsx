import React, {useState, useEffect, useRef} from 'react'

// User validation
import { useNavigate } from 'react-router-dom'
import { verificaSessao } from 'auth/login/verificaSessao'

// Table
import TablePagination from './components/tablePagination'
import TableFilters from './components/tableFilters'
import { useTable, usePagination, useRowSelect, useSortBy, useGlobalFilter, useFilters } from 'react-table'

// Select row type
import { RowCheckbox } from './components/rowSelection'
import { RowEdit } from './components/rowEdit'

// Modal service
import ModalService from 'common/modal/services/modalService' 

// CSS
import './tableStyle.css'
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { BsDot } from "react-icons/bs";


const Table = ({apiRoute, rowCount = 12, resizeContainer = false, enablePagination = true, columnSchema, modal, editColumn = true, setCurrentState = false, filters = true, categoria = false, subcategoria = true, area = true, ativo = false}) => {
  const effectOnce = useRef(true)
  const [dataTabela, setDataTabela] = useState([])
  const navigate = useNavigate()
  const [offset, setOffset] = useState(0)
  
  useEffect(() => {
    if(effectOnce.current) {
      // Verify user session
      if(!verificaSessao()) {
        navigate("/Login", {replace: true})
      }
      // Call the table data on page load        
      (async () => {
        setDataTabela(await apiRoute(offset))
      })()

      // Defines the amount of lines in the page
      setPageSize(rowCount)
      return () => effectOnce.current = false
    }
  }, [navigate, apiRoute, categoria, offset, rowCount])
  
  // Definindo as configs da tabela
  const tableInstance = useTable({
    columns: columnSchema,
    data: dataTabela

    // useRowSelect adds a new row so we can put checkbox in it
  }, useFilters,useGlobalFilter, useSortBy, usePagination, useRowSelect, (hooks) => {
      if(editColumn) {
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
      }
  // useSortBy. Sortering columns.
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
    setGlobalFilter,
    gotoPage,
    page,
    selectedFlatRows, // Attr for select rows
  } = tableInstance

  // Page current on
  const {  pageIndex } = state
  //Filter
  const { globalFilter } = state

  // Save current selected rows
  useEffect(() => {
    const selectedIDs = []
    selectedFlatRows.forEach(selected => {
      selectedIDs.push(selected.original._id)
    })
    if(setCurrentState !== false) setCurrentState.funcs(selectedIDs)
  }, [selectedFlatRows])
 
  // Verify if it is the status column and change the boolean to text
  const verificaStatus = (cell) => {
    if(cell.column.Header === 'Status') {
      if(cell.row.original.ativo) {
        return 'Ativo'
      } else return 'Inativo'
      
    } return cell.render('Cell')
  }

  const getRowInfo = evt => {
    // Find the TR based on user click position
    let target = evt.target
    let targetName = evt.target.nodeName
    
    while(targetName !== 'TR') {
      target = target.parentElement
      targetName = target.nodeName
    }

    // Compare the ID from tr clicked and find the data to send into edit modal
    ModalService.open(modal, {}, dataTabela[target.id])
  }

  return (
    <div>
      {filters && <TableFilters 
        categoriaOrUnidade={categoria} 
        subcategoria={subcategoria} 
        area={area} 
        ativo={ativo} 
        filter={globalFilter}
        setFilter={setGlobalFilter}
      />}
      <div className='container mt-4 containerTable' style={ resizeContainer? {height: 'auto'} : {minHeight: '56.3vh', maxHeight: '56.3vh'} }>
        <table className="table">
          <thead className='tableHead'>
            {dataTabela &&
            headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} >
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted? (column.isSortedDesc? <MdArrowDropDown size={20} /> : <MdArrowDropUp size={20} />) : (typeof column.Header === 'function' || column.Header === 'Editar'? '' : <BsDot size={20} />)}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="table-group-divider">
          {page.map((row, idx) => {
            prepareRow(row)
            return (
              <tr className="rowTabela" id={idx} {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps(
                    cell.column.Header === 'Editar'? {onClick: (evt) => getRowInfo(evt)} : ''
                  )}> {verificaStatus(cell)} </td>
                })}
              </tr>
            )
          })
          }
          </tbody>
        </table>
      </div>
      {enablePagination && 
        <TablePagination 
          canPreviousPage={canPreviousPage} 
          pageIndex={pageIndex} 
          pageOptions={pageOptions} 
          canNextPage={canNextPage}
          nextPage={nextPage}
          previousPage={previousPage}
          gotoPage={gotoPage}
        />
      }
    </div>
  )
}

export default Table