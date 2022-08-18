import React, { useEffect, useRef } from 'react'
import { verificaSessao } from 'auth/login/verificaSessao'
import { useNavigate } from 'react-router-dom'

// Components
import Calendar from './components/calendar/calendar'

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
      <Calendar />
    </section>
  )
}

export default Dashboard