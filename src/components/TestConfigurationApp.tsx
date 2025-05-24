
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
    <div className="min-h-screen bg-gray-50">
      <TestHeader />
      
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <TestConfiguration 
          config={testConfig} 
          onConfigChange={updateTestConfig} 
        />
        
        <CategorySelector 
          categories={categories} 
          onCategoriesChange={updateCategories}
          config={testConfig}
        />
        
        <ActionButtons />
        
        <ConfigurationSummary config={testConfig} />
      </div>
    </div>
  );
};

export default TestConfigurationApp;
