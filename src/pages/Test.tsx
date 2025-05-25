
import { useParams } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';
import TestConfigurationApp from '@/components/TestConfigurationApp';

const Test = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);

  return (
    <ProtectedRoute>
      <TestConfigurationApp editMode={isEditMode} configurationId={id} />
    </ProtectedRoute>
  );
};

export default Test;
