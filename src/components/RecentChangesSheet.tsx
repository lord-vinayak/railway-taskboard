import { formatDistanceToNow } from 'date-fns';
import { History, User, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const RecentChangesSheet = () => {
  const { recentChanges } = useApp();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
        >
          <History className="h-4 w-4 mr-1" />
          History
          {recentChanges.length > 0 && (
            <span className="ml-1.5 bg-primary-foreground/20 text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
              {recentChanges.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Recent Activity
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-100px)] mt-4 pr-4">
          {recentChanges.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <History className="h-12 w-12 mb-4 opacity-50" />
              <p className="text-sm">No changes recorded yet</p>
              <p className="text-xs mt-1">Changes will appear here when you edit data</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentChanges.map((entry, index) => (
                <div
                  key={`${entry.timestamp.toString()}-${index}`}
                  className="border border-border rounded-lg p-3 bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium text-foreground truncate">
                          {entry.userName}
                        </p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDistanceToNow(new Date(entry.timestamp), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Modified <span className="font-medium text-foreground">{entry.fieldName}</span>
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs">
                        <span className="px-2 py-1 rounded bg-destructive/10 text-destructive font-mono truncate max-w-[140px]" title={entry.oldValue}>
                          {entry.oldValue || '(empty)'}
                        </span>
                        <ArrowRight className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                        <span className="px-2 py-1 rounded bg-status-ok/10 text-status-ok font-mono truncate max-w-[140px]" title={entry.newValue}>
                          {entry.newValue || '(empty)'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default RecentChangesSheet;
