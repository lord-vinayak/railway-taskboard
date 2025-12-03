import { useApp } from '@/context/AppContext';
import EditableCell from '@/components/EditableCell';
import StatusBadge from '@/components/StatusBadge';
import { CircuitRow, CircuitStatus } from '@/types';
import { formatDuration } from '@/utils/calculations';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const statusOptions = [
  { value: 'OK', label: 'OK' },
  { value: 'FAULTY', label: 'FAULTY' },
  { value: 'NIL', label: 'NIL' },
];

const ZoneACircuitTable = () => {
  const { circuits, updateCircuit, isEditMode } = useApp();
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set(['c13']));

  const toggleExpand = (id: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const renderRow = (row: CircuitRow, isSubRow = false) => {
    const hasSubRows = row.subRows && row.subRows.length > 0;
    const isExpanded = expandedRows.has(row.id);

    return (
      <>
        <tr 
          key={row.id} 
          className={cn(
            "hover:bg-muted/50 transition-colors",
            isSubRow && "bg-muted/30",
            row.status === 'FAULTY' && "bg-destructive/5"
          )}
        >
          <td className="railway-grid-cell text-center font-medium w-12">
            {row.srNo}
          </td>
          <td className="railway-grid-cell">
            <div className="flex items-center gap-2">
              {hasSubRows && (
                <button
                  onClick={() => toggleExpand(row.id)}
                  className="p-0.5 hover:bg-muted rounded"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              )}
              <span className={cn(isSubRow && "pl-4", "font-medium")}>
                {row.name}
              </span>
            </div>
          </td>
          <td className="railway-grid-cell w-40">
            <EditableCell
              value={row.failureDateTime}
              onChange={(val) => updateCircuit(row.id, 'failureDateTime', val)}
              type="datetime"
              auditTrail={row.auditTrail}
              lastEditedBy={row.lastEditedBy}
              lastEditedAt={row.lastEditedAt}
            />
          </td>
          <td className="railway-grid-cell w-40">
            <EditableCell
              value={row.restorationDateTime}
              onChange={(val) => updateCircuit(row.id, 'restorationDateTime', val)}
              type="datetime"
              auditTrail={row.auditTrail}
              lastEditedBy={row.lastEditedBy}
              lastEditedAt={row.lastEditedAt}
            />
          </td>
          <td className="railway-grid-cell text-center w-24 font-mono">
            {formatDuration(row.failureDateTime, row.restorationDateTime)}
          </td>
          <td className="railway-grid-cell w-28">
            <EditableCell
              value={row.faultySection}
              onChange={(val) => updateCircuit(row.id, 'faultySection', val)}
              placeholder="Section"
              auditTrail={row.auditTrail}
              lastEditedBy={row.lastEditedBy}
              lastEditedAt={row.lastEditedAt}
            />
          </td>
          <td className="railway-grid-cell min-w-[200px]">
            <EditableCell
              value={row.remarks}
              onChange={(val) => updateCircuit(row.id, 'remarks', val)}
              type="textarea"
              placeholder="Remarks & Action Taken"
              auditTrail={row.auditTrail}
              lastEditedBy={row.lastEditedBy}
              lastEditedAt={row.lastEditedAt}
            />
          </td>
          <td className="railway-grid-cell text-center w-28">
            {isEditMode ? (
              <select
                value={row.status}
                onChange={(e) => updateCircuit(row.id, 'status', e.target.value as CircuitStatus)}
                className="railway-input-active text-center"
              >
                {statusOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ) : (
              <StatusBadge status={row.status} />
            )}
          </td>
        </tr>
        {hasSubRows && isExpanded && row.subRows!.map(subRow => renderRow(subRow, true))}
      </>
    );
  };

  return (
    <div className="zone-card">
      <div className="zone-header flex items-center justify-between">
        <span>Zone A: Circuit & Equipment Status</span>
        <span className="text-xs font-normal opacity-80">
          {circuits.length} circuits • {circuits.filter(c => c.status === 'FAULTY').length} faulty
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-secondary">
              <th className="railway-grid-cell text-left font-semibold">Sr No.</th>
              <th className="railway-grid-cell text-left font-semibold">Name of the Circuit</th>
              <th className="railway-grid-cell text-left font-semibold">Total Failure (Dt & Time)</th>
              <th className="railway-grid-cell text-left font-semibold">RT (Dt & Time)</th>
              <th className="railway-grid-cell text-left font-semibold">RM (Hrs:Min)</th>
              <th className="railway-grid-cell text-left font-semibold">Faulty Section</th>
              <th className="railway-grid-cell text-left font-semibold">Failure Remarks & Action Taken</th>
              <th className="railway-grid-cell text-center font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {circuits.map(row => renderRow(row))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ZoneACircuitTable;
