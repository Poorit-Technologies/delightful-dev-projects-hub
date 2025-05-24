
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

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">Test Configuration</h2>
      <p className="text-sm text-gray-600 mb-6">
        Configure your test parameters and question distribution with intelligent distribution
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Total Questions */}
        <div className="space-y-2">
          <Label htmlFor="totalQuestions" className="text-sm font-medium">Total Questions</Label>
          <Input
            id="totalQuestions"
            type="number"
            value={config.totalQuestions}
            onChange={(e) => handleInputChange('totalQuestions', parseInt(e.target.value) || 0)}
            className="text-center font-semibold"
          />
        </div>

        {/* Easy Questions */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-green-600">Easy Questions (40%)</Label>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">{config.easyQuestions}</div>
            <Input
              type="number"
              placeholder="Time (seconds)"
              value={config.easyTime}
              onChange={(e) => handleInputChange('easyTime', parseInt(e.target.value) || 0)}
              className="mb-2"
            />
            <div className="flex items-center space-x-2">
              <span className="text-sm">📊</span>
              <span className="text-sm">Marks for Easy Questions</span>
            </div>
            <Input
              type="number"
              value={config.easyMarks}
              onChange={(e) => handleInputChange('easyMarks', parseInt(e.target.value) || 0)}
              className="mt-2"
            />
          </div>
        </div>

        {/* Medium Questions */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-orange-600">Medium Questions (40%)</Label>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-2">{config.mediumQuestions}</div>
            <Input
              type="number"
              placeholder="Time (seconds)"
              value={config.mediumTime}
              onChange={(e) => handleInputChange('mediumTime', parseInt(e.target.value) || 0)}
              className="mb-2"
            />
            <div className="flex items-center space-x-2">
              <span className="text-sm">📊</span>
              <span className="text-sm">Marks for Medium Questions</span>
            </div>
            <Input
              type="number"
              value={config.mediumMarks}
              onChange={(e) => handleInputChange('mediumMarks', parseInt(e.target.value) || 0)}
              className="mt-2"
            />
          </div>
        </div>

        {/* Hard Questions */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-red-600">Hard Questions (20%)</Label>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600 mb-2">{config.hardQuestions}</div>
            <Input
              type="number"
              placeholder="Time (seconds)"
              value={config.hardTime}
              onChange={(e) => handleInputChange('hardTime', parseInt(e.target.value) || 0)}
              className="mb-2"
            />
            <div className="flex items-center space-x-2">
              <span className="text-sm">📊</span>
              <span className="text-sm">Marks for Hard Questions</span>
            </div>
            <Input
              type="number"
              value={config.hardMarks}
              onChange={(e) => handleInputChange('hardMarks', parseInt(e.target.value) || 0)}
              className="mt-2"
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
