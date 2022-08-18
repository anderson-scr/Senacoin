import React, { useState, useEffect, useRef } from 'react'
import { callAreaAPI } from 'api/common/callArea'

const ItemsAlertTable = () => {
  const effectOnce = useRef(true)
  const [areas, setAreas] = useState([])

  useEffect(() => {
    if(effectOnce.current) {

      // Fill dropDows unidades
      (async () => {
        setAreas(await callAreaAPI.ativo())
      })()
      return () => effectOnce.current = false
    }
  }, [])

  return (
    <div className='container' style={{height: '35vh', overflowY: 'scroll'}}>
      {areas.length > 0 &&
        areas.map((area, idx) => {
          return (
            <div key={idx} >
              <label className='mt-3' htmlFor="">{area.nome}</label>
              <div className="progress">
                <div className="progress-bar" role="progressbar" style={{width: '15%'}} aria-valuenow={15} aria-valuemin={0} aria-valuemax={100}>15%</div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default ItemsAlertTable