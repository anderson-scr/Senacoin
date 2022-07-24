import React from 'react'
import { BsQuestionCircle } from "react-icons/bs";

const QuestionTooltip = ({label, msg}) => {
  return (
    <div className='d-flex'>
      <label htmlFor="dropPerfil" className="form-label"> { label } </label>
      <div className='addTooltip position-relative' data-msg={ msg } >
        <BsQuestionCircle className='tpAdd' size={17}  />  
      </div>
    </div>
  )
}

export default QuestionTooltip