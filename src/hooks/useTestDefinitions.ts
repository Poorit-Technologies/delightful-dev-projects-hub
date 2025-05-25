
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { TestConfig, Category } from '@/components/TestConfigurationApp';

export interface TestDefinition {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  test_config: TestConfig;
  categories: Category[];
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export const useTestDefinitions = () => {
  const [testDefinitions, setTestDefinitions] = useState<TestDefinition[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchTestDefinitions = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('test_definitions')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setTestDefinitions(data || []);
    } catch (error) {
      console.error('Error fetching test definitions:', error);
      toast({
        title: "Error",
        description: "Failed to load test configurations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveTestDefinition = async (
    name: string,
    description: string,
    testConfig: TestConfig,
    categories: Category[]
  ): Promise<TestDefinition | null> => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('test_definitions')
        .insert({
          user_id: user.id,
          name,
          description,
          test_config: testConfig,
          categories,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Test configuration saved successfully",
      });

      await fetchTestDefinitions();
      return data;
    } catch (error) {
      console.error('Error saving test definition:', error);
      toast({
        title: "Error",
        description: "Failed to save test configuration",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateTestDefinition = async (
    id: string,
    name: string,
    description: string,
    testConfig: TestConfig,
    categories: Category[]
  ): Promise<boolean> => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('test_definitions')
        .update({
          name,
          description,
          test_config: testConfig,
          categories,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Test configuration updated successfully",
      });

      await fetchTestDefinitions();
      return true;
    } catch (error) {
      console.error('Error updating test definition:', error);
      toast({
        title: "Error",
        description: "Failed to update test configuration",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteTestDefinition = async (id: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('test_definitions')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Test configuration deleted successfully",
      });

      await fetchTestDefinitions();
      return true;
    } catch (error) {
      console.error('Error deleting test definition:', error);
      toast({
        title: "Error",
        description: "Failed to delete test configuration",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    if (user) {
      fetchTestDefinitions();
    }
  }, [user]);

  return {
    testDefinitions,
    loading,
    saveTestDefinition,
    updateTestDefinition,
    deleteTestDefinition,
    refetch: fetchTestDefinitions,
  };
};
