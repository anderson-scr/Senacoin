import React from 'react'
import { useState } from "react"
import { useEffect } from "react";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { AiFillPicture } from 'react-icons/ai';
import XLSX from "xlsx";

//relatórios
import alunosPDF from './relatorios/alunos/alunosPDF'
import geraXLSX from './relatorios/alunos/alunosXLSX';
import unidadesPDF from './relatorios/unidades/unidadesPDF'




const Relatorios = () => {

  const [typeReport, setTypeReport] = useState()
  const [dateStart, setDateStart] = useState()
  const [dateEnd, setDateEnd] = useState()

  function selectReportPDF() {
    switch (typeReport) {
      case '1':
        alunosPDF()
        break;    
      case '2':
        unidadesPDF()
        break;    
      case '3':
        alert('Relatório Administradores* selecionado')
        break;    
      case '4':
        alert('Relatório Matrículas selecionado')
        break;    
      default:
        alert(`Selecione um relatório`)
        break;
    }  
  }

  function selectReportXLSX() {
    switch (typeReport) {
      case '1':
        geraXLSX()
        break;    
      case '2':
        alert('Relatório XLXS')
        break;    
      case '3':
        alert('Relatório XLXS')
        break;    
      case '4':
        alert('Relatório XLXS')
        break;    
      default:
        alert('Relatório XLXS')
        break;
    }
  }

  return (
    <>
      <div className='formRelatorios'>
        <form className=''>
          <select className="form-select mb-3 col-6" aria-label="Default select example" onChange={(e) => setTypeReport(e.target.value)}>
            <option value='0' selected>Selecione seu relatôrio</option>
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
            <input onClick={selectReportPDF} type="button" className='btn btn-danger col-3 mt-3' value="Gerar PDF" />
          </div>
          <div className='btns d-flex flex-column mt-3'>
            <input onClick={selectReportXLSX} type="button" className='btn btn-success col-3 mt-3' value="Gerar XLXS" />
          </div>
        </form>
      </div>
    </>
  )
}

export default Relatorios