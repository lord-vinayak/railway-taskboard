import { forwardRef } from 'react';
import { useApp } from '@/context/AppContext';
import { format } from 'date-fns';
import { formatDuration } from '@/utils/calculations';

const PrintView = forwardRef<HTMLDivElement>((_, ref) => {
  const { circuits, networkSpeed, dslamStatus, defectiveSets, positionDate } = useApp();

  const flattenCircuits = () => {
    const result: typeof circuits = [];
    circuits.forEach(circuit => {
      result.push(circuit);
      if (circuit.subRows) {
        circuit.subRows.forEach(sub => result.push(sub));
      }
    });
    return result;
  };

  const allCircuits = flattenCircuits();

  return (
    <div ref={ref} className="hidden print:block p-4 bg-white text-black text-[9px]">
      {/* Header */}
      <div className="text-center mb-2">
        <h1 className="text-sm font-bold">PCSTE/SECR POSITION</h1>
        <p className="text-xs">BILASPUR DIVISION DATE {format(positionDate, 'dd.MM.yyyy')}</p>
      </div>

      <p className="mb-2 text-[8px]">Position as on: {format(positionDate, 'dd/MM/yyyy')}</p>

      {/* Main Circuit Table */}
      <table className="w-full border-collapse mb-4" style={{ borderSpacing: 0 }}>
        <thead>
          <tr>
            <th className="border border-black p-1 text-left bg-gray-100">Sr No.</th>
            <th className="border border-black p-1 text-left bg-gray-100">Name of the circuit</th>
            <th className="border border-black p-1 text-center bg-gray-100">TOTAL FAILURE Dt &Time</th>
            <th className="border border-black p-1 text-center bg-gray-100">RT Dt &Time</th>
            <th className="border border-black p-1 text-center bg-gray-100">RM Hrs.Min</th>
            <th className="border border-black p-1 text-center bg-gray-100">Faulty Section</th>
            <th className="border border-black p-1 text-left bg-gray-100">Failure Remarks & Action taken</th>
            <th className="border border-black p-1 text-center bg-gray-100">Status</th>
          </tr>
        </thead>
        <tbody>
          {allCircuits.map((circuit, idx) => (
            <tr key={circuit.id}>
              <td className="border border-black p-1">{circuit.srNo}</td>
              <td className="border border-black p-1">{circuit.name}</td>
              <td className="border border-black p-1 text-center">{circuit.failureDateTime || ''}</td>
              <td className="border border-black p-1 text-center">{circuit.restorationDateTime || ''}</td>
              <td className="border border-black p-1 text-center">
                {formatDuration(circuit.failureDateTime, circuit.restorationDateTime)}
              </td>
              <td className="border border-black p-1 text-center">{circuit.faultySection}</td>
              <td className="border border-black p-1 text-[8px]">{circuit.remarks}</td>
              <td className="border border-black p-1 text-center">{circuit.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Network Speed Section */}
      <div className="mb-4">
        <p className="font-bold mb-1">Different Web Site Response (Fast / Slow)</p>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-black p-1 bg-gray-100">Testing Time</th>
              <th className="border border-black p-1 bg-gray-100">Dn Link speed</th>
              <th className="border border-black p-1 bg-gray-100">Up Link Speed</th>
              <th className="border border-black p-1 bg-gray-100">Google / Yahoo</th>
              <th className="border border-black p-1 bg-gray-100">secr.indianrailway.gov.in</th>
              <th className="border border-black p-1 bg-gray-100">Indian rail.gov.in</th>
              <th className="border border-black p-1 bg-gray-100">Remarks & Action Taken</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-1 text-center">{networkSpeed.testingTime}</td>
              <td className="border border-black p-1 text-center">{networkSpeed.dnLinkSpeed}</td>
              <td className="border border-black p-1 text-center">{networkSpeed.upLinkSpeed}</td>
              <td className="border border-black p-1 text-center">{networkSpeed.googleYahooStatus}</td>
              <td className="border border-black p-1 text-center">{networkSpeed.secrIndianRailwayStatus}</td>
              <td className="border border-black p-1 text-center">{networkSpeed.indianRailGovStatus}</td>
              <td className="border border-black p-1">{networkSpeed.remarks}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* DSLAM Status */}
      <div className="mb-4">
        <p className="font-bold mb-1">Bandwidth Utilization (As per Cacti Graph)</p>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-black p-1 bg-gray-100">Railnet (700 MBPS MAX BANDWIDTH)</th>
              <th className="border border-black p-1 bg-gray-100">IPDSLAM SECR HQ (300MBPS)</th>
              <th className="border border-black p-1 bg-gray-100">IPDSLAM BSP DIVISION (155 MBPS)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-1 text-center font-bold">{dslamStatus.railnetBandwidth}</td>
              <td className="border border-black p-1 text-center font-bold">{dslamStatus.ipdslamHQ}</td>
              <td className="border border-black p-1 text-center font-bold">{dslamStatus.ipdslamBSP}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Defective Sets */}
      <div>
        <p className="font-bold mb-1">On date opening balance of defective sets at hand at Division (A)</p>
        <table className="w-full border-collapse text-[8px]">
          <thead>
            <tr>
              <th className="border border-black p-1 bg-gray-100">Opening Balance (A)</th>
              <th className="border border-black p-1 bg-gray-100">Received (B)</th>
              <th className="border border-black p-1 bg-gray-100">Closing (C=A+B)</th>
              <th className="border border-black p-1 bg-gray-100">Given for Repair (D)</th>
              <th className="border border-black p-1 bg-gray-100">Repaired Received</th>
              <th className="border border-black p-1 bg-gray-100">For Condemnation</th>
              <th className="border border-black p-1 bg-gray-100">Condemned</th>
              <th className="border border-black p-1 bg-gray-100">Condemned FY</th>
              <th className="border border-black p-1 bg-gray-100">Remarks</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-1 text-center">{defectiveSets.openingBalance}</td>
              <td className="border border-black p-1 text-center">{defectiveSets.receivedFromUser}</td>
              <td className="border border-black p-1 text-center font-bold">
                {defectiveSets.openingBalance + defectiveSets.receivedFromUser}
              </td>
              <td className="border border-black p-1 text-center">{defectiveSets.givenForRepair}</td>
              <td className="border border-black p-1 text-center">{defectiveSets.repairedSetsReceived}</td>
              <td className="border border-black p-1 text-center">{defectiveSets.setsForCondemnation}</td>
              <td className="border border-black p-1 text-center">{defectiveSets.setsCondemned}</td>
              <td className="border border-black p-1 text-center">{defectiveSets.condemnedThisYear}</td>
              <td className="border border-black p-1">{defectiveSets.remarks}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
});

PrintView.displayName = 'PrintView';

export default PrintView;
