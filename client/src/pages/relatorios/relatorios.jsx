import React from 'react'
import { useState } from "react";

const Relatorios = () => {
  return (
    <>
      <form>
        <select class="form-select" aria-label="Default select example">
          <option selected>Selecione seu relatôrio</option>
          <option value="1">Teste Um</option>
          <option value="2">Teste Dois</option>
          <option value="3">Teste Três</option>
        </select>
      </form>
    </>
  )

}

export default Relatorios