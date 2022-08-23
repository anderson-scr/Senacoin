import React, { useState, useEffect, useRef } from 'react'
import './calendarStyle.css'

// Calendar
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

// API's
import { callCalendarAPI } from 'api/calendar/apiCalendar'

const Calendar = () => {
  const [calendarDate, setCalendarDate] = useState([])
  const effectOnce = useRef(true)
  
  useEffect(() => {
    if(effectOnce.current) {
      (async () => {
        // Set the state to fill calendar
        await setCalendarDate(await callCalendarAPI.dataVencimento(0))
      })()
      return () => effectOnce.current = false
    }
  }, [])

  return (
    <div className='container calendarContainer'>
      {calendarDate.length &&
        <FullCalendar
          plugins={[ dayGridPlugin ]}
          initialView="dayGridMonth"
          height={395}
          locale= {'br'}
          events={calendarDate}
          buttonText={{today: 'Ir Para Hoje'}}
        />
      }
    </div>
  )
}

export default Calendar