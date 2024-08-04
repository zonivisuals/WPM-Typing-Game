import React, { useState, useEffect, useRef } from 'react'

const sampleText = 'this is a wpm and accuracy based typing test game made in react js'

function TypingTest() {
  
    const[input, setInput] = useState('')
    const[isFinished, setIsFinished] = useState(false) //check done typing or no
    const[wpm, setWpm] = useState(0)
    const[currentWpm, setCurrentWpm] = useState(0)
    const[accuracy, setAccuracy] = useState(0)
    const[currentAccuracy, setCurrentAccuracy] = useState(0)
    const[startTime, setStartTime] = useState()
    
    const duration = 20 //seconds test

    const inputRef = useRef(null)
    const lastKeypressTime = useRef(Date.now())

    useEffect(()=>{
        //done typing actions
        if(startTime && input.length >= sampleText.length){
            calculateWpm()  
            calculateAccuracy()
            setIsFinished(true)
        }

        //on typing actions
        if(startTime){
            calculateCurrentAccuracy()
            calculateCurrentWpm()
        }
        
    },[startTime, input])

    
    //functions
    const handleStartTyping = ()=>{
        console.log("started focus ..")
        setStartTime(Date().now)
        inputRef.current.focus()
    }

    const calculateWpm = () => {
        const endTime = Date().getTime()
        const timeSpent = (endTime - startTime)/1000/60 //minutes
        const words = input.trim().split(' ').length
        setWpm((words / timeSpent).toFixed(2))
        setIsFinished(true)
    }

    const calculateAccuracy = () => {
        let correctLetters = 0 
        sampleText.split('').forEach((char, index)=>{
            if(char === input[index]) correctLetters++
        })
        setAccuracy(((correctLetters/sampleText.length)*100).toFixed(2))
    }

    const calculateCurrentWpm = ()=>{
        const currentTime = Date().now
        const timeSpent = (currentTime - startTime)*0.001*0.6 //in minutes
        const words = input.trim().split(' ').length
        setCurrentWpm((words / timeSpent).toFixed(2))
        setIsFinished(true)
    }

    const calculateCurrentAccuracy = ()=>{
        let correctLetters = 0
        sampleText.split('').forEach((char, index)=>{
            if(char === input[index]) correctLetters++
        })
        setCurrentAccuracy(((correctLetters - input.length)*100).toFixed(2))
    }


    //rendering
    const renderText = () => {
        return sampleText.split('').map((char, index)=>{
            let color = 'black'
            if(index < input.length){
                color = char === input[index] ? 'green' : 'red'
            }
            return(
                <span style={{color}} key={index}>{char}</span>
            )
        })
    }

    return (
        <div>
            {
            console.log(isFinished)
            }
            <div>{renderText()}</div>
            <div>
                <input 
                type="text" 
                ref={inputRef}
                value={input} 
                onChange={e => setInput(e.target.value)}
                onFocus={handleStartTyping}    
                disabled = {isFinished}
                />
            </div>
            <div className='current results'>
                <p>current wpm: {currentWpm}</p>
                <p>current Accuracy: {currentAccuracy}</p>
            </div>

            {isFinished && (
                <div className='end results'>
                    <p>WPM: {wpm}</p>
                    <p>Accuracy: {accuracy}</p>
                </div>
            )}

        </div>
  )
}

export default TypingTest