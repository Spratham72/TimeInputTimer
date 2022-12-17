import { useState, Fragment, useEffect } from "react";
var totalSec, interval
function Solution() {
    const [input, setInput] = useState({min: 0, sec: 0})
    const [display, setDisplay] = useState({min: 0, sec: 0})
    const [isPause, setPause] = useState(true)
    const [flag, setFlag] = useState(false)
    const handleInput = (e) =>{
        setInput({...input, [e.target.name]: e.target.value})
        setFlag(true)
    }
    const start = ()=>{
        calculate(input.sec, input.min)
        setFlag(false)
        setPause(true)
        startTimer()
    }
    const calculate = (sec, min) =>{
        totalSec = (+min*60) + +sec
        if(sec>60){
            min = Math.floor(totalSec/60)
            sec =Math.floor(totalSec%60)
        }
        setDisplay({...display, min,sec})
    }
    const pauseOrResume = () => {
        setPause((prev)=>!prev)
        startTimer()
    }
    const startTimer = () => {
        if(interval){
            clearInterval(interval)
        }
        if(isPause){
            interval = setInterval(()=>{
                if(totalSec === 1){
                    clearInterval(interval)
                }
                totalSec = totalSec -1
                calculate(Math.floor(totalSec%60), Math.floor(totalSec/60))
            },1000)
        }
    }
    const reset = ()=>{
      clearInterval(interval)
      setDisplay({sec:0, min:0})
      setInput({sec:0, min:0})
    }

  return (
    <Fragment>
      <label>
        <input type="number" name="min" value={+input.min} onChange={handleInput}/>
        Minutes
      </label>
      <label>
        <input type="number" name="sec" value={+input.sec} onChange={handleInput}/>
        Seconds
      </label>
      <button onClick={start}>START</button>
      <button onClick={pauseOrResume}>PAUSE / RESUME</button>
      <button onClick={reset}>RESET</button>
      <h1 data-testid="running-clock">{display.min<10?`0${display.min}`:display.min}:{display.sec<10?`0${display.sec}`:display.sec}</h1>
    </Fragment>
  );
}

export default Solution;
