import React, { useEffect, useRef, useState } from 'react'
import { verificaSessao } from 'auth/login/verificaSessao'
import { useNavigate } from 'react-router-dom'
import { callAreaAPI } from "api/common/callArea";
import { callSubcategoriaAPI } from "api/common/callSubcategoria";
import { callUnidadeAPI } from "api/common/callUnidades";
import { useForm } from "react-hook-form";
import { callTodosItemsAPI } from "api/item/apiTodos";
import { useTable, usePagination } from "react-table";
import { colunasSchema } from "./tableSchema";
import { BsPencilSquare } from "react-icons/bs";
import './gerItemStyle.css'

const GerItem = () => {
  const effectOnce = useRef(true)
  const navigate = useNavigate()
  const [areas, setAreas] = useState([])
  const [subcategorias, setSubcategorias] = useState([])
  const [unidades, setUnidades] = useState([])
  const [dataTabela, setDataTabela] = useState([])

  useEffect(() => {
    if(effectOnce.current) {
      if(!verificaSessao()) {
        navigate("/Login", {replace: true})
      }

      // Preenche os state das informacoes do dropdown
      (async () => {
        setUnidades(await callUnidadeAPI.ativo())
        setAreas(await callAreaAPI.ativo())
        setSubcategorias(await callSubcategoriaAPI.ativo())
        
        // Chama a primeira leva de informacoes da tabela        
        setDataTabela(await callTodosItemsAPI.todos())
      })()

      setPageSize(12)
  
      return () => effectOnce.current = false
    }
  }, [navigate])

  const tableInstance = useTable({
    columns: colunasSchema,
    data: dataTabela

  }, usePagination)

  // Descontruindo algumas props da instancia da tabela.
  const { 
    getTableProps,
    getTableBodyProps,
    headerGroups, //Informacoes do header em forma de array. Por isso usar map
    prepareRow,

    nextPage, // Funcao para passar de pagina
    previousPage, // funcao para passar de pagina

    canNextPage, // variavel boleana para dizer se tem outra pagina ou nao
    canPreviousPage, // variavel boleana para dizer se tem outra pagina ou nao
    pageOptions,
    state,
    setPageSize, // Define o tamanho de cada pagina
    page
  } = tableInstance

  // Variavel com a pagina atual e tamanho da pagina
  const {  pageIndex, pageSize } = state

  // Adiciona o icone de editar na tabela
  const adicionaCheckbox = (cell) => {
    if(cell.column.Header === "Editar") {
      return (
        <div>
          <BsPencilSquare className="form-check-input" 
            style={{border: 'none'}}
            size={30}
          onClick={evt => ver(evt)} id="btnEditar" />
        </div>
      )
    } else {
      return cell.render('Cell')  
    }
  }

  const ver = (evt) => {
    const vamoVe = (evt.target.parentElement).parentElement
    console.log(vamoVe)
  }

  return (
    <div>
      {/* Campo de filtros da tabela */}
      <div className="container mb-3 mt-2 text-start">
        <div className="mb-3">
          <div className='row'>
            <div className='mb-3 col-3'>
              <label htmlFor="dropArea" className="form-label">Area</label>
              <select className="form-select" id='dropArea' aria-label="Default select example" defaultValue="DEFAULT" >
                <option value="DEFAULT" disabled style={{display: "none"}}>Selecione uma area</option>
                {areas.length > 1 &&
                  areas.map((area, idx) => {
                    return <option key={idx} value={idx + 1}>{area.nome}</option>
                  })
                }
              </select>
            </div>
            <div className='mb-3 col-3 '>
              <label htmlFor="dropSubcategoria" className="form-label">Subcategoria</label>
              <select className="form-select" id='dropSubcategoria' aria-label="Default select example" defaultValue="DEFAULT" >
                <option value="DEFAULT" disabled style={{display: "none"}}>Selecione uma subcategoria</option>
                {subcategorias.length > 1 &&
                  subcategorias.map((subcategoria, idx) => {
                    return <option key={idx} value={idx + 1}>{subcategoria.nome}</option>
                  })
                }
              </select>
            </div>
            <div className='mb-3 col-3 '>
              <label htmlFor="dropSubcategoria" className="form-label">Unidade</label>
              <select className="form-select" id='dropSubcategoria' aria-label="Default select example" defaultValue="DEFAULT" >
                <option value="DEFAULT" disabled style={{display: "none"}}>Selecione uma unidade</option>
                {unidades.length > 1 &&
                  unidades.map((unidade, idx) => {
                    return <option key={idx} value={idx + 1}>{unidade.nome}</option>
                  })
                }
              </select>
            </div>
            <div className="mb-3 col-3">
              <label htmlFor="iptPesquisa" className="form-label">Pesquisar</label>
              <div className="input-group">
                <input id="iptPesquisa" type="text" className="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" />
                <button className="btn btn-outline-secondary" type="button" id="btnPesquisa">Pesquisar</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela */}
      <table className="table mb-4" style={{height: '60vh'}}>
          <thead>
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
                      return <td {...cell.getCellProps()}> {adicionaCheckbox(cell)} </td>
                    })}
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <div className='d-flex justify-content-end align-items-center'>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item"><button className="page-link" onClick={() => previousPage()} disabled={!canPreviousPage} href="#">Anterior</button></li>
              <li className="page-item"><button className="page-link" >1</button></li>
              <li className="page-item"><button className="page-link" >2</button></li>
              <li className="page-item"><button className="page-link" >3</button></li>
              <li className="page-item"><button className="page-link" >...</button></li>
              <li className="page-item"><button className="page-link" disabled={true} href="#"> { pageOptions.length } </button></li>
              <li className="page-item"><button className="page-link" onClick={() => nextPage()} disabled={!canNextPage} href="#">Proximo</button></li>
            </ul>
          </nav>
        </div>
    </div>
  )
}

export default GerItem