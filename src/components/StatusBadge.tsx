import { CircuitStatus } from '@/types';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, MinusCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: CircuitStatus;
  size?: 'sm' | 'md';
}

const StatusBadge = ({ status, size = 'md' }: StatusBadgeProps) => {
  const config = {
    OK: {
      className: 'status-ok',
      icon: CheckCircle,
      label: 'OK',
    },
    FAULTY: {
      className: 'status-faulty',
      icon: XCircle,
      label: 'FAULTY',
    },
    NIL: {
      className: 'status-nil',
      icon: MinusCircle,
      label: 'NIL',
    },
  };

  const { className, icon: Icon, label } = config[status];

  return (
    <span className={cn('status-badge', className, size === 'sm' && 'text-[10px] px-1.5 py-0')}>
      <Icon className={cn('mr-1', size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5')} />
      {label}
    </span>
  );
};

export default StatusBadge;
