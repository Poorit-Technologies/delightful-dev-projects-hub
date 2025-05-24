
import { Button } from '@/components/ui/button';
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
  onDeleteSubcategory,
}: SubcategoryItemProps) => {
  return (
    <div className="mb-4 p-3 border border-gray-100 rounded-lg">
      <div className="flex items-center justify-between">
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

        {/* Display current values */}
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-b from-green-100 via-green-200 to-green-300 text-green-900 px-3 py-1 rounded-lg font-semibold text-sm shadow-lg border-2 border-green-400"
               style={{
                 textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                 boxShadow: '0 4px 8px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.1)'
               }}>
            {subcategory.easy}
          </div>
          <div className="bg-gradient-to-b from-orange-100 via-orange-200 to-orange-300 text-orange-900 px-3 py-1 rounded-lg font-semibold text-sm shadow-lg border-2 border-orange-400"
               style={{
                 textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                 boxShadow: '0 4px 8px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.1)'
               }}>
            {subcategory.medium}
          </div>
          <div className="bg-gradient-to-b from-red-100 via-red-200 to-red-300 text-red-900 px-3 py-1 rounded-lg font-semibold text-sm shadow-lg border-2 border-red-400"
               style={{
                 textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                 boxShadow: '0 4px 8px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.1)'
               }}>
            {subcategory.hard}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubcategoryItem;
