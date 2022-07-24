import React from 'react'
import { BsPlusCircle, BsQuestionCircle } from "react-icons/bs";

const AddAndQuestion = ({label, questionMsg, plusMsg}) => {
  return (
    <div className='d-flex'>
      <label htmlFor="dropPerfil" className="form-label"> { label } </label>
      <div className='addTooltip position-relative' data-msg={ questionMsg } >
        <BsQuestionCircle className='tpAdd' size={17}  />  
      </div>
      <div className='addTooltip position-relative' data-msg={ plusMsg } >
        <BsPlusCircle className='tpAdd' size={17}  />  
      </div>
  </div>
  )
}

export default AddAndQuestion