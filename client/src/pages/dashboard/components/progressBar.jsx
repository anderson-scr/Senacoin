import React, { useState, useEffect, useRef } from 'react'
import { callAreaAPI } from 'api/common/callArea'

const ProgressBar = () => {
  const effectOnce = useRef(true)
  const [areas, setAreas] = useState([])
  let countColor = 0
  const colors = [
    '#E17E1C',
    '#DF7029',
    '#DC6236',
    '#D95443',
    '#D64550',
    '#6B4D72',
    '#365183',
    '#005594',
    '#365183',
    '#6B4D72',
    '#D64550',
    '#D95443',
    '#DC6236',
    '#DF7029'
  ]
  useEffect(() => {
    if(effectOnce.current) {

      // Fill dropDows unidades
      (async () => {
        setAreas(await callAreaAPI.ativo())
      })()
      return () => effectOnce.current = false
    }
  }, [])

  // Keeps the loop for the coloration in the progress bar
  const selectColor =  () => {
    if(countColor >= 13) {
      countColor = 0
      return colors[countColor] 
    } else {
      countColor++
      return colors[countColor]
    }
  } 

  return (
    <div className='container' style={{height: '35vh', overflowY: 'scroll'}}>
      {areas.length > 0 &&
        areas.map((area, idx) => {
          return (
            <div key={idx} >
              <label className='mt-3' htmlFor="">{area.nome}</label>
              <div className="progress">
                <div className="progress-bar" role="progressbar" style={{width: '15%', backgroundColor: selectColor()}} aria-valuenow={15} aria-valuemin={0} aria-valuemax={100}>15%</div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default ProgressBar