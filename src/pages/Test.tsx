
import TestConfigurationApp from '@/components/TestConfigurationApp';
import ProtectedRoute from '@/components/ProtectedRoute';

const Test = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <TestConfigurationApp />
      </div>
    </ProtectedRoute>
  );
};

export default Test;
