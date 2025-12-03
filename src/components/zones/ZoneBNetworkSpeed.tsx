import { useApp } from '@/context/AppContext';
import EditableCell from '@/components/EditableCell';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { format } from 'date-fns';

const speedOptions = [
  { value: 'FAST', label: 'FAST' },
  { value: 'SLOW', label: 'SLOW' },
];

const ZoneBNetworkSpeed = () => {
  const { networkSpeed, updateNetworkSpeed, isEditMode } = useApp();

  const renderStatusCell = (
    value: 'FAST' | 'SLOW',
    field: 'googleYahooStatus' | 'secrIndianRailwayStatus' | 'indianRailGovStatus'
  ) => {
    const content = isEditMode ? (
      <select
        value={value}
        onChange={(e) => updateNetworkSpeed(field, e.target.value)}
        className="railway-input-active text-center"
      >
        {speedOptions.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    ) : (
      <span className={cn(
        'font-semibold',
        value === 'FAST' ? 'text-status-ok' : 'text-status-faulty'
      )}>
        {value}
      </span>
    );

    if (networkSpeed.lastEditedBy && networkSpeed.lastEditedAt) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-help">{content}</div>
            </TooltipTrigger>
            <TooltipContent className="z-[100]">
              <p className="text-xs">
                Updated by <strong>{networkSpeed.lastEditedBy}</strong> at{' '}
                {format(new Date(networkSpeed.lastEditedAt), 'dd/MM/yy HH:mm')}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return content;
  };

  return (
    <div className="zone-card">
      <div className="zone-header">
        Zone B: Network Speed Monitor - Different Web Site Response (Fast / Slow)
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-secondary">
              <th className="railway-grid-cell text-center font-semibold">Testing Time</th>
              <th className="railway-grid-cell text-center font-semibold">Dn Link Speed</th>
              <th className="railway-grid-cell text-center font-semibold">Up Link Speed</th>
              <th className="railway-grid-cell text-center font-semibold">Google / Yahoo</th>
              <th className="railway-grid-cell text-center font-semibold">secr.indianrailway.gov.in</th>
              <th className="railway-grid-cell text-center font-semibold">indianrail.gov.in</th>
              <th className="railway-grid-cell text-center font-semibold">Remarks & Action Taken</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-muted/50 transition-colors">
              <td className="railway-grid-cell text-center">
                <EditableCell
                  value={networkSpeed.testingTime}
                  onChange={(val) => updateNetworkSpeed('testingTime', val)}
                  className="text-center"
                  lastEditedBy={networkSpeed.lastEditedBy}
                  lastEditedAt={networkSpeed.lastEditedAt}
                  auditTrail={networkSpeed.auditTrail}
                />
              </td>
              <td className="railway-grid-cell text-center">
                <EditableCell
                  value={networkSpeed.dnLinkSpeed}
                  onChange={(val) => updateNetworkSpeed('dnLinkSpeed', parseFloat(val) || 0)}
                  type="number"
                  className="text-center font-mono"
                  lastEditedBy={networkSpeed.lastEditedBy}
                  lastEditedAt={networkSpeed.lastEditedAt}
                  auditTrail={networkSpeed.auditTrail}
                />
              </td>
              <td className="railway-grid-cell text-center">
                <EditableCell
                  value={networkSpeed.upLinkSpeed}
                  onChange={(val) => updateNetworkSpeed('upLinkSpeed', parseFloat(val) || 0)}
                  type="number"
                  className="text-center font-mono"
                  lastEditedBy={networkSpeed.lastEditedBy}
                  lastEditedAt={networkSpeed.lastEditedAt}
                  auditTrail={networkSpeed.auditTrail}
                />
              </td>
              <td className="railway-grid-cell text-center">
                {renderStatusCell(networkSpeed.googleYahooStatus, 'googleYahooStatus')}
              </td>
              <td className="railway-grid-cell text-center">
                {renderStatusCell(networkSpeed.secrIndianRailwayStatus, 'secrIndianRailwayStatus')}
              </td>
              <td className="railway-grid-cell text-center">
                {renderStatusCell(networkSpeed.indianRailGovStatus, 'indianRailGovStatus')}
              </td>
              <td className="railway-grid-cell">
                <EditableCell
                  value={networkSpeed.remarks}
                  onChange={(val) => updateNetworkSpeed('remarks', val)}
                  placeholder="Remarks"
                  lastEditedBy={networkSpeed.lastEditedBy}
                  lastEditedAt={networkSpeed.lastEditedAt}
                  auditTrail={networkSpeed.auditTrail}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ZoneBNetworkSpeed;
