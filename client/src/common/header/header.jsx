import React, { useContext } from 'react'
import './headerStyle.css'
import { pageInContext } from 'contexts/pageInContext'

const Header = () => {
  const {pageIn} = useContext(pageInContext)

  return (
    <section className='containerHeader'>
      {pageIn}
    </section>
  )
}

export default Header