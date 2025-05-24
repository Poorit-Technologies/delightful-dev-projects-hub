
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';
import { Subcategory } from './TestConfigurationApp';

interface SubcategoryItemProps {
  subcategory: Subcategory;
  categoryId: string;
  onUpdateSubcategory: (categoryId: string, subcategoryId: string, field: keyof Subcategory, value: number) => void;
  onDeleteSubcategory: (categoryId: string, subcategoryId: string) => void;
}

const SubcategoryItem = ({
  subcategory,
  categoryId,
  onUpdateSubcategory,
  onDeleteSubcategory,
}: SubcategoryItemProps) => {
  return (
    <div className="mb-4 p-3 border border-gray-100 rounded-lg">
      <div className="flex items-center space-x-4">
        {/* Subcategory Name */}
        <div className="flex items-center space-x-2 min-w-[200px]">
          <span className="text-sm font-medium">{subcategory.name}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDeleteSubcategory(categoryId, subcategory.id)}
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
            onChange={(e) => onUpdateSubcategory(categoryId, subcategory.id, 'easy', parseInt(e.target.value) || 0)}
            className="w-16 h-8 text-center bg-green-50 border-green-200"
            min="0"
          />
          <Input
            type="number"
            value={subcategory.medium}
            onChange={(e) => onUpdateSubcategory(categoryId, subcategory.id, 'medium', parseInt(e.target.value) || 0)}
            className="w-16 h-8 text-center bg-orange-50 border-orange-200"
            min="0"
          />
          <Input
            type="number"
            value={subcategory.hard}
            onChange={(e) => onUpdateSubcategory(categoryId, subcategory.id, 'hard', parseInt(e.target.value) || 0)}
            className="w-16 h-8 text-center bg-red-50 border-red-200"
            min="0"
          />
        </div>
      </div>
    </div>
  );
};

export default SubcategoryItem;
