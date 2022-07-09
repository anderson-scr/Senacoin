import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'

const GenericOption = ({ icon, dataToolTip, path, isOpen}) => {
  const containerText = useRef();

  return (
    <li className={
      isOpen? '' : 'toolTipHover'
    } data-datatooltip={dataToolTip}>
      <NavLink to={path} >
        {icon}
      </NavLink>
      <div className='textMenuOption' ref={containerText} style={isOpen? 
        {opacity: '1', transitionDelay: '.3s', display: 'inline'}
          : 
        {opacity: '0', transitionDelay: '0s', display: 'none'}} >
        {dataToolTip}
      </div>
    </li>
  )
}

export default GenericOption

