import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
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
  const [isMainCollapsed, setIsMainCollapsed] = useState(true);

  const toggleCategory = (categoryId: string) => {
    const updatedCategories = categories.map(cat =>
      cat.id === categoryId ? { ...cat, expanded: !cat.expanded } : cat
    );
    onCategoriesChange(updatedCategories);
  };

  const toggleCategorySelection = (categoryId: string) => {
    const updatedCategories = categories.map(cat => {
      if (cat.id === categoryId) {
        const newSelected = !cat.selected;
        // If deselecting category, clear all subcategory values and collapse it
        if (!newSelected) {
          const clearedSubcategories = cat.subcategories.map(sub => ({
            ...sub,
            easy: 0,
            medium: 0,
            hard: 0,
          }));
          return { ...cat, selected: newSelected, expanded: false, subcategories: clearedSubcategories };
        }
        return { ...cat, selected: newSelected };
      }
      return cat;
    });
    
    // Apply smart distribution if enabled
    if (config.smartDistribution) {
      applySmartDistribution(updatedCategories);
    } else {
      onCategoriesChange(updatedCategories);
    }
  };

  const applySmartDistribution = (updatedCategories: Category[]) => {
    const selectedCategories = updatedCategories.filter(cat => cat.selected);
    if (selectedCategories.length === 0) {
      onCategoriesChange(updatedCategories);
      return;
    }

    // Count total subcategories across all selected categories
    const totalSelectedSubcategories = selectedCategories.reduce((total, cat) => total + cat.subcategories.length, 0);
    if (totalSelectedSubcategories === 0) {
      onCategoriesChange(updatedCategories);
      return;
    }

    // Calculate questions per subcategory
    const easyPerSubcat = Math.floor(config.easyQuestions / totalSelectedSubcategories);
    const mediumPerSubcat = Math.floor(config.mediumQuestions / totalSelectedSubcategories);
    const hardPerSubcat = Math.floor(config.hardQuestions / totalSelectedSubcategories);

    // Calculate remainders for distribution
    const easyRemainder = config.easyQuestions % totalSelectedSubcategories;
    const mediumRemainder = config.mediumQuestions % totalSelectedSubcategories;
    const hardRemainder = config.hardQuestions % totalSelectedSubcategories;

    let subcategoryIndex = 0;
    const categoriesWithDistribution = updatedCategories.map(cat => {
      if (!cat.selected) return cat;

      const updatedSubcategories = cat.subcategories.map(sub => {
        const easyQuestions = easyPerSubcat + (subcategoryIndex < easyRemainder ? 1 : 0);
        const mediumQuestions = mediumPerSubcat + (subcategoryIndex < mediumRemainder ? 1 : 0);
        const hardQuestions = hardPerSubcat + (subcategoryIndex < hardRemainder ? 1 : 0);
        
        subcategoryIndex++;
        
        return {
          ...sub,
          easy: easyQuestions,
          medium: mediumQuestions,
          hard: hardQuestions,
        };
      });

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
    
    // If smart distribution is enabled, redistribute the questions
    if (config.smartDistribution) {
      applySmartDistribution(updatedCategories);
    } else {
      onCategoriesChange(updatedCategories);
    }
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

  const getCategoryTotals = (category: Category) => {
    const totals = category.subcategories.reduce(
      (acc, sub) => ({
        easy: acc.easy + sub.easy,
        medium: acc.medium + sub.medium,
        hard: acc.hard + sub.hard,
        total: acc.total + sub.easy + sub.medium + sub.hard,
      }),
      { easy: 0, medium: 0, hard: 0, total: 0 }
    );
    return totals;
  };

  return (
    <Card className="p-6">
      <Collapsible open={!isMainCollapsed} onOpenChange={(open) => setIsMainCollapsed(!open)}>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h2 className="text-xl font-semibold text-blue-600">Select Categories & Subcategories</h2>
          {!isMainCollapsed ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="space-y-4 mt-4">
            {categories.map((category) => {
              const totals = getCategoryTotals(category);
              
              return (
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
                      </div>
                      
                      {/* Add Subcategory Button */}
                      <div className="flex items-center space-x-2">
                        <Select value={newSubcategory} onValueChange={setNewSubcategory}>
                          <SelectTrigger className="w-48 h-8">
                            <SelectValue placeholder="Add subcategory" />
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
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Beautified Total - Right Justified */}
                    <div className="text-right">
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2 rounded-lg border border-blue-200 shadow-sm">
                        <div className="flex items-center space-x-3 text-sm">
                          <span className="text-lg font-bold text-blue-800">Total: {totals.total}</span>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded font-medium">
                            Easy: {totals.easy}
                          </span>
                          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded font-medium">
                            Medium: {totals.medium}
                          </span>
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded font-medium">
                            Hard: {totals.hard}
                          </span>
                        </div>
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
                              <div className="flex items-center space-x-4">
                                {/* Subcategory Name */}
                                <div className="flex items-center space-x-2 min-w-[200px]">
                                  <span className="text-sm font-medium">{subcategory.name}</span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => deleteSubcategory(category.id, subcategory.id)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 h-6 w-6 p-0"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>

                                {/* 3D Difficulty Buttons */}
                                <div className="flex items-center space-x-2">
                                  <div className="bg-gradient-to-b from-green-200 via-green-300 to-green-400 text-green-900 px-3 py-1 rounded-lg font-semibold text-sm shadow-lg border-2 border-green-500 transform hover:scale-105 transition-all duration-200"
                                       style={{
                                         textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                                         boxShadow: '0 4px 8px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.1)'
                                       }}>
                                    Easy
                                  </div>
                                  <div className="bg-gradient-to-b from-orange-200 via-orange-300 to-orange-400 text-orange-900 px-3 py-1 rounded-lg font-semibold text-sm shadow-lg border-2 border-orange-500 transform hover:scale-105 transition-all duration-200"
                                       style={{
                                         textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                                         boxShadow: '0 4px 8px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.1)'
                                       }}>
                                    Medium
                                  </div>
                                  <div className="bg-gradient-to-b from-red-200 via-red-300 to-red-400 text-red-900 px-3 py-1 rounded-lg font-semibold text-sm shadow-lg border-2 border-red-500 transform hover:scale-105 transition-all duration-200"
                                       style={{
                                         textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                                         boxShadow: '0 4px 8px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.1)'
                                       }}>
                                    Hard
                                  </div>
                                </div>

                                {/* Input Fields */}
                                <div className="flex items-center space-x-2">
                                  <Input
                                    type="number"
                                    value={subcategory.easy}
                                    onChange={(e) => updateSubcategory(category.id, subcategory.id, 'easy', parseInt(e.target.value) || 0)}
                                    className="w-16 h-8 text-center bg-green-50 border-green-200"
                                    min="0"
                                  />
                                  <Input
                                    type="number"
                                    value={subcategory.medium}
                                    onChange={(e) => updateSubcategory(category.id, subcategory.id, 'medium', parseInt(e.target.value) || 0)}
                                    className="w-16 h-8 text-center bg-orange-50 border-orange-200"
                                    min="0"
                                  />
                                  <Input
                                    type="number"
                                    value={subcategory.hard}
                                    onChange={(e) => updateSubcategory(category.id, subcategory.id, 'hard', parseInt(e.target.value) || 0)}
                                    className="w-16 h-8 text-center bg-red-50 border-red-200"
                                    min="0"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default CategorySelector;
