
import { useState } from 'react';
import TestHeader from './TestHeader';
import TestConfiguration from './TestConfiguration';
import CategorySelector from './CategorySelector';
import ActionButtons from './ActionButtons';
import ConfigurationSummary from './ConfigurationSummary';

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

const TestConfigurationApp = () => {
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

  const updateTestConfig = (updates: Partial<TestConfig>) => {
    setTestConfig(prev => ({ ...prev, ...updates }));
  };

  const updateCategories = (updatedCategories: Category[]) => {
    setCategories(updatedCategories);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
      </div>

      <TestHeader />
      
      <div className="relative max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="animate-fade-in">
          <TestConfiguration 
            config={testConfig} 
            onConfigChange={updateTestConfig} 
          />
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <CategorySelector 
            categories={categories} 
            onCategoriesChange={updateCategories}
            config={testConfig}
          />
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <ConfigurationSummary config={testConfig} />
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <ActionButtons />
        </div>
      </div>
    </div>
  );
};

export default TestConfigurationApp;
