import React, { useState, useEffect, useRef } from 'react'
import './calendarStyle.css'

// Calendar
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

// API's
import { callQrcodeAPI } from 'api/qrcode/apiQrcode'

const Calendar = () => {
  const [qrCode, setQrCode] = useState([])
  const effectOnce = useRef(true)
  
  useEffect(() => {
    if(effectOnce.current) {
      (async () => {
        setQrCode(await callQrcodeAPI.todos(0))
      })()
      return () => effectOnce.current = false
    }
  }, [])

  const handleEventAdd = async  event => {

  }

  return (
    <div className='container calendarContainer'>
      {qrCode.length &&
        <FullCalendar
          plugins={[ dayGridPlugin ]}
          initialView="dayGridMonth"
          height={650}
          eventAdd={event => handleEventAdd(event)}
        />
      }
    </div>
  )
}

export default Calendar