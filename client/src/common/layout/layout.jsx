import React, { useState } from 'react'
import BarraLateral from 'common/sideBar'
import { Outlet } from "react-router-dom";
import Header from 'common/header/header';
import Footer from 'common/footer/footer';

// Page in context
import { pageInContext } from 'contexts/pageInContext';


const Layout = () => {
  const [pageIn, setPageIn] = useState()

  return (
    <div className='mainContainer d-flex'>
      <pageInContext.Provider value={{pageIn, setPageIn}} >
        <BarraLateral />
        <main className='mainSection d-flex flex-grow-1 justify-content-center'>
          <section className='d-flex flex-column justify-content-between m-4 bd-highlight w-75'>
            <Header />
            <Outlet />
            <Footer />
          </section>
        </main>
      </pageInContext.Provider>
    </div>
  )
}

export default Layout