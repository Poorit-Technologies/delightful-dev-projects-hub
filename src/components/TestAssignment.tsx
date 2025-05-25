
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarDays, Clock, Users, Search } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface User {
  id: string;
  name: string;
  email: string;
}

interface TestAssignmentProps {
  onNext?: () => void;
  onPrevious?: () => void;
}

const TestAssignment = ({ onNext, onPrevious }: TestAssignmentProps) => {
  const [isPublic, setIsPublic] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [maxAttempts, setMaxAttempts] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());

  // Mock users data - in real app this would come from an API
  const availableUsers: User[] = [
    { id: '1', name: 'Alice Johnson', email: 'alice@gmail.com' },
    { id: '2', name: 'Bob Smith', email: 'bob@gmail.com' },
    { id: '3', name: 'Charlie Brown', email: 'charlie@gmail.com' },
    { id: '4', name: 'Diana Prince', email: 'diana@gmail.com' },
    { id: '5', name: 'Eve Wilson', email: 'eve@gmail.com' },
    { id: '6', name: 'Frank Miller', email: 'frank@gmail.com' },
  ];

  const filteredUsers = availableUsers.filter(
    user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUserSelection = (userId: string) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  const selectAllUsers = () => {
    setSelectedUsers(new Set(filteredUsers.map(user => user.id)));
  };

  const clearSelection = () => {
    setSelectedUsers(new Set());
  };

  return (
    <div className="space-y-6">
      {/* Test Settings */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <Users className="h-5 w-5 text-blue-600" />
            Test Settings
          </CardTitle>
          <CardDescription>Configure access and timing for your test</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Access Settings */}
          <div className="space-y-4">
            <Label className="text-base font-semibold text-slate-700">Access Settings</Label>
            <p className="text-sm text-slate-600">Control who can access this test</p>
            
            <div className="flex items-center space-x-3">
              <Switch 
                id="make-public" 
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
              <Label htmlFor="make-public" className="text-sm font-medium">
                Make test public
              </Label>
            </div>
            
            {isPublic && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
                <Users className="h-4 w-4 text-blue-600 mt-0.5" />
                <p className="text-sm text-blue-800">
                  This test will only be visible to selected users
                </p>
              </div>
            )}
          </div>

          {/* Date and Time Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label className="text-base font-semibold text-slate-700">Start Date/Time</Label>
              <div className="space-y-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, 'dd/MM/yyyy') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-500" />
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-semibold text-slate-700">End Date/Time</Label>
              <div className="space-y-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, 'dd/MM/yyyy') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-500" />
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Maximum Attempts */}
          <div className="space-y-3">
            <Label htmlFor="max-attempts" className="text-base font-semibold text-slate-700">
              Maximum Attempts
            </Label>
            <Input
              id="max-attempts"
              type="number"
              min="1"
              max="10"
              value={maxAttempts}
              onChange={(e) => setMaxAttempts(parseInt(e.target.value) || 1)}
              className="w-32"
            />
          </div>
        </CardContent>
      </Card>

      {/* Assign Students */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-800">Assign Students</CardTitle>
          <CardDescription>Select students who can take this test</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Default Student Settings */}
          <div className="bg-slate-50 rounded-lg p-4">
            <Label className="text-sm font-medium text-slate-700">Default Student Settings</Label>
            <p className="text-xs text-slate-600 mt-1">
              These settings will be automatically applied to all selected students. You can customize settings for individual students below.
            </p>
          </div>

          {/* User Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Available Students */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold text-slate-700">Available Students</Label>
                <Button variant="outline" size="sm" onClick={selectAllUsers}>
                  Select All
                </Button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search available students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* User List */}
              <div className="border rounded-lg max-h-64 overflow-y-auto">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center space-x-3 p-3 hover:bg-slate-50 border-b last:border-b-0 cursor-pointer"
                    onClick={() => toggleUserSelection(user.id)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedUsers.has(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                      className="rounded border-slate-300"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {user.name}
                      </p>
                      <p className="text-sm text-slate-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  Available: {filteredUsers.length}
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  Selected: {selectedUsers.size}
                </Button>
              </div>
            </div>

            {/* Selected Students */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold text-slate-700">
                  Selected Students ({selectedUsers.size})
                </Label>
                {selectedUsers.size > 0 && (
                  <Button variant="outline" size="sm" onClick={clearSelection}>
                    Clear All
                  </Button>
                )}
              </div>

              <div className="border rounded-lg min-h-64">
                {selectedUsers.size === 0 ? (
                  <div className="flex items-center justify-center h-32 text-slate-500">
                    <div className="text-center">
                      <Users className="h-8 w-8 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">No students selected yet. Select students from the list on the left.</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 space-y-2">
                    {Array.from(selectedUsers).map((userId) => {
                      const user = availableUsers.find(u => u.id === userId);
                      if (!user) return null;
                      return (
                        <div key={userId} className="flex items-center justify-between p-2 bg-blue-50 rounded border">
                          <div>
                            <p className="text-sm font-medium text-slate-900">{user.name}</p>
                            <p className="text-xs text-slate-500">{user.email}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleUserSelection(userId)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Info Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              These settings can be changed after the test is published through the test management dashboard.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button 
          onClick={onPrevious}
          variant="outline"
          className="px-6"
        >
          Previous
        </Button>
        <Button 
          onClick={onNext}
          className="px-6 bg-blue-600 hover:bg-blue-700"
          disabled={selectedUsers.size === 0}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TestAssignment;
