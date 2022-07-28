import React from 'react'
import { BsSearch } from "react-icons/bs";

const GlobalFilter = ({filter, setFilter}) => {
  return (
    <div className="mb-3 col-3">
      <label htmlFor="iptPesquisa" className="form-label">Pesquisar</label>
      <div className="input-group">
        <input id="iptPesquisa" type="text" className="form-control" aria-label="Search input" value={filter || 'Pesquisar'} aria-describedby="button-addon2" />
        <button className="btn btn-outline-secondary" type="button" id="btnPesquisa" >
          <BsSearch size={18} />
        </button>
      </div>
    </div>
  )
}

export default GlobalFilter