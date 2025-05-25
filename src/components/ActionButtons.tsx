
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Save, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import SaveConfigurationDialog from './SaveConfigurationDialog';
import { TestConfig, Category } from './TestConfigurationApp';

interface ActionButtonsProps {
  testConfig: TestConfig;
  categories: Category[];
  editMode?: boolean;
  configurationId?: string;
}

const ActionButtons = ({ testConfig, categories, editMode = false, configurationId }: ActionButtonsProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const handlePrevious = () => {
    toast({
      title: "Previous Step",
      description: "Going back to the previous step...",
    });
  };

  const handleBackToConfigurations = () => {
    navigate('/my-configurations');
  };

  const handleSaveConfiguration = () => {
    setShowSaveDialog(true);
  };

  return (
    <>
      <div className="flex justify-center space-x-6">
        {editMode ? (
          <Button 
            onClick={handleBackToConfigurations}
            variant="outline"
            className="group relative px-8 py-3 bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 border-2 border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-800 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to Configurations</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Button>
        ) : (
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
        )}
        
        <Button 
          onClick={handleSaveConfiguration}
          className="group relative px-8 py-3 bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0"
        >
          <div className="flex items-center space-x-2">
            <Save className="h-5 w-5" />
            <span>{editMode ? 'Update Configuration' : 'Save Configuration'}</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Button>
      </div>

      <SaveConfigurationDialog
        open={showSaveDialog}
        onOpenChange={setShowSaveDialog}
        testConfig={testConfig}
        categories={categories}
        editMode={editMode}
        configurationId={configurationId}
      />
    </>
  );
};

export default ActionButtons;
