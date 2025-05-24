
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, FolderOpen, CheckCircle, AlertCircle } from 'lucide-react';
import { Category, Subcategory, TestConfig } from './TestConfigurationApp';
import CategoryHeader from './CategoryHeader';
import CategoryTotals from './CategoryTotals';
import SubcategoryList from './SubcategoryList';

interface CategorySelectorProps {
  categories: Category[];
  onCategoriesChange: (categories: Category[]) => void;
  config: TestConfig;
}

const CategorySelector = ({ categories, onCategoriesChange, config }: CategorySelectorProps) => {
  const [isMainCollapsed, setIsMainCollapsed] = useState(true);

  const selectedCategories = categories.filter(cat => cat.selected);
  const hasSelectedCategories = selectedCategories.length > 0;
  const totalQuestions = selectedCategories.reduce((total, cat) => {
    return total + cat.subcategories.reduce((subTotal, sub) => subTotal + sub.easy + sub.medium + sub.hard, 0);
  }, 0);

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

  const redistributeQuestions = (categoryId: string, deletedSubcategory: Subcategory, remainingSubcategories: Subcategory[]) => {
    if (remainingSubcategories.length === 0) return remainingSubcategories;

    const questionsToRedistribute = {
      easy: deletedSubcategory.easy,
      medium: deletedSubcategory.medium,
      hard: deletedSubcategory.hard,
    };

    // Distribute questions evenly among remaining subcategories
    const easyPerSubcat = Math.floor(questionsToRedistribute.easy / remainingSubcategories.length);
    const mediumPerSubcat = Math.floor(questionsToRedistribute.medium / remainingSubcategories.length);
    const hardPerSubcat = Math.floor(questionsToRedistribute.hard / remainingSubcategories.length);

    // Calculate remainders
    const easyRemainder = questionsToRedistribute.easy % remainingSubcategories.length;
    const mediumRemainder = questionsToRedistribute.medium % remainingSubcategories.length;
    const hardRemainder = questionsToRedistribute.hard % remainingSubcategories.length;

    return remainingSubcategories.map((sub, index) => ({
      ...sub,
      easy: sub.easy + easyPerSubcat + (index < easyRemainder ? 1 : 0),
      medium: sub.medium + mediumPerSubcat + (index < mediumRemainder ? 1 : 0),
      hard: sub.hard + hardPerSubcat + (index < hardRemainder ? 1 : 0),
    }));
  };

  const deleteSubcategory = (categoryId: string, subcategoryId: string) => {
    const updatedCategories = categories.map(cat => {
      if (cat.id === categoryId) {
        const subcategoryToDelete = cat.subcategories.find(sub => sub.id === subcategoryId);
        const remainingSubcategories = cat.subcategories.filter(sub => sub.id !== subcategoryId);
        
        // Redistribute questions from deleted subcategory to remaining ones
        const redistributedSubcategories = subcategoryToDelete 
          ? redistributeQuestions(categoryId, subcategoryToDelete, remainingSubcategories)
          : remainingSubcategories;
        
        return { ...cat, subcategories: redistributedSubcategories };
      }
      return cat;
    });
    
    onCategoriesChange(updatedCategories);
  };

  const addSubcategory = (categoryId: string, subcategoryName: string) => {
    const updatedCategories = categories.map(cat => {
      if (cat.id === categoryId) {
        const newSub: Subcategory = {
          id: `${categoryId}-${Date.now()}`,
          name: subcategoryName,
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
    
    // If the category is selected and smart distribution is enabled, redistribute questions
    const category = categories.find(cat => cat.id === categoryId);
    if (category?.selected && config.smartDistribution) {
      applySmartDistribution(updatedCategories);
    } else {
      onCategoriesChange(updatedCategories);
    }
  };

  return (
    <Card className="p-0 overflow-hidden backdrop-blur-sm bg-white/80 border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300">
      <Collapsible open={!isMainCollapsed} onOpenChange={(open) => setIsMainCollapsed(!open)}>
        <CollapsibleTrigger className="w-full group">
          <div className={`flex items-center justify-between p-6 transition-all duration-300 ${
            !isMainCollapsed 
              ? 'bg-gradient-to-r from-blue-50 to-indigo-50' 
              : hasSelectedCategories
                ? 'bg-gradient-to-r from-green-50 via-blue-50 to-green-50 hover:from-green-100 hover:to-blue-100'
                : 'bg-gradient-to-r from-gray-50 via-slate-50 to-gray-50 hover:from-gray-100 hover:to-slate-100'
          } border-l-4 ${
            hasSelectedCategories ? 'border-l-green-400' : 'border-l-gray-400'
          }`}>
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg transition-all duration-300 ${
                hasSelectedCategories 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                <FolderOpen className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                  Select Categories & Subcategories
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {hasSelectedCategories 
                    ? `✅ ${selectedCategories.length} categories selected, ${totalQuestions} questions assigned`
                    : `📂 Select categories to distribute questions`
                  }
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {hasSelectedCategories ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-gray-500" />
              )}
              {!isMainCollapsed ? (
                <ChevronDown className="h-5 w-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
              )}
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="animate-accordion-down">
          <div className="p-6 bg-gradient-to-br from-white to-gray-50">
            <div className="space-y-4">
              {categories.map((category) => (
                <div key={category.id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white/50 backdrop-blur-sm">
                  {/* Category Header with Totals */}
                  <div className="flex items-center justify-between">
                    <CategoryHeader
                      category={category}
                      onToggleCategory={toggleCategory}
                      onToggleCategorySelection={toggleCategorySelection}
                      onAddSubcategory={addSubcategory}
                    />
                    <div className="pr-4">
                      <CategoryTotals category={category} />
                    </div>
                  </div>

                  {/* Subcategories */}
                  <SubcategoryList
                    category={category}
                    onUpdateSubcategory={updateSubcategory}
                    onDeleteSubcategory={deleteSubcategory}
                  />
                </div>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default CategorySelector;
