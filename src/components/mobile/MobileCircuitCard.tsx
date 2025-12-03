import { useState } from 'react';
import { CircuitRow, CircuitStatus } from '@/types';
import { useApp } from '@/context/AppContext';
import EditableCell from '@/components/EditableCell';
import StatusBadge from '@/components/StatusBadge';
import { formatDuration } from '@/utils/calculations';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileCircuitCardProps {
  circuit: CircuitRow;
}

const statusOptions = [
  { value: 'OK', label: 'OK' },
  { value: 'FAULTY', label: 'FAULTY' },
  { value: 'NIL', label: 'NIL' },
];

const MobileCircuitCard = ({ circuit }: MobileCircuitCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { updateCircuit, isEditMode } = useApp();

  return (
    <div className={cn(
      "border border-border rounded-lg overflow-hidden bg-card",
      circuit.status === 'FAULTY' && "border-l-4 border-l-destructive"
    )}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-muted-foreground w-8">
            {circuit.srNo}
          </span>
          <span className="font-medium text-sm text-left">{circuit.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={circuit.status} size="sm" />
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="p-3 pt-0 space-y-3 border-t border-border bg-muted/20 animate-fade-in">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Failure Date/Time</label>
              <EditableCell
                value={circuit.failureDateTime}
                onChange={(val) => updateCircuit(circuit.id, 'failureDateTime', val)}
                type="datetime"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Restoration Date/Time</label>
              <EditableCell
                value={circuit.restorationDateTime}
                onChange={(val) => updateCircuit(circuit.id, 'restorationDateTime', val)}
                type="datetime"
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Duration</label>
              <div className="mt-1 font-mono text-sm">
                {formatDuration(circuit.failureDateTime, circuit.restorationDateTime)}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Faulty Section</label>
              <EditableCell
                value={circuit.faultySection}
                onChange={(val) => updateCircuit(circuit.id, 'faultySection', val)}
                placeholder="Section"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground">Remarks & Action Taken</label>
            <EditableCell
              value={circuit.remarks}
              onChange={(val) => updateCircuit(circuit.id, 'remarks', val)}
              type="textarea"
              placeholder="Enter remarks..."
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground">Status</label>
            {isEditMode ? (
              <select
                value={circuit.status}
                onChange={(e) => updateCircuit(circuit.id, 'status', e.target.value as CircuitStatus)}
                className="railway-input-active mt-1"
              >
                {statusOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ) : (
              <div className="mt-1">
                <StatusBadge status={circuit.status} />
              </div>
            )}
          </div>

          {circuit.subRows && circuit.subRows.length > 0 && (
            <div className="pt-2 border-t border-border">
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Sub-entries</label>
              <div className="space-y-2">
                {circuit.subRows.map(subRow => (
                  <MobileCircuitCard key={subRow.id} circuit={subRow} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileCircuitCard;
