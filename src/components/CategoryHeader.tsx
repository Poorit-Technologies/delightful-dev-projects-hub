
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { Category } from './TestConfigurationApp';

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
    <div className="flex items-center justify-between p-4 bg-gray-50">
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
    </div>
  );
};

export default CategoryHeader;
