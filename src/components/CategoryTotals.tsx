
import { Button } from '@/components/ui/button';
import { Category } from './TestConfigurationApp';

interface CategoryTotalsProps {
  category: Category;
}

const CategoryTotals = ({ category }: CategoryTotalsProps) => {
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

  const totals = getCategoryTotals(category);

  return (
    <div className="flex items-center space-x-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 text-blue-800 font-bold hover:from-blue-100 hover:to-blue-200"
      >
        Total: {totals.total}
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="bg-gradient-to-b from-green-200 via-green-300 to-green-400 text-green-900 border-2 border-green-500 font-semibold shadow-lg hover:scale-105 transition-all duration-200"
        style={{
          textShadow: '0 1px 2px rgba(0,0,0,0.3)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.1)'
        }}
      >
        Easy: {totals.easy}
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="bg-gradient-to-b from-orange-200 via-orange-300 to-orange-400 text-orange-900 border-2 border-orange-500 font-semibold shadow-lg hover:scale-105 transition-all duration-200"
        style={{
          textShadow: '0 1px 2px rgba(0,0,0,0.3)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.1)'
        }}
      >
        Medium: {totals.medium}
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="bg-gradient-to-b from-red-200 via-red-300 to-red-400 text-red-900 border-2 border-red-500 font-semibold shadow-lg hover:scale-105 transition-all duration-200"
        style={{
          textShadow: '0 1px 2px rgba(0,0,0,0.3)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.1)'
        }}
      >
        Hard: {totals.hard}
      </Button>
    </div>
  );
};

export default CategoryTotals;
