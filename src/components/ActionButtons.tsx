
import { Button } from '@/components/ui/button';
import { Save, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ActionButtons = () => {
  const { toast } = useToast();

  const handleSaveConfiguration = () => {
    toast({
      title: "Configuration Saved",
      description: "Your test configuration has been saved successfully.",
    });
  };

  const handlePreviewTest = () => {
    toast({
      title: "Preview Test",
      description: "Opening test preview...",
    });
  };

  const handleAdvancedSettings = () => {
    toast({
      title: "Advanced Settings",
      description: "Opening advanced configuration options...",
    });
  };

  return (
    <div className="flex justify-center space-x-4">
      <Button 
        onClick={handleSaveConfiguration}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
      >
        <Save className="h-4 w-4 mr-2" />
        Save Configuration
      </Button>
      
      <Button 
        onClick={handlePreviewTest}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
      >
        👁️ Preview Test
      </Button>
      
      <Button 
        onClick={handleAdvancedSettings}
        variant="outline"
        className="px-6 py-2"
      >
        <Settings className="h-4 w-4 mr-2" />
        Advanced Settings
      </Button>
    </div>
  );
};

export default ActionButtons;
