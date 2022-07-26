import React from 'react'
import { useState } from "react"
import { useEffect } from "react";
import generatePDF from './relatorios/alunos/generatePDF'
import { BsFileEarmarkPdf } from "react-icons/bs";
import { AiFillPicture } from 'react-icons/ai';
// import styles from "stylesRelatorios.modules.css";

const Relatorios = () => {

  // function test() {
  //   console.log(tipo, dataInicio, dataFim)
  // }

  const [typeReport, setTypeReport] = useState()
  const [dateStart, setDateStart] = useState()
  const [dateEnd, setDateEnd] = useState()  

  return (
    <>
      <div className='formRelatorios'>
        <form className=''>
          <select className="form-select mb-3 col-6" aria-label="Default select example" onChange={(e) => setTypeReport(e.target.value)}>
            <option selected>Selecione seu relatôrio</option>
            <option value="1">Alunos</option>
            <option value="2">Unidades*</option>
            <option value="3">Administradores*</option>
            <option value="4">Matrículas</option>
          </select>
          <div className='d-flex col-4'>            
            <div>
              <label htmlFor="inicio" class="mb-1">Inicio</label>
              <input onChange={(e) => setDateStart(e.target.value)} type="date" className="form-control col-3" id="inicio" />
            </div>
            <div className=''>
              <label htmlFor="fim" class="mb-1">Fim</label>
              <input onChange={(e) => setDateEnd(e.target.value)} type="date" className="form-control col-3" id="fim" />
            </div>
          </div>
          <div className='btns d-flex flex-column mt-3'>
            <input onClick={generatePDF} type="button" className='btn btn-danger col-3 mt-3' value="Gerar PDF" />
          </div>
        </form>
      </div>
    </>
  )
}

export default Relatorios