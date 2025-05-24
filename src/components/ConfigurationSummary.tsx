
import { Card } from '@/components/ui/card';
import { TestConfig } from './TestConfigurationApp';

interface ConfigurationSummaryProps {
  config: TestConfig;
}

const ConfigurationSummary = ({ config }: ConfigurationSummaryProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">📊 Current Configuration Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
        <div>
          <div className="text-3xl font-bold text-gray-800 mb-2">{config.totalQuestions}</div>
          <div className="text-sm text-gray-600">Total Questions</div>
        </div>
        
        <div>
          <div className="text-3xl font-bold text-green-600 mb-2">{config.easyQuestions}</div>
          <div className="text-sm text-gray-600 mb-3">Easy Questions</div>
          <div className="bg-green-50 p-2 rounded border">
            <div className="text-lg font-semibold text-green-700">{config.easyTime}s</div>
            <div className="text-xs text-green-600">Time per question</div>
          </div>
          <div className="bg-green-50 p-2 rounded border mt-2">
            <div className="text-lg font-semibold text-green-700">{config.easyMarks}</div>
            <div className="text-xs text-green-600">Marks per question</div>
          </div>
        </div>
        
        <div>
          <div className="text-3xl font-bold text-orange-600 mb-2">{config.mediumQuestions}</div>
          <div className="text-sm text-gray-600 mb-3">Medium Questions</div>
          <div className="bg-orange-50 p-2 rounded border">
            <div className="text-lg font-semibold text-orange-700">{config.mediumTime}s</div>
            <div className="text-xs text-orange-600">Time per question</div>
          </div>
          <div className="bg-orange-50 p-2 rounded border mt-2">
            <div className="text-lg font-semibold text-orange-700">{config.mediumMarks}</div>
            <div className="text-xs text-orange-600">Marks per question</div>
          </div>
        </div>
        
        <div>
          <div className="text-3xl font-bold text-red-600 mb-2">{config.hardQuestions}</div>
          <div className="text-sm text-gray-600 mb-3">Hard Questions</div>
          <div className="bg-red-50 p-2 rounded border">
            <div className="text-lg font-semibold text-red-700">{config.hardTime}s</div>
            <div className="text-xs text-red-600">Time per question</div>
          </div>
          <div className="bg-red-50 p-2 rounded border mt-2">
            <div className="text-lg font-semibold text-red-700">{config.hardMarks}</div>
            <div className="text-xs text-red-600">Marks per question</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ConfigurationSummary;
