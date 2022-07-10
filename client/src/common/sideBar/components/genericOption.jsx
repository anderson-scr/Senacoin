import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'

const GenericOption = ({ icon, dataToolTip, path, isOpen, click}) => {
  const containerText = useRef();

  return (
    <NavLink to={path} >
      <li className={
        isOpen? '' : 'toolTipHover'
      } data-datatooltip={dataToolTip} onClick={evt => click(evt)}>
          {icon}
          <div className='textMenuOption' ref={containerText} style={isOpen? 
            {opacity: '1', transitionDelay: '.3s', display: 'inline'}
            : 
            {opacity: '0', transitionDelay: '0s', display: 'none'}} >
            {dataToolTip}
          </div>
      </li>
    </NavLink>
  )
}

export default GenericOption

