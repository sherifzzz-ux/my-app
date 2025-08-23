import { useState, useEffect } from 'react';
import { formatTimeRemaining } from '@/lib/utils/time-utils';

interface CountdownTimerProps {
  endDate: Date;
  className?: string;
}

export function CountdownTimer({ endDate, className = '' }: CountdownTimerProps) {
  // Render a stable initial value during SSR to avoid hydration mismatch
  const [hasMounted, setHasMounted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(() => null as ReturnType<typeof formatTimeRemaining>);

  useEffect(() => {
    setHasMounted(true);
    setTimeRemaining(formatTimeRemaining(endDate));
    const interval = setInterval(() => {
      setTimeRemaining(formatTimeRemaining(endDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  if (!hasMounted || !timeRemaining) {
    return (
      <div className={`text-center p-4 rounded-lg bg-muted ${className}`}>
        <span className="text-lg font-bold text-muted-foreground">Offre expirée</span>
      </div>
    );
  }

  return (
    <div className={`flex justify-center gap-2 ${className}`}>
      <div className="countdown-item min-w-[60px]">
        <div className="text-2xl font-bold text-primary font-playfair">
          {timeRemaining.days}
        </div>
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Jours
        </div>
      </div>
      
      <div className="countdown-item min-w-[60px]">
        <div className="text-2xl font-bold text-primary font-playfair">
          {timeRemaining.hours}
        </div>
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Heures
        </div>
      </div>
      
      <div className="countdown-item min-w-[60px]">
        <div className="text-2xl font-bold text-primary font-playfair">
          {timeRemaining.minutes}
        </div>
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Min
        </div>
      </div>
      
      <div className="countdown-item min-w-[60px]">
        <div className="text-2xl font-bold text-primary font-playfair">
          {timeRemaining.seconds}
        </div>
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Sec
        </div>
      </div>
    </div>
  );
}