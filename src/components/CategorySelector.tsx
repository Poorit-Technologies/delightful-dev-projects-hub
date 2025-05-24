
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { Category, Subcategory } from './TestConfigurationApp';

interface CategorySelectorProps {
  categories: Category[];
  onCategoriesChange: (categories: Category[]) => void;
}

const CategorySelector = ({ categories, onCategoriesChange }: CategorySelectorProps) => {
  const [newSubcategory, setNewSubcategory] = useState('');

  const toggleCategory = (categoryId: string) => {
    const updatedCategories = categories.map(cat =>
      cat.id === categoryId ? { ...cat, expanded: !cat.expanded } : cat
    );
    onCategoriesChange(updatedCategories);
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

  const addSubcategory = (categoryId: string) => {
    if (!newSubcategory.trim()) return;

    const updatedCategories = categories.map(cat => {
      if (cat.id === categoryId) {
        const newSub: Subcategory = {
          id: `${categoryId}-${Date.now()}`,
          name: newSubcategory,
          default: 2,
          easy: 2,
          medium: 2,
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
            <div className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer" onClick={() => toggleCategory(category.id)}>
              <div className="flex items-center space-x-3">
                <Checkbox id={`cat-${category.id}`} defaultChecked />
                {category.expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                <span className="font-medium">📚 {category.name}</span>
                <span className="text-sm text-gray-500">Total: {category.totalQuestions}</span>
              </div>
            </div>

            {/* Subcategories */}
            {category.expanded && (
              <div className="p-4">
                {category.subcategories.length > 0 && (
                  <>
                    {/* Headers */}
                    <div className="grid grid-cols-6 gap-4 mb-3 text-sm font-medium text-gray-600">
                      <div>Subcategory</div>
                      <div className="text-center">Default</div>
                      <div className="text-center text-green-600">E-1</div>
                      <div className="text-center text-orange-600">M-1</div>
                      <div className="text-center text-red-600">H-1</div>
                      <div></div>
                    </div>

                    {/* Subcategory Rows */}
                    {category.subcategories.map((subcategory) => (
                      <div key={subcategory.id} className="grid grid-cols-6 gap-4 mb-3 items-center">
                        <div className="text-sm">{subcategory.name}</div>
                        <Input
                          type="number"
                          value={subcategory.default}
                          onChange={(e) => updateSubcategory(category.id, subcategory.id, 'default', parseInt(e.target.value) || 0)}
                          className="text-center text-sm"
                        />
                        <Input
                          type="number"
                          value={subcategory.easy}
                          onChange={(e) => updateSubcategory(category.id, subcategory.id, 'easy', parseInt(e.target.value) || 0)}
                          className="text-center text-sm"
                        />
                        <Input
                          type="number"
                          value={subcategory.medium}
                          onChange={(e) => updateSubcategory(category.id, subcategory.id, 'medium', parseInt(e.target.value) || 0)}
                          className="text-center text-sm"
                        />
                        <Input
                          type="number"
                          value={subcategory.hard}
                          onChange={(e) => updateSubcategory(category.id, subcategory.id, 'hard', parseInt(e.target.value) || 0)}
                          className="text-center text-sm"
                        />
                        <div></div>
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
