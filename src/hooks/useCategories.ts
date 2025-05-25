
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface DatabaseCategory {
  id: string;
  name: string;
  description?: string;
  total_questions: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DatabaseSubcategory {
  id: string;
  category_id: string;
  name: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useCategories = () => {
  const [categories, setCategories] = useState<DatabaseCategory[]>([]);
  const [subcategories, setSubcategories] = useState<DatabaseSubcategory[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchCategories = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: "Error",
        description: "Failed to load categories",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  const fetchSubcategories = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('subcategories')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setSubcategories(data || []);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      toast({
        title: "Error",
        description: "Failed to load subcategories",
        variant: "destructive",
      });
    }
  }, [user, toast]);

  useEffect(() => {
    if (user) {
      fetchCategories();
      fetchSubcategories();
    }
  }, [user, fetchCategories, fetchSubcategories]);

  return {
    categories,
    subcategories,
    loading,
    refetchCategories: fetchCategories,
    refetchSubcategories: fetchSubcategories,
  };
};
