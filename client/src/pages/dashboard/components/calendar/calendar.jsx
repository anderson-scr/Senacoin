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
  const calendarRef = useRef()
  
  useEffect(() => {
    if(effectOnce.current) {
      (async () => {
        // Set the state to fill calendar
        await setCalendarDate([
          ...await callCalendarAPI.dataVencimentoQrcode(0),
          ...await callCalendarAPI.dataVencimentoPromocao(0)
        ])
      })()
      
      return () => effectOnce.current = false
    }
  }, [])

  const addToopTipEvent = (evt) => {
    const extendedProps = evt.event._def.extendedProps
    if(extendedProps.itemName !== undefined) {
      evt.el.setAttribute('data-msg', extendedProps.itemName)
      evt.el.classList.add('addTooltipCalendar')
    } 
  }

  return (
    <div className='container calendarContainer' ref={calendarRef}>
      {calendarDate.length &&
        <FullCalendar
          plugins={[ dayGridPlugin ]}
          initialView="dayGridMonth"
          height={395}
          locale= {'br'}
          events={calendarDate}
          buttonText={{today: 'Ir Para Hoje'}}
          eventDidMount={event => addToopTipEvent(event)}
          // eventDidMount={event => console.log(event.target)}
        />
      }
    </div>
  )
}

export default Calendar