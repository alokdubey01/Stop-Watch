import React, { useState, useEffect } from 'react';

function RunningClock() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
          setIsRunning(false);
          clearInterval(timer);
        } else {
          if (seconds === 0) {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          } else {
            setSeconds((prevSeconds) => prevSeconds - 1);
          }
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, minutes, seconds]);

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const handlePauseResume = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setMinutes(0);
    setSeconds(0);
  };

  const formatTime = (value) => (value < 10 ? `0${value}` : value);

  return (
    <div>
      <label>
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(parseInt(e.target.value, 10))}
        />
        Minutes
      </label>
      <label>
        <input
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(parseInt(e.target.value, 10))}
        />
        Seconds
      </label>

      <button onClick={handleStart}>START</button>
      <button onClick={handlePauseResume}>
        {isRunning ? 'PAUSE' : 'RESUME'}
      </button>
      <button onClick={handleReset}>RESET</button>

      <h1 data-testid="running-clock">
        {formatTime(minutes)}:{formatTime(seconds)}
      </h1>
    </div>
  );
}

export default RunningClock;
