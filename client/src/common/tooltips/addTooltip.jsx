import React from 'react'
import { BsPlusCircle } from "react-icons/bs";

const AddTooltip = ({label, permission, msg, onClickFunc}) => {

  return (
    <div className='d-flex'>
      <label htmlFor="dropPerfil" className="form-label"> { label } </label>
      {permission && <div className='addTooltip position-relative' onClick={evt => onClickFunc(evt)} data-msg={ msg } >
        <BsPlusCircle className='tpAdd' size={17}  />  
      </div>}
    </div>
  )
}

export default AddTooltip