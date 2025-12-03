export const calculateDuration = (
  failureDateTime: string | null,
  restorationDateTime: string | null
): { hours: number; minutes: number; totalMinutes: number } | null => {
  if (!failureDateTime) return null;
  
  const failure = new Date(failureDateTime);
  const restoration = restorationDateTime ? new Date(restorationDateTime) : new Date();
  
  if (isNaN(failure.getTime())) return null;
  
  const diffMs = restoration.getTime() - failure.getTime();
  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  return { hours, minutes, totalMinutes };
};

export const formatDuration = (
  failureDateTime: string | null,
  restorationDateTime: string | null
): string => {
  const duration = calculateDuration(failureDateTime, restorationDateTime);
  if (!duration) return '-';
  
  return `${duration.hours}h ${duration.minutes}m`;
};

export const formatDateTime = (dateStr: string | null): string => {
  if (!dateStr) return '-';
  
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
};
