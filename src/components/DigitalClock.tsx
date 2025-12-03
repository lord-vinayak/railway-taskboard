import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-start">
      <span className="text-xs text-primary-foreground/70 uppercase tracking-wider">Position as on</span>
      <span className="digital-clock text-primary-foreground">
        {format(time, 'dd-MM-yyyy HH:mm:ss')}
      </span>
    </div>
  );
};

export default DigitalClock;
