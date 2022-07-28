import React from 'react'
import { FiEdit } from "react-icons/fi"

export const RowEdit = (props) => {
  return (
    <div style={{marginLeft: '.8vw'}}>
      <FiEdit 
        className='btnEditTable'
        size={20}
        style={{
          cursor: 'pointer'
        }}
      />
    </div>
  )
}