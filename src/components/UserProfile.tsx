
import { useState } from 'react';
import { useTestDefinitions } from '@/hooks/useTestDefinitions';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Building2, Shield, LogOut } from 'lucide-react';

const UserProfile = () => {
  const { userProfile } = useTestDefinitions();
  const { signOut } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (!userProfile) return null;

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'destructive';
      case 'admin':
        return 'default';
      case 'student':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'Super Admin';
      case 'admin':
        return 'Administrator';
      case 'student':
        return 'Student';
      default:
        return role;
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-white/40">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <User className="h-5 w-5" />
          Profile Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Name:</span>
          <span className="font-medium">
            {userProfile.first_name || userProfile.last_name 
              ? `${userProfile.first_name || ''} ${userProfile.last_name || ''}`.trim()
              : 'Not specified'
            }
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Role:
          </span>
          <Badge variant={getRoleBadgeVariant(userProfile.role)}>
            {getRoleLabel(userProfile.role)}
          </Badge>
        </div>

        {userProfile.organization_id && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 flex items-center gap-1">
              <Building2 className="h-3 w-3" />
              Organization:
            </span>
            <span className="text-sm font-medium">Connected</span>
          </div>
        )}

        {userProfile.phone && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Phone:</span>
            <span className="text-sm font-medium">{userProfile.phone}</span>
          </div>
        )}

        <div className="pt-3 border-t border-gray-200">
          <Button 
            onClick={handleLogout}
            disabled={isLoggingOut}
            variant="outline"
            className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
          >
            <LogOut className="h-4 w-4 mr-2" />
            {isLoggingOut ? 'Signing out...' : 'Sign Out'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
