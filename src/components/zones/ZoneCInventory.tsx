import { useApp } from '@/context/AppContext';
import EditableCell from '@/components/EditableCell';

const ZoneCInventory = () => {
  const { dslamStatus, updateDSLAMStatus, defectiveSets, updateDefectiveSets } = useApp();

  return (
    <div className="zone-card">
      <div className="zone-header">
        Zone C: DSLAM Status & Defective Sets Inventory
      </div>
      <div className="p-4 space-y-6">
        {/* DSLAM Status */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-foreground">
            Bandwidth Utilization (As per Cacti Graph)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-secondary">
                  <th className="railway-grid-cell text-center font-semibold">
                    Railnet (700 MBPS MAX BANDWIDTH)
                  </th>
                  <th className="railway-grid-cell text-center font-semibold">
                    IPDSLAM SECR HQ (300MBPS)
                  </th>
                  <th className="railway-grid-cell text-center font-semibold">
                    IPDSLAM BSP DIVISION (155 MBPS)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-muted/50 transition-colors">
                  <td className="railway-grid-cell text-center">
                    <EditableCell
                      value={dslamStatus.railnetBandwidth}
                      onChange={(val) => updateDSLAMStatus('railnetBandwidth', parseFloat(val) || 0)}
                      type="number"
                      className="text-center font-mono text-lg font-semibold"
                      lastEditedBy={dslamStatus.lastEditedBy}
                      lastEditedAt={dslamStatus.lastEditedAt}
                      auditTrail={dslamStatus.auditTrail}
                    />
                  </td>
                  <td className="railway-grid-cell text-center">
                    <EditableCell
                      value={dslamStatus.ipdslamHQ}
                      onChange={(val) => updateDSLAMStatus('ipdslamHQ', parseFloat(val) || 0)}
                      type="number"
                      className="text-center font-mono text-lg font-semibold"
                      lastEditedBy={dslamStatus.lastEditedBy}
                      lastEditedAt={dslamStatus.lastEditedAt}
                      auditTrail={dslamStatus.auditTrail}
                    />
                  </td>
                  <td className="railway-grid-cell text-center">
                    <EditableCell
                      value={dslamStatus.ipdslamBSP}
                      onChange={(val) => updateDSLAMStatus('ipdslamBSP', parseFloat(val) || 0)}
                      type="number"
                      className="text-center font-mono text-lg font-semibold"
                      lastEditedBy={dslamStatus.lastEditedBy}
                      lastEditedAt={dslamStatus.lastEditedAt}
                      auditTrail={dslamStatus.auditTrail}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Defective Sets */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-foreground">
            Defective Sets at Hand (Division Level)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-secondary">
                  <th className="railway-grid-cell text-center font-semibold">
                    Opening Balance (A)
                  </th>
                  <th className="railway-grid-cell text-center font-semibold">
                    Received from User (B)
                  </th>
                  <th className="railway-grid-cell text-center font-semibold">
                    Closing Balance (C=A+B)
                  </th>
                  <th className="railway-grid-cell text-center font-semibold">
                    Given for Repair (D)
                  </th>
                  <th className="railway-grid-cell text-center font-semibold">
                    Repaired Sets Received
                  </th>
                  <th className="railway-grid-cell text-center font-semibold">
                    S&T Sets for Condemnation
                  </th>
                  <th className="railway-grid-cell text-center font-semibold">
                    S&T Sets Condemned
                  </th>
                  <th className="railway-grid-cell text-center font-semibold">
                    Condemned This FY
                  </th>
                  <th className="railway-grid-cell text-center font-semibold">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-muted/50 transition-colors">
                  <td className="railway-grid-cell text-center">
                    <EditableCell
                      value={defectiveSets.openingBalance}
                      onChange={(val) => updateDefectiveSets('openingBalance', parseInt(val) || 0)}
                      type="number"
                      className="text-center font-mono"
                      lastEditedBy={defectiveSets.lastEditedBy}
                      lastEditedAt={defectiveSets.lastEditedAt}
                      auditTrail={defectiveSets.auditTrail}
                    />
                  </td>
                  <td className="railway-grid-cell text-center">
                    <EditableCell
                      value={defectiveSets.receivedFromUser}
                      onChange={(val) => updateDefectiveSets('receivedFromUser', parseInt(val) || 0)}
                      type="number"
                      className="text-center font-mono"
                      lastEditedBy={defectiveSets.lastEditedBy}
                      lastEditedAt={defectiveSets.lastEditedAt}
                      auditTrail={defectiveSets.auditTrail}
                    />
                  </td>
                  <td className="railway-grid-cell text-center font-mono font-semibold bg-muted/50">
                    {defectiveSets.openingBalance + defectiveSets.receivedFromUser}
                  </td>
                  <td className="railway-grid-cell text-center">
                    <EditableCell
                      value={defectiveSets.givenForRepair}
                      onChange={(val) => updateDefectiveSets('givenForRepair', parseInt(val) || 0)}
                      type="number"
                      className="text-center font-mono"
                      lastEditedBy={defectiveSets.lastEditedBy}
                      lastEditedAt={defectiveSets.lastEditedAt}
                      auditTrail={defectiveSets.auditTrail}
                    />
                  </td>
                  <td className="railway-grid-cell text-center">
                    <EditableCell
                      value={defectiveSets.repairedSetsReceived}
                      onChange={(val) => updateDefectiveSets('repairedSetsReceived', parseInt(val) || 0)}
                      type="number"
                      className="text-center font-mono"
                      lastEditedBy={defectiveSets.lastEditedBy}
                      lastEditedAt={defectiveSets.lastEditedAt}
                      auditTrail={defectiveSets.auditTrail}
                    />
                  </td>
                  <td className="railway-grid-cell text-center">
                    <EditableCell
                      value={defectiveSets.setsForCondemnation}
                      onChange={(val) => updateDefectiveSets('setsForCondemnation', parseInt(val) || 0)}
                      type="number"
                      className="text-center font-mono"
                      lastEditedBy={defectiveSets.lastEditedBy}
                      lastEditedAt={defectiveSets.lastEditedAt}
                      auditTrail={defectiveSets.auditTrail}
                    />
                  </td>
                  <td className="railway-grid-cell text-center">
                    <EditableCell
                      value={defectiveSets.setsCondemned}
                      onChange={(val) => updateDefectiveSets('setsCondemned', parseInt(val) || 0)}
                      type="number"
                      className="text-center font-mono"
                      lastEditedBy={defectiveSets.lastEditedBy}
                      lastEditedAt={defectiveSets.lastEditedAt}
                      auditTrail={defectiveSets.auditTrail}
                    />
                  </td>
                  <td className="railway-grid-cell text-center">
                    <EditableCell
                      value={defectiveSets.condemnedThisYear}
                      onChange={(val) => updateDefectiveSets('condemnedThisYear', parseInt(val) || 0)}
                      type="number"
                      className="text-center font-mono"
                      lastEditedBy={defectiveSets.lastEditedBy}
                      lastEditedAt={defectiveSets.lastEditedAt}
                      auditTrail={defectiveSets.auditTrail}
                    />
                  </td>
                  <td className="railway-grid-cell">
                    <EditableCell
                      value={defectiveSets.remarks}
                      onChange={(val) => updateDefectiveSets('remarks', val)}
                      placeholder="Remarks"
                      lastEditedBy={defectiveSets.lastEditedBy}
                      lastEditedAt={defectiveSets.lastEditedAt}
                      auditTrail={defectiveSets.auditTrail}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoneCInventory;
