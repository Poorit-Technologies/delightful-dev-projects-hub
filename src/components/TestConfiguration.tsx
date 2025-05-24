
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { TestConfig } from './TestConfigurationApp';

interface TestConfigurationProps {
  config: TestConfig;
  onConfigChange: (updates: Partial<TestConfig>) => void;
}

const TestConfiguration = ({ config, onConfigChange }: TestConfigurationProps) => {
  const handleInputChange = (field: keyof TestConfig, value: number | boolean) => {
    onConfigChange({ [field]: value });
  };

  const handlePercentageChange = (difficulty: 'easy' | 'medium' | 'hard', percentage: number) => {
    const totalQuestions = config.totalQuestions;
    const newCount = Math.round((percentage / 100) * totalQuestions);
    
    if (difficulty === 'easy') {
      onConfigChange({ easyQuestions: newCount });
    } else if (difficulty === 'medium') {
      onConfigChange({ mediumQuestions: newCount });
    } else if (difficulty === 'hard') {
      onConfigChange({ hardQuestions: newCount });
    }
  };

  const calculatePercentage = (count: number) => {
    return config.totalQuestions > 0 ? Math.round((count / config.totalQuestions) * 100) : 0;
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">Test Configuration</h2>
      <p className="text-sm text-gray-600 mb-6">
        Configure your test parameters and question distribution with intelligent distribution
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Total Questions */}
        <div className="space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <Label htmlFor="totalQuestions" className="text-sm font-medium">Total Questions</Label>
          <Input
            id="totalQuestions"
            type="number"
            value={config.totalQuestions}
            onChange={(e) => handleInputChange('totalQuestions', parseInt(e.target.value) || 0)}
            className="text-center font-semibold text-lg h-16"
          />
        </div>

        {/* Easy Questions */}
        <div className="space-y-2 bg-green-200 p-4 rounded-lg text-gray-800">
          <Label className="text-sm font-medium text-gray-800">Easy Questions</Label>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-800 mb-3">{config.easyQuestions}</div>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm">%</span>
                <span className="text-sm">Percentage</span>
              </div>
              <Input
                type="number"
                value={calculatePercentage(config.easyQuestions)}
                onChange={(e) => handlePercentageChange('easy', parseInt(e.target.value) || 0)}
                className="text-center bg-white text-gray-800"
              />
            </div>
            <div className="space-y-2 mt-3">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm">📊</span>
                <span className="text-sm">Marks</span>
              </div>
              <Input
                type="number"
                value={config.easyMarks}
                onChange={(e) => handleInputChange('easyMarks', parseInt(e.target.value) || 0)}
                className="text-center bg-white text-gray-800"
              />
            </div>
            <Input
              type="number"
              placeholder="Time (seconds)"
              value={config.easyTime}
              onChange={(e) => handleInputChange('easyTime', parseInt(e.target.value) || 0)}
              className="mt-3 text-center bg-white text-gray-800"
            />
          </div>
        </div>

        {/* Medium Questions */}
        <div className="space-y-2 bg-orange-200 p-4 rounded-lg text-gray-800">
          <Label className="text-sm font-medium text-gray-800">Medium Questions</Label>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-800 mb-3">{config.mediumQuestions}</div>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm">%</span>
                <span className="text-sm">Percentage</span>
              </div>
              <Input
                type="number"
                value={calculatePercentage(config.mediumQuestions)}
                onChange={(e) => handlePercentageChange('medium', parseInt(e.target.value) || 0)}
                className="text-center bg-white text-gray-800"
              />
            </div>
            <div className="space-y-2 mt-3">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm">📊</span>
                <span className="text-sm">Marks</span>
              </div>
              <Input
                type="number"
                value={config.mediumMarks}
                onChange={(e) => handleInputChange('mediumMarks', parseInt(e.target.value) || 0)}
                className="text-center bg-white text-gray-800"
              />
            </div>
            <Input
              type="number"
              placeholder="Time (seconds)"
              value={config.mediumTime}
              onChange={(e) => handleInputChange('mediumTime', parseInt(e.target.value) || 0)}
              className="mt-3 text-center bg-white text-gray-800"
            />
          </div>
        </div>

        {/* Hard Questions */}
        <div className="space-y-2 bg-red-200 p-4 rounded-lg text-gray-800">
          <Label className="text-sm font-medium text-gray-800">Hard Questions</Label>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-800 mb-3">{config.hardQuestions}</div>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm">%</span>
                <span className="text-sm">Percentage</span>
              </div>
              <Input
                type="number"
                value={calculatePercentage(config.hardQuestions)}
                onChange={(e) => handlePercentageChange('hard', parseInt(e.target.value) || 0)}
                className="text-center bg-white text-gray-800"
              />
            </div>
            <div className="space-y-2 mt-3">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm">📊</span>
                <span className="text-sm">Marks</span>
              </div>
              <Input
                type="number"
                value={config.hardMarks}
                onChange={(e) => handleInputChange('hardMarks', parseInt(e.target.value) || 0)}
                className="text-center bg-white text-gray-800"
              />
            </div>
            <Input
              type="number"
              placeholder="Time (seconds)"
              value={config.hardTime}
              onChange={(e) => handleInputChange('hardTime', parseInt(e.target.value) || 0)}
              className="mt-3 text-center bg-white text-gray-800"
            />
          </div>
        </div>
      </div>

      {/* Smart Distribution */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="smartDistribution"
            checked={config.smartDistribution}
            onCheckedChange={(checked) => handleInputChange('smartDistribution', !!checked)}
          />
          <Label htmlFor="smartDistribution" className="text-sm font-medium">
            💡 Smart Distribution
          </Label>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Questions are automatically distributed across selected subcategories based on optimal learning algorithms and difficulty balancing.
        </p>
      </div>
    </Card>
  );
};

export default TestConfiguration;
