import { useState, useRef } from 'react';

function App() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const timerRef = useRef();

  const startTimer = () => {
    if (timerActive) return;
    let totalSeconds = minutes * 60 + hours * 3600 + seconds;
    if (totalSeconds <= 0) return;

    setTimerActive(true);

    timerRef.current = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        const hrs = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        setHours(hrs);
        setMinutes(mins);
        setSeconds(secs);
      } else {
        clearInterval(timerRef.current);
        setTimerActive(false);
      }
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setTimerActive(false);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTimerActive(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <div className="App">
      <h1>Countdown Timer</h1>
      <div>
        <label>Hours:</label>
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label>Minutes:</label>
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label>Seconds:</label>
        <input
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(parseInt(e.target.value))}
        />
      </div>
      <div>
        <button onClick={startTimer}>Start Timer</button>
        <button onClick={stopTimer}>Stop Timer</button>
        <button onClick={resetTimer}>Reset Timer</button>
      </div>
      <div>
        <h2>Time Remaining: {`${hours}:${minutes}:${seconds}`}</h2>
      </div>
    </div>
  );
}

export default App;
