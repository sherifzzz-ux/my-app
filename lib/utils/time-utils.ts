interface TimeRemaining {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

/**
 * Format time remaining until a given end date
 */
export function formatTimeRemaining(endDate: Date): TimeRemaining | null {
  const now = new Date();
  const timeDiff = endDate.getTime() - now.getTime();

  if (timeDiff <= 0) {
    return null; // Expired
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  return {
    days: days.toString().padStart(2, '0'),
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
  };
}

/**
 * Check if a date is within the next 24 hours
 */
export function isWithin24Hours(date: Date): boolean {
  const now = new Date();
  const timeDiff = date.getTime() - now.getTime();
  return timeDiff > 0 && timeDiff <= 24 * 60 * 60 * 1000;
}

/**
 * Get relative time string (e.g., "2 hours left", "3 days left")
 */
export function getRelativeTimeString(endDate: Date): string {
  const now = new Date();
  const timeDiff = endDate.getTime() - now.getTime();

  if (timeDiff <= 0) {
    return 'Expired';
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 0) {
    return `${days} jour${days > 1 ? 's' : ''} restant${days > 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `${hours} heure${hours > 1 ? 's' : ''} restante${hours > 1 ? 's' : ''}`;
  } else {
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    return `${minutes} minute${minutes > 1 ? 's' : ''} restante${minutes > 1 ? 's' : ''}`;
  }
}


