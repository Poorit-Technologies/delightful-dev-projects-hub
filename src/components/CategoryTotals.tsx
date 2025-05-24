
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
        className="bg-green-100 border-green-200 text-green-800 font-medium hover:bg-green-200"
      >
        Easy: {totals.easy}
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="bg-orange-100 border-orange-200 text-orange-800 font-medium hover:bg-orange-200"
      >
        Medium: {totals.medium}
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="bg-red-100 border-red-200 text-red-800 font-medium hover:bg-red-200"
      >
        Hard: {totals.hard}
      </Button>
    </div>
  );
};

export default CategoryTotals;
