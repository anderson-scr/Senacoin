import React, { useState, useEffect, useRef } from 'react'
import GlobalFilter from './globalFilter';
import { callUnidadeAPI } from 'api/common/callUnidades';
import { callAreaAPI } from 'api/common/callArea';
import { callSubcategoriaAPI } from 'api/common/callSubcategoria';

const TableFilters = ({categoriaOrUnidade, area, subcategoria, ativo}) => {
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
          {area && // Check if it's to render this element
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
          </div>}
          {subcategoria && // Check if it's to render this element
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
          </div>}
          {ativo && // Check if it's to render this element
          <div className='mb-3 col-3 '>
            <label htmlFor="dropSubcategoria" className="form-label">Ativo</label>
            <select className="form-select" id='dropSubcategoria' aria-label="Default select example" defaultValue="DEFAULT">
              <option value="DEFAULT" disabled style={{display: "none"}}>Selecione</option>
              <option value="1" >Ativo</option>
              <option value="2" >Inativo</option>
            </select>
          </div>}
          {!categoriaOrUnidade && // Check if it's to render this element
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
          </div>}
          {categoriaOrUnidade && <div className='mb-3 col-3 '>
            <label htmlFor="dropSubcategoria" className="form-label">Categoria</label>
            <select className="form-select" id='dropSubcategoria' aria-label="Default select example" defaultValue="DEFAULT">
              <option value="DEFAULT" disabled style={{display: "none"}}>Selecione</option>
              {unidades.length > 1 &&
                unidades.map((unidade, idx) => {
                  return <option key={idx} value={idx + 1}>{unidade.nome}</option>
                })
              }
            </select>
          </div>}
         <GlobalFilter filter='texto' setFilter={'texto'}/>
        </div>
      </div>
    </div>
  )
}

export default TableFilters