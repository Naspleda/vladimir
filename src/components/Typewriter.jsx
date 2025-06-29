import { useState, useEffect } from 'react';

function Typewriter({ text, speed = 100, className = '', onComplete }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(prev => prev + text.charAt(i));
      i++;
      if (i === text.length) {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, onComplete]);

  return <span className={className}>{displayed}</span>;
}

export default Typewriter;