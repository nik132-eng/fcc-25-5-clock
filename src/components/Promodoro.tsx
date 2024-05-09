import { useState, useEffect } from 'react';

function PomodoroTimer() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [timerLabel, setTimerLabel] = useState('Session');
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const timerId = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        } else {
          if (timerLabel === 'Session') {
            setTimerLabel('Break');
            setTimeLeft(breakLength * 60);
          } else {
            setTimerLabel('Session');
            setTimeLeft(sessionLength * 60);
          }
        }
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [isRunning, timeLeft, breakLength, sessionLength, timerLabel]);

  useEffect(() => {
    setTimeLeft(sessionLength * 60);
  }, [sessionLength]);

  const handleBreakDecrement = () => {
    setBreakLength(Math.max(1, breakLength - 1));
  };

  const handleBreakIncrement = () => {
    setBreakLength(Math.min(60, breakLength + 1));
  };

  const handleSessionDecrement = () => {
    setSessionLength(Math.max(1, sessionLength - 1));
  };

  const handleSessionIncrement = () => {
    setSessionLength(Math.min(60, sessionLength + 1));
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(sessionLength * 60);
    setIsRunning(false);
    setTimerLabel('Session');
  };

  function formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  return (
    <div className="timer-container">
      <h1 className="timer-label">{timerLabel}</h1>
      <h1 className="time-left">{formatTime(timeLeft)}</h1>

      <div className="button-container">
        <button id="break-decrement" className="button" onClick={handleBreakDecrement}>-</button>
        <h1 id="break-label" className="label">Break Length: {breakLength}</h1>
        <button id="break-increment" className="button" onClick={handleBreakIncrement}>+</button>
      </div>

      <div className="button-container">
        <button id="session-decrement" className="button" onClick={handleSessionDecrement}>-</button>
        <h1 id="session-label" className="label">Session Length: {sessionLength}</h1>
        <button id="session-increment" className="button" onClick={handleSessionIncrement}>+</button>
      </div>

      <div className="button-container">
        <button id="start_stop" className="button" onClick={handleStartStop}>
          {isRunning? 'Stop' : 'Start'}
        </button>
        <button id="reset" className="button" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default PomodoroTimer;