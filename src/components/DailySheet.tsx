import { useApp } from '@/context/AppContext';
import ZoneACircuitTable from './zones/ZoneACircuitTable';
import ZoneBNetworkSpeed from './zones/ZoneBNetworkSpeed';
import ZoneCInventory from './zones/ZoneCInventory';
import MobileCircuitCard from './mobile/MobileCircuitCard';
import { useIsMobile } from '@/hooks/use-mobile';

const DailySheet = () => {
  const { circuits } = useApp();
  const isMobile = useIsMobile();

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-[1800px] mx-auto">
      {/* Zone A - Circuit Status */}
      {isMobile ? (
        <div className="zone-card">
          <div className="zone-header flex items-center justify-between">
            <span>Zone A: Circuit & Equipment Status</span>
            <span className="text-xs font-normal opacity-80">
              {circuits.filter(c => c.status === 'FAULTY').length} faulty
            </span>
          </div>
          <div className="p-3 space-y-2">
            {circuits.map(circuit => (
              <MobileCircuitCard key={circuit.id} circuit={circuit} />
            ))}
          </div>
        </div>
      ) : (
        <ZoneACircuitTable />
      )}

      {/* Zone B - Network Speed */}
      <ZoneBNetworkSpeed />

      {/* Zone C - Inventory */}
      <ZoneCInventory />
    </div>
  );
};

export default DailySheet;
