import { useEffect, useRef } from "react";

export default function useSpeechRecognition(dialect, setResult, count) {
  let speechRef= useRef({})
  let speechRecognition = speechRef.current
  
  useEffect(() => {
    speechRef.current = new window.webkitSpeechRecognition();
    console.log('new speech obj')

    speechRef.current.continuous = true;
    speechRef.current.lang = dialect;

    

    speechRef.current.onstart = () => {
      console.log('onStart');
    };

    speechRef.current.onError = () => {
      console.log('onError');
    };

    speechRef.current.onend = () => {
      console.log('onEnd');
    };
    
    let final_transcript = "";

    speechRef.current.onresult = (event) => {
      // Create the interim transcript string locally because we don't want it to persist like final transcript
      let interim_transcript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        // Loop through the results from the speech recognition object.
    // If the result item is Final, add it to Final Transcript, Else add it to Interim transcript
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }
      setResult(final_transcript)
  };
  },[dialect, setResult])
  
  
  

  return speechRecognition
}