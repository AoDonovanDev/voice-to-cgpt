let speechRecognition = new webkitSpeechRecognition();
  console.log(speechRecognition)
  speechRecognition.continuous = true;
  speechRecognition.lang = dialect;

  speechRecognition.onstart = () => {
    console.log('onStart')
    setStatus('start')
  };

  speechRecognition.onError = () => {
    console.log('onError')
    setStatus('error')
 
  };

  speechRecognition.onend = () => {
    console.log('onEnd')
    setStatus('end')
 
  };
  console.log(status)
  if(status === 'end'){
    speechRecognition.stop()
  }

  let final_transcript = "";

  speechRecognition.onresult = (event) => {
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