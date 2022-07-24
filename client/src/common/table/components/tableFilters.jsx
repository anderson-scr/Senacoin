import React, { useState, useEffect, useRef } from 'react'
import { BsSearch } from "react-icons/bs";
import { callUnidadeAPI } from 'api/common/callUnidades';
import { callAreaAPI } from 'api/common/callArea';
import { callSubcategoriaAPI } from 'api/common/callSubcategoria';

const TableFilters = () => {
  const effectOnce = useRef(true)
  const [subcategorias, setSubcategorias] = useState([])
  const [unidades, setUnidades] = useState([])
  const [areas, setAreas] = useState([])
  
  useEffect(() => {
    if(effectOnce.current) {

      // Fill dropDows unidades
      (async () => {
        setUnidades(await callUnidadeAPI.ativo())
        setAreas(await callAreaAPI.ativo())
        setSubcategorias(await callSubcategoriaAPI.ativo())
      })()
  
      return () => effectOnce.current = false
    }

  }, [])


  return (
    <div className="container text-start">
      <div>
        <div className='row'>
          <div className='mb-3 col-3'>
            <label htmlFor="dropArea" className="form-label">Area</label>
            <select className="form-select" id='dropArea' aria-label="Default select example" defaultValue="DEFAULT">
              <option value="DEFAULT" disabled style={{display: "none"}}>Selecione</option>
              {areas.length > 1 &&
                areas.map((area, idx) => {
                  return <option key={idx} value={idx + 1}>{area.nome}</option>
                })
              }
            </select>
          </div>
          <div className='mb-3 col-3 '>
            <label htmlFor="dropSubcategoria" className="form-label">Subcategoria</label>
            <select className="form-select" id='dropSubcategoria' aria-label="Default select example" defaultValue="DEFAULT">
              <option value="DEFAULT" disabled style={{display: "none"}}>Selecione</option>
              {subcategorias.length > 1 &&
                subcategorias.map((subcategoria, idx) => {
                  return <option key={idx} value={idx + 1}>{subcategoria.nome}</option>
                })
              }
            </select>
          </div>
          <div className='mb-3 col-3 '>
            <label htmlFor="dropSubcategoria" className="form-label">Unidade</label>
            <select className="form-select" id='dropSubcategoria' aria-label="Default select example" defaultValue="DEFAULT">
              <option value="DEFAULT" disabled style={{display: "none"}}>Selecione</option>
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
              <button className="btn btn-outline-secondary" type="button" id="btnPesquisa" >
                <BsSearch size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TableFilters