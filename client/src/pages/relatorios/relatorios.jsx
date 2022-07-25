import React from 'react'
import { useState } from "react"
import clientesPDF from './relatorios/alunos/clientes'
import { BsFileEarmarkPdf } from "react-icons/bs";
// import styles from "stylesRelatorios.modules.css";

const Relatorios = () => {

  function test() {
    console.log(tipo, dataInicio, dataFim)
  }

  const [tipo, setTipo] = useState()
  const [dataInicio, setDataInicio] = useState()
  const [dataFim, setDataFim] = useState()

  return (
    <>
      <div className='formRelatorios'>
        <form className=''>
          <select className="form-select mb-3 col-6" aria-label="Default select example" onChange={(e) => setTipo(e.target.value)}>
            <option selected>Selecione seu relatôrio</option>
            <option value="1">Alunos</option>
            <option value="2">Unidades*</option>
            <option value="3">Administradores*</option>
            <option value="4">Matrículas</option>
          </select>
          <div className='d-flex col-4'>            
            <div>
              <label htmlFor="inicio" class="mb-1">Inicio</label>
              <input onChange={(e) => setDataInicio(e.target.value)} type="date" className="form-control col-3" id="inicio" />
            </div>
            <div className=''>
              <label htmlFor="fim" class="mb-1">Fim</label>
              <input onChange={(e) => setDataFim(e.target.value)} type="date" className="form-control col-3" id="fim" />
            </div>
          </div>
          <div className='btns d-flex flex-column mt-3'>
            <input onClick={clientesPDF} type="button" className='btn btn-danger col-3 mt-3' value="Gerar PDF" />            
            <input onClick={clientesPDF} type="button" className='btn btn-success col-3 mt-3' value="Gerar Excel" />            
            <input type="submit" className='btn btn-primary col-3 mt-3' value="Visualizar Relatório" />
          </div>
        </form>
      </div>
    </>
  )
}

export default Relatorios