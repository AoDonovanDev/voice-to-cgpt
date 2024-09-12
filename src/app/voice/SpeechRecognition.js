'use client'
import { useState, useRef } from "react"
import useSpeechRecognition from "./useSpeechRecognition"

export default function SpeechRecognition ( { dialect } ) {

  const [result, setResult] = useState('')
  const [status, setStatus] = useState('end')
  const [response, setResponse] = useState('')
  const count = useRef(0)
  const speechRecognition = useSpeechRecognition(dialect, setResult, count)
  
  
  async function chatGpt(msg){
    const response = await fetch('http://localhost:3001/', {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({msg: msg})
    })
    const result = await response.json();
    console.log(result);
    return result;
  }
  
  function startWrapper () {
    speechRecognition.start();
    setStatus('start')
   
  }

  async function stopWrapper () {
    speechRecognition.stop();
    setStatus('end');
    const {txtResponse, voiceResponse}  = await chatGpt(result);
    
    const snd = new Audio("data:audio/wav;base64," + voiceResponse);
    snd.play();
    setResponse(txtResponse.message.content)
  
  }


  return (
    <div className="SpeechRecognition">
      <h2 className="mt-4">Transcript</h2>
      <div className="p-3" style={{border: '1px solid gray',
                              height: '300px',
                              borderRadius: '8px'}}>
          <span id="final">{result}</span>
          <span id="interim"></span>
      </div>
      <h2 className="mt-4">Response</h2>
      <div className="p-3" style={{border: '1px solid gray',
                              height: '300px',
                              borderRadius: '8px'}}>
          <span id="final">{response}</span>
      </div>
      <div className="mt-4">
          <button className="btn btn-success" id="start" onClick={startWrapper}>Start</button>
          <button className="btn btn-danger" id="stop" onClick={stopWrapper}>Stop</button>
          <p id="status" className="lead mt-3" style={status === 'start' ? {display: 'block'} : {display: 'none'}}>Listening...</p>
      </div>
    </div>
  )
}