
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SaveConfigurationDialog from './SaveConfigurationDialog';
import { TestConfig, Category } from './TestConfigurationApp';

interface ActionButtonsProps {
  testConfig: TestConfig;
  categories: Category[];
}

const ActionButtons = ({ testConfig, categories }: ActionButtonsProps) => {
  const { toast } = useToast();
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const handlePrevious = () => {
    toast({
      title: "Previous Step",
      description: "Going back to the previous step...",
    });
  };

  const handleSaveConfiguration = () => {
    setShowSaveDialog(true);
  };

  return (
    <>
      <div className="flex justify-center space-x-6">
        <Button 
          onClick={handlePrevious}
          variant="outline"
          className="group relative px-8 py-3 bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 border-2 border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-800 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <div className="flex items-center space-x-2">
            <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
            <span>Previous</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Button>
        
        <Button 
          onClick={handleSaveConfiguration}
          className="group relative px-8 py-3 bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0"
        >
          <div className="flex items-center space-x-2">
            <Save className="h-5 w-5" />
            <span>Save Configuration</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Button>
      </div>

      <SaveConfigurationDialog
        open={showSaveDialog}
        onOpenChange={setShowSaveDialog}
        testConfig={testConfig}
        categories={categories}
      />
    </>
  );
};

export default ActionButtons;
