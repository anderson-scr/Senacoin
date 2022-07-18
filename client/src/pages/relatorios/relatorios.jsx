import React from 'react'
import { useState } from "react";
// import styles from "stylesRelatorios.modules.css";

const Relatorios = () => {
  return (
    <>
      <div className='formRelatorios'>
        <form className="col-6">
          <select className="form-select mb-3" aria-label="Default select example">
            <option selected>Selecione seu relatôrio</option>
            <option value="1">Alunos</option>
            <option value="1">Unidades</option>
            <option value="1">Administradores</option>
          </select>

          {/* <select class="form-select mb-3" aria-label="Default select example">
            <option selected>Selecione seu relatôrio</option>
            <option value="1">Teste Um</option>
            <option value="2">Teste Dois</option>
            <option value="3">Teste Três</option>
          </select> */}

          <label htmlFor="inicio" class="mb-1">Inicio</label>
          <input type="date" className="form-control col-3" id="inicio" />
          <label htmlFor="fim" class="mb-1">Fim</label>
          <input type="date" className="form-control col-3" id="fim" />

          <input type="submit" className='btn btn-primary w-50 m-3' value="Gerar relatório" />

        </form>

      </div>
    </>    
  )
}

export default Relatorios