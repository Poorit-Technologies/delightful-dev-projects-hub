
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { Category } from './TestConfigurationApp';
import CategoryTotals from './CategoryTotals';

interface CategoryHeaderProps {
  category: Category;
  onToggleCategory: (categoryId: string) => void;
  onToggleCategorySelection: (categoryId: string) => void;
  onAddSubcategory: (categoryId: string, subcategoryName: string) => void;
}

const CategoryHeader = ({
  category,
  onToggleCategory,
  onToggleCategorySelection,
  onAddSubcategory,
}: CategoryHeaderProps) => {
  const [newSubcategory, setNewSubcategory] = useState('');

  const handleAddSubcategory = () => {
    if (!newSubcategory.trim()) return;
    onAddSubcategory(category.id, newSubcategory);
    setNewSubcategory('');
  };

  return (
    <div className="bg-gray-50">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <Checkbox 
            id={`cat-${category.id}`} 
            checked={category.selected || false}
            onCheckedChange={() => onToggleCategorySelection(category.id)}
          />
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => onToggleCategory(category.id)}
          >
            {category.expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            <span className="font-medium">📚 {category.name}</span>
          </div>
          
          {/* Add Subcategory Section */}
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
              onClick={handleAddSubcategory}
              disabled={!newSubcategory}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <CategoryTotals category={category} />
      </div>

      {/* Input boxes positioned below the totals */}
      <div className="px-4 pb-4">
        <div className="flex justify-end">
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="Easy"
              className="w-16 h-8 text-center bg-gradient-to-b from-green-100 via-green-200 to-green-300 text-green-900 border-2 border-green-400 font-semibold"
              style={{
                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
              }}
              min="0"
            />
            <Input
              type="number"
              placeholder="Medium"
              className="w-16 h-8 text-center bg-gradient-to-b from-orange-100 via-orange-200 to-orange-300 text-orange-900 border-2 border-orange-400 font-semibold"
              style={{
                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
              }}
              min="0"
            />
            <Input
              type="number"
              placeholder="Hard"
              className="w-16 h-8 text-center bg-gradient-to-b from-red-100 via-red-200 to-red-300 text-red-900 border-2 border-red-400 font-semibold"
              style={{
                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
              }}
              min="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader;
