import DigitalClock from './DigitalClock';
import UserSelector from './UserSelector';
import RecentChangesSheet from './RecentChangesSheet';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Pencil, Eye, Printer } from 'lucide-react';

interface HeaderProps {
  onPrint: () => void;
}

const Header = ({ onPrint }: HeaderProps) => {
  const { isEditMode, setIsEditMode } = useApp();

  return (
    <header className="bg-railway-header text-primary-foreground px-4 py-3 shadow-railway-lg no-print">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left - Clock */}
          <div className="flex-shrink-0">
            <DigitalClock />
          </div>

          {/* Center - Title */}
          <div className="text-center flex-1">
            <h1 className="text-lg md:text-xl font-bold tracking-wide">
              PCSTE/SECR POSITION
            </h1>
            <p className="text-sm text-primary-foreground/80">
              BILASPUR DIVISION
            </p>
          </div>

          {/* Right - Controls */}
          <div className="flex items-center gap-3">
            <UserSelector />
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditMode(!isEditMode)}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
            >
              {isEditMode ? (
                <>
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </>
              ) : (
                <>
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </>
              )}
            </Button>

            <RecentChangesSheet />

            <Button
              variant="outline"
              size="sm"
              onClick={onPrint}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
            >
              <Printer className="h-4 w-4 mr-1" />
              Print
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
