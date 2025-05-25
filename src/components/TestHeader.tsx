
import { Card } from '@/components/ui/card';
import { Settings, Edit3 } from 'lucide-react';

interface TestHeaderProps {
  editMode?: boolean;
}

const TestHeader = ({ editMode = false }: TestHeaderProps) => {
  return (
    <div className="relative max-w-7xl mx-auto px-4 py-8">
      <Card className="p-8 backdrop-blur-sm bg-white/80 border border-white/40 shadow-xl">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full">
              {editMode ? (
                <Edit3 className="h-8 w-8 text-blue-600" />
              ) : (
                <Settings className="h-8 w-8 text-blue-600" />
              )}
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {editMode ? 'Edit Test Configuration' : 'Test Configuration Wizard'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {editMode 
              ? 'Modify your test configuration settings, categories, and parameters to meet your updated requirements.'
              : 'Configure your test parameters, select categories, and customize your assessment to create the perfect evaluation tool.'
            }
          </p>
        </div>
      </Card>
    </div>
  );
};

export default TestHeader;
