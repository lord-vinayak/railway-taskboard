import { CircuitRow, NetworkSpeedEntry, DSLAMStatus, DefectiveSetsEntry, User } from '@/types';

export const users: User[] = [
  { id: '1', name: 'SSE/Tele/BSP', role: 'SSE', designation: 'Senior Section Engineer - Telecom' },
  { id: '2', name: 'JE/Network', role: 'JE', designation: 'Junior Engineer - Network' },
  { id: '3', name: 'SSE/Sig/BSP', role: 'SSE', designation: 'Senior Section Engineer - Signal' },
  { id: '4', name: 'JE/Tele/BSP', role: 'JE', designation: 'Junior Engineer - Telecom' },
  { id: '5', name: 'Tech/BSP', role: 'Tech', designation: 'Technician' },
];

export const initialCircuits: CircuitRow[] = [
  { id: 'c1', srNo: 1, name: 'ICMS & COM-POSITION', failureDateTime: null, restorationDateTime: null, durationMinutes: null, faultySection: '', remarks: '', status: 'NIL', lastEditedBy: null, lastEditedAt: null, auditTrail: [] },
  { id: 'c2', srNo: 2, name: 'Important Event', failureDateTime: null, restorationDateTime: null, durationMinutes: null, faultySection: '', remarks: '', status: 'NIL', lastEditedBy: null, lastEditedAt: null, auditTrail: [] },
  { id: 'c3', srNo: 3, name: 'FOIS-63, (VSAT)-25', failureDateTime: null, restorationDateTime: null, durationMinutes: null, faultySection: '', remarks: '', status: 'NIL', lastEditedBy: null, lastEditedAt: null, auditTrail: [] },
  { id: 'c4', srNo: 4, name: 'Exchange', failureDateTime: null, restorationDateTime: null, durationMinutes: null, faultySection: '', remarks: '', status: 'OK', lastEditedBy: null, lastEditedAt: null, auditTrail: [] },
  { id: 'c5', srNo: 5, name: 'GM-CRB Hot line', failureDateTime: null, restorationDateTime: null, durationMinutes: null, faultySection: '', remarks: '', status: 'OK', lastEditedBy: null, lastEditedAt: null, auditTrail: [] },
  { id: 'c6', srNo: 6, name: 'Video conferencing eqpt With Div', failureDateTime: null, restorationDateTime: null, durationMinutes: null, faultySection: '', remarks: '', status: 'OK', lastEditedBy: null, lastEditedAt: null, auditTrail: [] },
  { id: 'c7', srNo: 7, name: 'SECR Projectors', failureDateTime: null, restorationDateTime: null, durationMinutes: null, faultySection: '', remarks: '', status: 'OK', lastEditedBy: null, lastEditedAt: null, auditTrail: [] },
  { id: 'c8', srNo: 8, name: 'Rly Board Video Phones (GM,CSTE,CEE)', failureDateTime: null, restorationDateTime: null, durationMinutes: null, faultySection: '', remarks: '', status: 'OK', lastEditedBy: null, lastEditedAt: null, auditTrail: [] },
  { id: 'c9', srNo: 9, name: 'CCTV/BSP', failureDateTime: null, restorationDateTime: null, durationMinutes: null, faultySection: '', remarks: '', status: 'OK', lastEditedBy: null, lastEditedAt: null, auditTrail: [] },
  { id: 'c10', srNo: 10, name: 'CFTM / CONFERENCE', failureDateTime: null, restorationDateTime: null, durationMinutes: null, faultySection: '', remarks: '', status: 'OK', lastEditedBy: null, lastEditedAt: null, auditTrail: [] },
  { id: 'c11', srNo: 11, name: 'V-SAT/FOIS/PMS', failureDateTime: null, restorationDateTime: null, durationMinutes: null, faultySection: '', remarks: '', status: 'OK', lastEditedBy: null, lastEditedAt: null, auditTrail: [] },
  { id: 'c12', srNo: 12, name: 'RAILNET/INTERNET', failureDateTime: null, restorationDateTime: null, durationMinutes: null, faultySection: '', remarks: '', status: 'OK', lastEditedBy: null, lastEditedAt: null, auditTrail: [] },
  { 
    id: 'c13', 
    srNo: 13, 
    name: 'CGDB', 
    failureDateTime: null, 
    restorationDateTime: null, 
    durationMinutes: null, 
    faultySection: '', 
    remarks: '', 
    status: 'OK', 
    lastEditedBy: null, 
    lastEditedAt: null, 
    auditTrail: [],
    subRows: [
      { id: 'c13-1', srNo: 13.1, name: 'CGDB/BRJN', failureDateTime: '2025-03-02T14:00', restorationDateTime: null, durationMinutes: null, faultySection: 'BRJN', remarks: 'Out of 26, 12 nos CGDB of PF No 01,not working due to data sending problem. (Company - Patronics Pvt Ltd // No AMC)', status: 'FAULTY', lastEditedBy: null, lastEditedAt: null, auditTrail: [] },
      { id: 'c13-2', srNo: 13.2, name: 'CGDB/RIG', failureDateTime: '2005-09-12T18:00', restorationDateTime: null, durationMinutes: null, faultySection: 'RIG', remarks: 'At RIG/STN CGDB of PF No 02, out of 24 boards 04 no boards (Board No 01 04) are not working due to OSU work.', status: 'FAULTY', lastEditedBy: null, lastEditedAt: null, auditTrail: [] },
      { id: 'c13-3', srNo: 13.3, name: 'CGDB NIA', failureDateTime: '2025-11-19T14:00', restorationDateTime: null, durationMinutes: null, faultySection: 'NIA', remarks: 'At NIA/STN PF No 04, out of 23 CGDB, 03 nos board (21, 22, 23) not working due to control card faulty.', status: 'FAULTY', lastEditedBy: null, lastEditedAt: null, auditTrail: [] },
    ]
  },
  { id: 'c14', srNo: 14, name: 'CABLE FAILURE 06Qd/OFC', failureDateTime: null, restorationDateTime: null, durationMinutes: null, faultySection: '', remarks: '', status: 'OK', lastEditedBy: null, lastEditedAt: null, auditTrail: [] },
  { id: 'c15', srNo: 15, name: 'Wi-Fi (82 Stns.)', failureDateTime: null, restorationDateTime: null, durationMinutes: null, faultySection: '', remarks: 'Out of 82 Wi-Fi, 17 locations Wi-Fi not working- 1) GRBA not working from 14/06/24 due to ONT faulty 2) BUA/STN not working from 20/08/24 due to ONT faulty...', status: 'FAULTY', lastEditedBy: null, lastEditedAt: null, auditTrail: [] },
  { id: 'c16', srNo: 16, name: 'Google Wi-Fi/Total -3 (BSP, CPH, RIG)', failureDateTime: null, restorationDateTime: null, durationMinutes: null, faultySection: '', remarks: '', status: 'OK', lastEditedBy: null, lastEditedAt: null, auditTrail: [] },
  { id: 'c17', srNo: 17, name: 'TATA Trust (78)', failureDateTime: null, restorationDateTime: null, durationMinutes: null, faultySection: '', remarks: '', status: 'OK', lastEditedBy: null, lastEditedAt: null, auditTrail: [] },
  { id: 'c18', srNo: 18, name: 'UTS-81', failureDateTime: null, restorationDateTime: null, durationMinutes: null, faultySection: '', remarks: '', status: 'OK', lastEditedBy: null, lastEditedAt: null, auditTrail: [] },
  { id: 'c19', srNo: 19, name: 'PRS: RH-46,NRH-08=54, UTS CUM PRS-43', failureDateTime: null, restorationDateTime: null, durationMinutes: null, faultySection: '', remarks: '', status: 'OK', lastEditedBy: null, lastEditedAt: null, auditTrail: [] },
];

export const initialNetworkSpeed: NetworkSpeedEntry = {
  id: 'ns1',
  testingTime: '08:46',
  dnLinkSpeed: 94.81,
  upLinkSpeed: 94.75,
  googleYahooStatus: 'FAST',
  secrIndianRailwayStatus: 'FAST',
  indianRailGovStatus: 'FAST',
  remarks: '',
  lastEditedBy: null,
  lastEditedAt: null,
  auditTrail: [],
};

export const initialDSLAMStatus: DSLAMStatus = {
  railnetBandwidth: 697.67,
  ipdslamHQ: 185.45,
  ipdslamBSP: 124.13,
  lastEditedBy: null,
  lastEditedAt: null,
  auditTrail: [],
};

export const initialDefectiveSets: DefectiveSetsEntry = {
  id: 'ds1',
  openingBalance: 0,
  receivedFromUser: 0,
  closingBalance: 0,
  givenForRepair: 0,
  repairedSetsReceived: 0,
  setsForCondemnation: 0,
  setsCondemned: 0,
  condemnedThisYear: 0,
  remarks: '',
  lastEditedBy: null,
  lastEditedAt: null,
  auditTrail: [],
};
