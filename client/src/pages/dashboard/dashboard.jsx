import React, { useEffect, useRef, useState } from 'react'
import { verificaSessao } from 'auth/login/verificaSessao'
import { useNavigate } from 'react-router-dom'

// Components
import Calendar from './components/calendar/calendar'
import ProgressBar from './components/progressBar'

// API's 
import { callQrcodeAPI } from 'api/qrcode/apiQrcode'

// Table 
import Table from 'common/table/tableIndex'
import { lastFourTableSchema } from 'common/table/schemas/lastFourQrcode'

const Dashboard = () => {
  const effectOnce = useRef(true)
  const navigate = useNavigate()
  
  useEffect(() => {
    if(effectOnce.current) {
      if(!verificaSessao()) {
        navigate("/Login", {replace: true})
      }


      return () => effectOnce.current = false
    }
  }, [navigate])

  return (
    <section className='container'>
      <div className='row mb-5' style={{maxHeight: '35vh'}} >
        <div className='col-5 mt-3' >
          <h3 className='mb-3'>Areas mais acessadas</h3>
          <ProgressBar />
        </div>
        <div className='col-7 mt-3'>
          <Calendar />
        </div>
      </div>
      <div className='row'>
        <h3 className='mt-5' style={{margin: '0'}}>Qrcodes próximos de vencer</h3>
        <Table filters={false} rowCount={10} resizeContainer={true} apiRoute={callQrcodeAPI.paraVencer} columnSchema={lastFourTableSchema} editColumn={false} enablePagination={false} />
      </div>
    </section>
  )
}

export default Dashboard