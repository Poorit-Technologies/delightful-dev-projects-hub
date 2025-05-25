import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTestDefinitions, TestDefinition } from '@/hooks/useTestDefinitions';
import { Edit, Trash2, Copy, Calendar, Clock, FileText, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';

interface ConfigurationCardProps {
  configuration: TestDefinition;
}

const ConfigurationCard = ({ configuration }: ConfigurationCardProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { deleteTestDefinition, userProfile } = useTestDefinitions();
  const { toast } = useToast();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDuplicate = async () => {
    // For now, navigate to create with pre-filled data
    // This could be enhanced to use a duplicate function in the hook
    toast({
      title: "Feature Coming Soon",
      description: "Duplicate functionality will be available soon",
    });
  };

  const handleDelete = async () => {
    const success = await deleteTestDefinition(configuration.id);
    if (success) {
      setShowDeleteDialog(false);
    }
  };

  const selectedCategories = configuration.categories.filter(cat => cat.selected).length;
  const totalQuestions = configuration.test_config.totalQuestions;

  // Check if user can edit/delete this configuration
  const canModifyConfiguration = userProfile?.role === 'admin' || userProfile?.role === 'super_admin';

  return (
    <TooltipProvider>
      <Card className="bg-white/80 backdrop-blur-sm border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-700 transition-colors">
                {configuration.name}
              </CardTitle>
              {configuration.description && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {configuration.description}
                </p>
              )}
            </div>
            {!canModifyConfiguration && (
              <Tooltip>
                <TooltipTrigger>
                  <Shield className="h-4 w-4 text-amber-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Read-only access</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600 mx-auto mb-1" />
              <div className="text-lg font-semibold text-blue-900">{totalQuestions}</div>
              <div className="text-xs text-blue-600">Questions</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-semibold text-green-900">{selectedCategories}</div>
              <div className="text-xs text-green-600">Categories</div>
            </div>
          </div>

          {/* Difficulty Distribution */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">Difficulty Distribution</div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                  Easy: {configuration.test_config.easyQuestions}
                </Badge>
              </div>
              <div className="text-center">
                <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-xs">
                  Med: {configuration.test_config.mediumQuestions}
                </Badge>
              </div>
              <div className="text-center">
                <Badge variant="secondary" className="bg-red-100 text-red-800 text-xs">
                  Hard: {configuration.test_config.hardQuestions}
                </Badge>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              Created {formatDate(configuration.created_at)}
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Updated {formatDate(configuration.updated_at)}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2 pt-2">
            {canModifyConfiguration ? (
              <>
                <Link to={`/test/edit/${configuration.id}`} className="flex-1">
                  <Button variant="default" size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleDuplicate}>
                  <Copy className="h-3 w-3" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowDeleteDialog(true)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </>
            ) : (
              <div className="flex-1">
                <Button variant="outline" size="sm" className="w-full" disabled>
                  <Shield className="h-3 w-3 mr-1" />
                  View Only
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {canModifyConfiguration && (
        <DeleteConfirmationDialog
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          onConfirm={handleDelete}
          configurationName={configuration.name}
        />
      )}
    </TooltipProvider>
  );
};

export default ConfigurationCard;
