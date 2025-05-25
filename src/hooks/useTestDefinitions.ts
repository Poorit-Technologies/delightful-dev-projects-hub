
import { useState, useEffect, useCallback } from 'react';
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
  organization_id?: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  organization_id?: string;
  role: 'super_admin' | 'admin' | 'student';
  first_name?: string;
  last_name?: string;
  phone?: string;
  is_active: boolean;
}

export const useTestDefinitions = () => {
  const [testDefinitions, setTestDefinitions] = useState<TestDefinition[]>([]);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchUserProfile = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }, [user]);

  const fetchTestDefinitions = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('test_definitions')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      
      // Type the data properly with safe casting using unknown
      const typedData = (data || []).map(item => ({
        ...item,
        test_config: item.test_config as unknown as TestConfig,
        categories: item.categories as unknown as Category[],
      }));
      
      setTestDefinitions(typedData);
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
  }, [user, toast]);

  const fetchTestDefinitionById = useCallback(async (id: string): Promise<TestDefinition | null> => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('test_definitions')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      return {
        ...data,
        test_config: data.test_config as unknown as TestConfig,
        categories: data.categories as unknown as Category[],
      };
    } catch (error) {
      console.error('Error fetching test definition:', error);
      toast({
        title: "Error",
        description: "Failed to load test configuration",
        variant: "destructive",
      });
      return null;
    }
  }, [user, toast]);

  const saveTestDefinition = useCallback(async (
    name: string,
    description: string,
    testConfig: TestConfig,
    categories: Category[]
  ): Promise<TestDefinition | null> => {
    if (!user || !userProfile) return null;

    try {
      const { data, error } = await supabase
        .from('test_definitions')
        .insert({
          user_id: user.id,
          name,
          description,
          test_config: testConfig as any,
          categories: categories as any,
          organization_id: userProfile.organization_id,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Test configuration saved successfully",
      });

      await fetchTestDefinitions();
      
      return {
        ...data,
        test_config: data.test_config as unknown as TestConfig,
        categories: data.categories as unknown as Category[],
      };
    } catch (error) {
      console.error('Error saving test definition:', error);
      toast({
        title: "Error",
        description: "Failed to save test configuration",
        variant: "destructive",
      });
      return null;
    }
  }, [user, userProfile, toast, fetchTestDefinitions]);

  const updateTestDefinition = useCallback(async (
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
          test_config: testConfig as any,
          categories: categories as any,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

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
  }, [user, toast, fetchTestDefinitions]);

  const deleteTestDefinition = useCallback(async (id: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('test_definitions')
        .delete()
        .eq('id', id);

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
  }, [user, toast, fetchTestDefinitions]);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
      fetchTestDefinitions();
    }
  }, [user, fetchUserProfile, fetchTestDefinitions]);

  return {
    testDefinitions,
    loading,
    userProfile,
    saveTestDefinition,
    updateTestDefinition,
    deleteTestDefinition,
    fetchTestDefinitionById,
    refetch: fetchTestDefinitions,
  };
};
