import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CircuitRow, NetworkSpeedEntry, DSLAMStatus, DefectiveSetsEntry, User, AuditEntry } from '@/types';
import { initialCircuits, initialNetworkSpeed, initialDSLAMStatus, initialDefectiveSets, users } from '@/data/initialData';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  users: User[];
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
  positionDate: Date;
  setPositionDate: (date: Date) => void;
  circuits: CircuitRow[];
  updateCircuit: (id: string, field: keyof CircuitRow, value: unknown) => void;
  networkSpeed: NetworkSpeedEntry;
  updateNetworkSpeed: (field: keyof NetworkSpeedEntry, value: unknown) => void;
  dslamStatus: DSLAMStatus;
  updateDSLAMStatus: (field: keyof DSLAMStatus, value: number) => void;
  defectiveSets: DefectiveSetsEntry;
  updateDefectiveSets: (field: keyof DefectiveSetsEntry, value: unknown) => void;
  recentChanges: AuditEntry[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(users[0]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [positionDate, setPositionDate] = useState(new Date());
  const [circuits, setCircuits] = useState<CircuitRow[]>(initialCircuits);
  const [networkSpeed, setNetworkSpeed] = useState<NetworkSpeedEntry>(initialNetworkSpeed);
  const [dslamStatus, setDSLAMStatus] = useState<DSLAMStatus>(initialDSLAMStatus);
  const [defectiveSets, setDefectiveSets] = useState<DefectiveSetsEntry>(initialDefectiveSets);
  const [recentChanges, setRecentChanges] = useState<AuditEntry[]>([]);

  const addToRecentChanges = useCallback((entry: AuditEntry) => {
    setRecentChanges(prev => [entry, ...prev].slice(0, 100)); // Keep last 100 entries
  }, []);

  const updateCircuit = useCallback((id: string, field: keyof CircuitRow, value: unknown) => {
    setCircuits(prev => {
      const updateRow = (rows: CircuitRow[]): CircuitRow[] => {
        return rows.map(row => {
          if (row.id === id) {
            const oldValue = String(row[field] ?? '');
            const newValue = String(value ?? '');
            
            const auditEntry: AuditEntry = {
              userId: currentUser?.id ?? 'unknown',
              userName: currentUser?.name ?? 'Unknown User',
              timestamp: new Date(),
              fieldName: `Circuit "${row.name}" - ${field}`,
              oldValue,
              newValue,
            };

            addToRecentChanges(auditEntry);

            return {
              ...row,
              [field]: value,
              lastEditedBy: currentUser?.name ?? null,
              lastEditedAt: new Date(),
              auditTrail: [...row.auditTrail, auditEntry],
            };
          }
          if (row.subRows) {
            return { ...row, subRows: updateRow(row.subRows) };
          }
          return row;
        });
      };
      return updateRow(prev);
    });
  }, [currentUser, addToRecentChanges]);

  const updateNetworkSpeed = useCallback((field: keyof NetworkSpeedEntry, value: unknown) => {
    setNetworkSpeed(prev => {
      const oldValue = String(prev[field] ?? '');
      const newValue = String(value ?? '');

      const auditEntry: AuditEntry = {
        userId: currentUser?.id ?? 'unknown',
        userName: currentUser?.name ?? 'Unknown User',
        timestamp: new Date(),
        fieldName: `Network Speed - ${field}`,
        oldValue,
        newValue,
      };

      addToRecentChanges(auditEntry);

      return {
        ...prev,
        [field]: value,
        lastEditedBy: currentUser?.name ?? null,
        lastEditedAt: new Date(),
        auditTrail: [...prev.auditTrail, auditEntry],
      };
    });
  }, [currentUser, addToRecentChanges]);

  const updateDSLAMStatus = useCallback((field: keyof DSLAMStatus, value: number) => {
    setDSLAMStatus(prev => {
      const oldValue = String(prev[field] ?? '');
      const newValue = String(value ?? '');

      const auditEntry: AuditEntry = {
        userId: currentUser?.id ?? 'unknown',
        userName: currentUser?.name ?? 'Unknown User',
        timestamp: new Date(),
        fieldName: `DSLAM Status - ${field}`,
        oldValue,
        newValue,
      };

      addToRecentChanges(auditEntry);

      return {
        ...prev,
        [field]: value,
        lastEditedBy: currentUser?.name ?? null,
        lastEditedAt: new Date(),
        auditTrail: [...prev.auditTrail, auditEntry],
      };
    });
  }, [currentUser, addToRecentChanges]);

  const updateDefectiveSets = useCallback((field: keyof DefectiveSetsEntry, value: unknown) => {
    setDefectiveSets(prev => {
      const oldValue = String(prev[field] ?? '');
      const newValue = String(value ?? '');

      const auditEntry: AuditEntry = {
        userId: currentUser?.id ?? 'unknown',
        userName: currentUser?.name ?? 'Unknown User',
        timestamp: new Date(),
        fieldName: `Defective Sets - ${field}`,
        oldValue,
        newValue,
      };

      addToRecentChanges(auditEntry);

      return {
        ...prev,
        [field]: value,
        lastEditedBy: currentUser?.name ?? null,
        lastEditedAt: new Date(),
        auditTrail: [...prev.auditTrail, auditEntry],
      };
    });
  }, [currentUser, addToRecentChanges]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        users,
        isEditMode,
        setIsEditMode,
        positionDate,
        setPositionDate,
        circuits,
        updateCircuit,
        networkSpeed,
        updateNetworkSpeed,
        dslamStatus,
        updateDSLAMStatus,
        defectiveSets,
        updateDefectiveSets,
        recentChanges,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
