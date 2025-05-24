
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { Category, Subcategory, TestConfig } from './TestConfigurationApp';

interface CategorySelectorProps {
  categories: Category[];
  onCategoriesChange: (categories: Category[]) => void;
  config: TestConfig;
}

const CategorySelector = ({ categories, onCategoriesChange, config }: CategorySelectorProps) => {
  const [newSubcategory, setNewSubcategory] = useState('');

  const toggleCategory = (categoryId: string) => {
    const updatedCategories = categories.map(cat =>
      cat.id === categoryId ? { ...cat, expanded: !cat.expanded } : cat
    );
    onCategoriesChange(updatedCategories);
  };

  const toggleCategorySelection = (categoryId: string) => {
    const updatedCategories = categories.map(cat =>
      cat.id === categoryId ? { ...cat, selected: !cat.selected } : cat
    );
    onCategoriesChange(updatedCategories);
    
    // Apply smart distribution if enabled
    if (config.smartDistribution) {
      applySmartDistribution(updatedCategories);
    }
  };

  const applySmartDistribution = (updatedCategories: Category[]) => {
    const selectedCategories = updatedCategories.filter(cat => cat.selected);
    if (selectedCategories.length === 0) return;

    const totalEasy = config.easyQuestions;
    const totalMedium = config.mediumQuestions;
    const totalHard = config.hardQuestions;

    const categoriesWithDistribution = updatedCategories.map(cat => {
      if (!cat.selected) return cat;

      const totalSubcategories = cat.subcategories.length;
      if (totalSubcategories === 0) return cat;

      const easyPerSubcat = Math.floor(totalEasy / selectedCategories.length / totalSubcategories);
      const mediumPerSubcat = Math.floor(totalMedium / selectedCategories.length / totalSubcategories);
      const hardPerSubcat = Math.floor(totalHard / selectedCategories.length / totalSubcategories);

      const updatedSubcategories = cat.subcategories.map(sub => ({
        ...sub,
        easy: easyPerSubcat,
        medium: mediumPerSubcat,
        hard: hardPerSubcat,
      }));

      return { ...cat, subcategories: updatedSubcategories };
    });

    onCategoriesChange(categoriesWithDistribution);
  };

  const updateSubcategory = (categoryId: string, subcategoryId: string, field: keyof Subcategory, value: number) => {
    const updatedCategories = categories.map(cat => {
      if (cat.id === categoryId) {
        const updatedSubcategories = cat.subcategories.map(sub =>
          sub.id === subcategoryId ? { ...sub, [field]: value } : sub
        );
        return { ...cat, subcategories: updatedSubcategories };
      }
      return cat;
    });
    onCategoriesChange(updatedCategories);
  };

  const deleteSubcategory = (categoryId: string, subcategoryId: string) => {
    const updatedCategories = categories.map(cat => {
      if (cat.id === categoryId) {
        const updatedSubcategories = cat.subcategories.filter(sub => sub.id !== subcategoryId);
        return { ...cat, subcategories: updatedSubcategories };
      }
      return cat;
    });
    onCategoriesChange(updatedCategories);
  };

  const addSubcategory = (categoryId: string) => {
    if (!newSubcategory.trim()) return;

    const updatedCategories = categories.map(cat => {
      if (cat.id === categoryId) {
        const newSub: Subcategory = {
          id: `${categoryId}-${Date.now()}`,
          name: newSubcategory,
          easy: 0,
          medium: 0,
          hard: 0,
        };
        return {
          ...cat,
          subcategories: [...cat.subcategories, newSub],
        };
      }
      return cat;
    });
    onCategoriesChange(updatedCategories);
    setNewSubcategory('');
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">Select Categories & Subcategories</h2>

      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.id} className="border border-gray-200 rounded-lg">
            {/* Category Header */}
            <div className="flex items-center justify-between p-4 bg-gray-50">
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id={`cat-${category.id}`} 
                  checked={category.selected || false}
                  onCheckedChange={() => toggleCategorySelection(category.id)}
                />
                <div 
                  className="flex items-center space-x-2 cursor-pointer" 
                  onClick={() => toggleCategory(category.id)}
                >
                  {category.expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  <span className="font-medium">📚 {category.name}</span>
                  <span className="text-sm text-gray-500">Total: {category.totalQuestions}</span>
                </div>
              </div>
            </div>

            {/* Subcategories */}
            {category.expanded && (
              <div className="p-4">
                {category.subcategories.length > 0 && (
                  <>
                    {/* Subcategory Rows */}
                    {category.subcategories.map((subcategory) => (
                      <div key={subcategory.id} className="mb-4 p-3 border border-gray-100 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium">{subcategory.name}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteSubcategory(category.id, subcategory.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                          >
                            Easy
                          </Button>
                          <Input
                            type="number"
                            value={subcategory.easy}
                            onChange={(e) => updateSubcategory(category.id, subcategory.id, 'easy', parseInt(e.target.value) || 0)}
                            className="w-20 text-center"
                            min="0"
                          />
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200"
                          >
                            Medium
                          </Button>
                          <Input
                            type="number"
                            value={subcategory.medium}
                            onChange={(e) => updateSubcategory(category.id, subcategory.id, 'medium', parseInt(e.target.value) || 0)}
                            className="w-20 text-center"
                            min="0"
                          />
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
                          >
                            Hard
                          </Button>
                          <Input
                            type="number"
                            value={subcategory.hard}
                            onChange={(e) => updateSubcategory(category.id, subcategory.id, 'hard', parseInt(e.target.value) || 0)}
                            className="w-20 text-center"
                            min="0"
                          />
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* Add Subcategory */}
                <div className="mt-4 p-3 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Select value={newSubcategory} onValueChange={setNewSubcategory}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select subcategory to add" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Communication Skills">Communication Skills</SelectItem>
                        <SelectItem value="Critical Thinking">Critical Thinking</SelectItem>
                        <SelectItem value="Decision Making">Decision Making</SelectItem>
                        <SelectItem value="Conflict Resolution">Conflict Resolution</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      size="sm" 
                      onClick={() => addSubcategory(category.id)}
                      disabled={!newSubcategory}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CategorySelector;
