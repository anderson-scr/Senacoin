import React from 'react'
import { NavLink } from 'react-router-dom'

const GenericOption = ({ icon, datatooltip, path, isOpen}) => {
  return (
    <li className='tooltipHover' data-tooltipname={datatooltip}>
      <NavLink to={path} >
        {icon}
      </NavLink>
      <div className='textMenuOption' style={isOpen? 
        {opacity: '1', transitionDelay: '.3s'}
          : 
        {opacity: '0', transitionDelay: '0s'}} >
        {datatooltip}
      </div>
    </li>
  )
}

export default GenericOption

