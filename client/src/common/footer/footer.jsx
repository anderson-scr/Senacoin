import React from 'react'
import logoSenac from 'assets/imgs/senacLogo.png';
import './footerStyle.css'

const Footer = () => {
  return (
    <section className='containerFooter'>
      Fabrica de Software - Turma 56
      <img src={ logoSenac } alt="Senac" className='logoSenac' />
    </section>
  )
}

export default Footer