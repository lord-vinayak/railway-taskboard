import { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { AuditEntry } from '@/types';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface EditableCellProps {
  value: string | number | null;
  onChange: (value: string) => void;
  type?: 'text' | 'datetime' | 'number' | 'textarea' | 'select';
  options?: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
  auditTrail?: AuditEntry[];
  lastEditedBy?: string | null;
  lastEditedAt?: Date | null;
}

const EditableCell = ({
  value,
  onChange,
  type = 'text',
  options,
  placeholder = '',
  className = '',
  auditTrail = [],
  lastEditedBy,
  lastEditedAt,
}: EditableCellProps) => {
  const { isEditMode } = useApp();
  const [showTooltip, setShowTooltip] = useState(false);
  const cellRef = useRef<HTMLDivElement>(null);

  const displayValue = value ?? '';

  const renderInput = () => {
    if (!isEditMode) {
      return (
        <span className={cn("block w-full", !displayValue && "text-muted-foreground")}>
          {displayValue || placeholder || '-'}
        </span>
      );
    }

    switch (type) {
      case 'select':
        return (
          <select
            value={String(displayValue)}
            onChange={(e) => onChange(e.target.value)}
            className="railway-input-active"
          >
            {options?.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            value={String(displayValue)}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="railway-input-active min-h-[60px] resize-y"
            rows={2}
          />
        );
      case 'datetime':
        return (
          <input
            type="datetime-local"
            value={String(displayValue)}
            onChange={(e) => onChange(e.target.value)}
            className="railway-input-active"
          />
        );
      case 'number':
        return (
          <input
            type="number"
            value={String(displayValue)}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="railway-input-active"
            step="0.01"
          />
        );
      default:
        return (
          <input
            type="text"
            value={String(displayValue)}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="railway-input-active"
          />
        );
    }
  };

  const hasAudit = lastEditedBy && lastEditedAt;

  return (
    <div
      ref={cellRef}
      className={cn("relative", className)}
      onMouseEnter={() => hasAudit && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {renderInput()}
      
      {showTooltip && hasAudit && (
        <div className="audit-tooltip -top-10 left-0 animate-fade-in z-[100]">
          Updated by <strong>{lastEditedBy}</strong> at{' '}
          {format(new Date(lastEditedAt), 'dd/MM/yy HH:mm')}
        </div>
      )}
    </div>
  );
};

export default EditableCell;
