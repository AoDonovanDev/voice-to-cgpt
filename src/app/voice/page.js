'use client'

import { langs } from './language'
import { useState } from 'react'
import { langMap } from './langMap'
import SpeechRecognition from './SpeechRecognition'




export default function Voice () {
  
  const [language, setLanguage] = useState("English")
  const [dialect, setDialect] = useState(langMap[language][0]);


  function selectLanguage(val) {
    setLanguage(val);
  }

  function selectDialect(val) {
    setDialect(val);
  }



  return (
    <div className="voice">
      <div className="mt-4" id="div_language">
        <h2 className="mb-3">Select Language</h2>
        <select className="select select-info w-full max-w" id="select_language" onChange={(e)=>selectLanguage(e.target.value)} defaultValue={"English"}>
          {Object.keys(langMap).map((l, i) => <option key={i}>{l}</option>)}
        </select>
        <select className="select select-info w-full max-w" id="select_dialect" onClick={(e)=>selectDialect(e.target.value)} disabled={langMap[language].length < 2}>
          {langMap[language].map((d, i) => <option key={i} value={d[0]}>{d[1]}</option>)}
        </select>
    </div>
    <SpeechRecognition dialect={dialect}/>
    </div>
  )

}

