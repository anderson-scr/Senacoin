import React from 'react'
import BarraLateral from 'common/sideBar'
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className='mainContainer' style={{display: 'flex'}}>
      <BarraLateral />
      <section className='mainSection'>
        <Outlet />
      </section>
    </div>
  )
}

export default Layout