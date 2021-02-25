// Globals
import './styles.scss';
import React, { useState, useRef, useEffect } from 'react';

const format = (time) => {
  let seconds = time % 60;
  let minutes = Math.floor(time / 60);
  seconds = seconds.toString().length === 1 ? '0' + seconds : seconds;
  return `${minutes}:${seconds}`;
};

// Components
import { Button } from 'components/Button';

// Sub-component
function Expired() {
  return (
    <div className='aura-expired'>
      <div className='aura-expired-emoji'>⚠️</div>
      <div className='aura-expired-text'>Timer expired!</div>
    </div>
  );
}

// Component
function Timer() {
  // Hooks - state
  const [counter, setCounter] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timeout;
    if (counter > 0 && running) {
      timeout = setTimeout(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
    } else {
      setRunning(false);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [counter, running]);

  const handleStart = () => {
    setRunning(true);
  };

  const handleReset = () => {
    setCounter(60);
  };

  // TODO: implement counter...

  // Render
  return (
    <div className='aura-page aura-timer'>
      <h1>Timer</h1>

      <div className='aura-page-content'>
        <div className='aura-timer-clock'>{format(counter)}</div>
        {counter <= 0 ? <Expired /> : null}

        <div className='aura-timer-buttons'>
          <Button onClick={handleStart}>Start</Button>
          <Button onClick={handleReset}>Reset</Button>
        </div>
      </div>
    </div>
  );
}

export { Timer };
