
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
          <div className="text-sm text-gray-600">Easy Questions</div>
        </div>
        
        <div>
          <div className="text-3xl font-bold text-orange-600 mb-2">{config.mediumQuestions}</div>
          <div className="text-sm text-gray-600">Medium Questions</div>
        </div>
        
        <div>
          <div className="text-3xl font-bold text-red-600 mb-2">{config.hardQuestions}</div>
          <div className="text-sm text-gray-600">Hard Questions</div>
        </div>
      </div>
    </Card>
  );
};

export default ConfigurationSummary;
