
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import TestHeader from './TestHeader';
import TestConfiguration from './TestConfiguration';
import CategorySelector from './CategorySelector';
import TestAssignment from './TestAssignment';
import ActionButtons from './ActionButtons';
import ConfigurationSummary from './ConfigurationSummary';
import UserProfile from './UserProfile';
import { useTestDefinitions } from '@/hooks/useTestDefinitions';
import { useToast } from '@/hooks/use-toast';

export interface TestConfig {
  totalQuestions: number;
  easyQuestions: number;
  mediumQuestions: number;
  hardQuestions: number;
  easyTime: number;
  mediumTime: number;
  hardTime: number;
  easyMarks: number;
  mediumMarks: number;
  hardMarks: number;
  smartDistribution: boolean;
}

export interface Subcategory {
  id: string;
  name: string;
  easy: number;
  medium: number;
  hard: number;
}

export interface Category {
  id: string;
  name: string;
  totalQuestions: number;
  expanded: boolean;
  selected?: boolean;
  subcategories: Subcategory[];
}

interface TestConfigurationAppProps {
  editMode?: boolean;
  configurationId?: string;
}

const TestConfigurationApp = ({ editMode = false, configurationId }: TestConfigurationAppProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { testDefinitions } = useTestDefinitions();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(editMode);
  
  const [testConfig, setTestConfig] = useState<TestConfig>({
    totalQuestions: 100,
    easyQuestions: 50,
    mediumQuestions: 30,
    hardQuestions: 20,
    easyTime: 40,
    mediumTime: 60,
    hardTime: 90,
    easyMarks: 1,
    mediumMarks: 2,
    hardMarks: 3,
    smartDistribution: false,
  });

  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Soft Skills',
      totalQuestions: 15,
      expanded: false,
      selected: false,
      subcategories: [
        { id: '1-1', name: 'Communication Skills', easy: 0, medium: 0, hard: 0 },
        { id: '1-2', name: 'Leadership', easy: 0, medium: 0, hard: 0 },
        { id: '1-3', name: 'Time Management', easy: 0, medium: 0, hard: 0 },
        { id: '1-4', name: 'Emotional Intelligence', easy: 0, medium: 0, hard: 0 },
      ],
    },
    {
      id: '2',
      name: 'Adaptability',
      totalQuestions: 4,
      expanded: false,
      selected: false,
      subcategories: [],
    },
    {
      id: '3',
      name: 'Teamwork',
      totalQuestions: 5,
      expanded: false,
      selected: false,
      subcategories: [],
    },
    {
      id: '4',
      name: 'Problem Solving',
      totalQuestions: 3,
      expanded: false,
      selected: false,
      subcategories: [],
    },
    {
      id: '5',
      name: 'Leadership',
      totalQuestions: 4,
      expanded: false,
      selected: false,
      subcategories: [],
    },
  ]);

  // Load configuration data when in edit mode
  useEffect(() => {
    if (editMode && configurationId && testDefinitions.length > 0) {
      const existingConfig = testDefinitions.find(config => config.id === configurationId);
      if (existingConfig) {
        setTestConfig(existingConfig.test_config);
        setCategories(existingConfig.categories);
        setIsLoading(false);
      } else {
        toast({
          title: "Configuration not found",
          description: "The requested configuration could not be loaded.",
          variant: "destructive",
        });
        navigate('/my-configurations');
      }
    } else if (editMode && configurationId) {
      // Wait for testDefinitions to load
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [editMode, configurationId, testDefinitions, navigate, toast]);

  const updateTestConfig = (updates: Partial<TestConfig>) => {
    setTestConfig(prev => ({ ...prev, ...updates }));
  };

  const updateCategories = (updatedCategories: Category[]) => {
    setCategories(updatedCategories);
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <TestConfiguration 
            config={testConfig} 
            onConfigChange={updateTestConfig} 
          />
        );
      case 2:
        return (
          <CategorySelector 
            categories={categories} 
            onCategoriesChange={updateCategories}
            config={testConfig}
          />
        );
      case 3:
        return (
          <TestAssignment 
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <div className="space-y-8">
            <ConfigurationSummary config={testConfig} />
            <ActionButtons 
              testConfig={testConfig} 
              categories={categories}
              editMode={editMode}
              configurationId={configurationId}
            />
          </div>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header with user profile */}
      <div className="relative z-10 flex justify-between items-center p-4">
        <div></div>
        <UserProfile />
      </div>

      <TestHeader editMode={editMode} />
      
      {/* Step Indicator */}
      <div className="relative max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-center space-x-8">
          {[
            { step: 1, label: 'Configuration' },
            { step: 2, label: 'Categories' },
            { step: 3, label: 'Assignment' },
            { step: 4, label: 'Review' }
          ].map(({ step, label }) => (
            <div key={step} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-semibold ${
                currentStep >= step 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'bg-white border-slate-300 text-slate-400'
              }`}>
                {step}
              </div>
              <span className={`ml-2 text-sm font-medium ${
                currentStep >= step ? 'text-blue-600' : 'text-slate-400'
              }`}>
                {label}
              </span>
              {step < 4 && (
                <div className={`w-12 h-0.5 ml-4 ${
                  currentStep > step ? 'bg-blue-600' : 'bg-slate-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-8">
        <div className="animate-fade-in">
          {renderCurrentStep()}
        </div>
        
        {currentStep < 3 && (
          <div className="flex justify-center mt-8">
            <div className="flex space-x-4">
              {currentStep > 1 && (
                <Button 
                  onClick={handlePrevious}
                  variant="outline"
                  className="px-6"
                >
                  Previous
                </Button>
              )}
              <Button 
                onClick={handleNext}
                className="px-6 bg-blue-600 hover:bg-blue-700"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestConfigurationApp;
