export type CircuitStatus = 'OK' | 'FAULTY' | 'NIL';

export interface AuditEntry {
  userId: string;
  userName: string;
  timestamp: Date;
  fieldName: string;
  oldValue: string;
  newValue: string;
}

export interface AuditFields {
  lastEditedBy: string | null;
  lastEditedAt: Date | null;
  auditTrail: AuditEntry[];
}

export interface CircuitRow extends AuditFields {
  id: string;
  srNo: number;
  name: string;
  subRows?: CircuitRow[];
  failureDateTime: string | null;
  restorationDateTime: string | null;
  durationMinutes: number | null;
  faultySection: string;
  remarks: string;
  status: CircuitStatus;
}

export interface NetworkSpeedEntry extends AuditFields {
  id: string;
  testingTime: string;
  dnLinkSpeed: number;
  upLinkSpeed: number;
  googleYahooStatus: 'FAST' | 'SLOW';
  secrIndianRailwayStatus: 'FAST' | 'SLOW';
  indianRailGovStatus: 'FAST' | 'SLOW';
  remarks: string;
}

export interface DSLAMStatus extends AuditFields {
  railnetBandwidth: number;
  ipdslamHQ: number;
  ipdslamBSP: number;
}

export interface DefectiveSetsEntry extends AuditFields {
  id: string;
  openingBalance: number;
  receivedFromUser: number;
  closingBalance: number;
  givenForRepair: number;
  repairedSetsReceived: number;
  setsForCondemnation: number;
  setsCondemned: number;
  condemnedThisYear: number;
  remarks: string;
}

export interface User {
  id: string;
  name: string;
  role: string;
  designation: string;
}

export interface DailySheetData {
  positionDate: Date;
  circuits: CircuitRow[];
  networkSpeed: NetworkSpeedEntry;
  dslamStatus: DSLAMStatus;
  defectiveSets: DefectiveSetsEntry;
}
