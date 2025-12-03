import { useApp } from '@/context/AppContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User } from 'lucide-react';

const UserSelector = () => {
  const { currentUser, setCurrentUser, users } = useApp();

  return (
    <div className="flex items-center gap-2">
      <User className="h-4 w-4 text-primary-foreground/70" />
      <Select
        value={currentUser?.id ?? ''}
        onValueChange={(value) => {
          const user = users.find(u => u.id === value);
          setCurrentUser(user ?? null);
        }}
      >
        <SelectTrigger className="w-[180px] bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground text-sm h-9">
          <SelectValue placeholder="Select Officer" />
        </SelectTrigger>
        <SelectContent className="bg-card">
          {users.map(user => (
            <SelectItem key={user.id} value={user.id}>
              <div className="flex flex-col">
                <span className="font-medium">{user.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default UserSelector;
