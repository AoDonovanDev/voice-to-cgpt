'use client'

import { langs } from './language'
import { useState, useRef } from 'react'
import SpeechRecognition from './SpeechRecognition'




export default function Voice () {
  
  const [dialects, setDialects] = useState([langs[0][1]])
  const [dialect, setDialect] = useState(dialects[0])
  const bloop = useRef(0)
  bloop.current++
  console.log('page', bloop)

  function selectDialects(val) {
    const filt = [...langs].filter(l => l[0] == val)
    setDialects(filt[0].slice(1))
  }

  function selectDialect(val) {
    setDialect(val)
  }



  return (
    <div className="voice">
      <div className="mt-4" id="div_language">
        <h2 className="mb-3">Select Language</h2>
        <select className="select select-info w-full max-w" id="select_language" onChange={(e)=>selectDialects(e.target.value)}>
          {langs.map((l, i) => <option key={i}>{l[0]}</option>)}
        </select>
        <select className="select select-info w-full max-w" id="select_dialect" onClick={(e)=>selectDialect(e.target.value)}>
          {dialects.map((d, i) => <option key={i}>{d[1]}</option>)}
        </select>
    </div>
    <SpeechRecognition dialect={dialect}/>
    </div>
  )

}

