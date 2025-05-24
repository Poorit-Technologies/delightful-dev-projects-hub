
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
      <div className="grid grid-cols-4 gap-4 items-center">
        {/* Subcategory Name */}
        <div className="flex items-center space-x-2">
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

        {/* Easy Questions Input - Aligned with Easy column */}
        <div className="flex flex-col items-center space-y-2">
          <Input
            type="number"
            value={subcategory.easy}
            onChange={(e) => onUpdateSubcategory(categoryId, subcategory.id, 'easy', parseInt(e.target.value) || 0)}
            className="w-16 h-8 text-center bg-gradient-to-b from-green-100 via-green-200 to-green-300 text-green-900 border-2 border-green-400 font-semibold"
            style={{
              textShadow: '0 1px 2px rgba(0,0,0,0.3)'
            }}
            min="0"
          />
        </div>

        {/* Medium Questions Input - Aligned with Medium column */}
        <div className="flex flex-col items-center space-y-2">
          <Input
            type="number"
            value={subcategory.medium}
            onChange={(e) => onUpdateSubcategory(categoryId, subcategory.id, 'medium', parseInt(e.target.value) || 0)}
            className="w-16 h-8 text-center bg-gradient-to-b from-orange-100 via-orange-200 to-orange-300 text-orange-900 border-2 border-orange-400 font-semibold"
            style={{
              textShadow: '0 1px 2px rgba(0,0,0,0.3)'
            }}
            min="0"
          />
        </div>

        {/* Hard Questions Input - Aligned with Hard column */}
        <div className="flex flex-col items-center space-y-2">
          <Input
            type="number"
            value={subcategory.hard}
            onChange={(e) => onUpdateSubcategory(categoryId, subcategory.id, 'hard', parseInt(e.target.value) || 0)}
            className="w-16 h-8 text-center bg-gradient-to-b from-red-100 via-red-200 to-red-300 text-red-900 border-2 border-red-400 font-semibold"
            style={{
              textShadow: '0 1px 2px rgba(0,0,0,0.3)'
            }}
            min="0"
          />
        </div>
      </div>
    </div>
  );
};

export default SubcategoryItem;
