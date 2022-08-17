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

  useEffect(() => {
    console.log(areas)
  }, [areas])

  return (
    <div className='container'>
      <h5>Areas mais acessadas</h5>
      <div className='container' style={{height: '21vh', maxHeight: '21vh', overflowY: 'scroll'}}>
        {areas.length > 0 && 
          areas.map(area => {
            return (
              <>
                <label className='mt-4' htmlFor="">{area.nome}</label>
                <div className="progress">
                  <div className="progress-bar" role="progressbar" style={{width: '15%'}} aria-valuenow={15} aria-valuemin={0} aria-valuemax={100}>15%</div>
                </div>
              </>
            )
          })
        }
      </div>

      <h5 className='mt-5'>Estoque baixo</h5>
      <div>

      </div>
    </div>
  )
}

export default ItemsAlertTable