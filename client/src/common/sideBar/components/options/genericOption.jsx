import React from 'react'

const GenericOption = ({ icon, datatooltip, path}) => {
  return (
    <li className='tooltipHover' data-tooltipName='Gerenciar Pontos'>
    <BsPencilSquare className='icon' size={30} />
  </li>
  )
}

export default GenericOption