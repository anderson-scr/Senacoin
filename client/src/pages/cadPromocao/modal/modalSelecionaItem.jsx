import React, {useState, useRef, useEffect } from "react";
import { callAreaAPI } from "api/common/callArea";
import { callSubcategoriaAPI } from "api/common/callSubcategoria";
import { callUnidadeAPI } from "api/common/callUnidades";
import { useForm } from "react-hook-form";
import { callTodosItemsAPI } from "api/item/apiTodos";
import { useTable, usePagination, useSortBy } from "react-table";
import { colunasSchema } from "./table/tableSchema";
import { useNavigate } from "react-router-dom";
import { verificaSessao } from "auth/login/verificaSessao";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

// Imports do modal
import Modal from "common/modal/modalIndex";
import ModalHeader from "common/modal/components/modalHead";
import ModalBody from "common/modal/components/modalBody";
import ModalFooter from "common/modal/components/modalFooter";
import './modalSelecionaItemStyle.css'


export default function ModalSelecionarItem() {
  const effectOnce = useRef(true)
  const [areas, setAreas] = useState([])
  const [subcategorias, setSubcategorias] = useState([])
  const [unidades, setUnidades] = useState([])
  const [dataTabela, setDataTabela] = useState([])
  const navigate = useNavigate()

  
  const { register, handleSubmit, formState: {
    errors
  }} = useForm();

  useEffect(() => {
    if(effectOnce.current) {
      if(!verificaSessao()) {
        navigate("/Login", {replace: true})
      }

      // Fill dropDows unidades
      (async () => {
        setUnidades(await callUnidadeAPI.ativo())
        setAreas(await callAreaAPI.ativo())
        setSubcategorias(await callSubcategoriaAPI.ativo())
        
        // Chama a primeira leva de informacoes da tabela        
        setDataTabela(await callTodosItemsAPI.ativos())
      })()
  
      return () => effectOnce.current = false
    }

  }, [navigate])

  // Definindo as configs da tabela
  const tableInstance = useTable({
    columns: colunasSchema,
    data: dataTabela
  })

  // Descontruindo algumas props da instancia da tabela.
  const { 
    getTableProps,
    getTableBodyProps,
    headerGroups, //Informacoes do header em forma de array. Por isso usar map
    prepareRow,
    rows
  } = tableInstance

  const ver = () => {
    console.log(dataTabela)
  }


  return (
    <Modal>
      <ModalHeader>
        <h3>Selecione um item</h3>
      </ModalHeader>
      <ModalBody>
        <div className="container mb-3 text-start">
          <div className="mb-3">

            <div className='row'>
              <div className='mb-3 col-3'>
                <label htmlFor="dropArea" className="form-label">Area</label>
                <select className="form-select" id='dropArea' aria-label="Default select example" defaultValue="DEFAULT" {...register("id_area")}>
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
                <select className="form-select" id='dropSubcategoria' aria-label="Default select example" defaultValue="DEFAULT" {...register("id_subcategoria")}>
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
                <select className="form-select" id='dropSubcategoria' aria-label="Default select example" defaultValue="DEFAULT" {...register("id_unidade")}>
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
      </ModalBody>

      <ModalBody>
        <table className="table">
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
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} >
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}> {cell.render('Cell')} </td>
                })}
              </tr>
            )
          })
          }
          </tbody>
        </table>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary btnConfirmaSenhaModal" onClick={ver} >Ok</button>
      </ModalFooter>
    </Modal>
  );
}