
import SubcategoryItem from './SubcategoryItem';
import { Category, Subcategory } from './TestConfigurationApp';

interface SubcategoryListProps {
  category: Category;
  onUpdateSubcategory: (categoryId: string, subcategoryId: string, field: keyof Subcategory, value: number) => void;
  onDeleteSubcategory: (categoryId: string, subcategoryId: string) => void;
}

const SubcategoryList = ({
  category,
  onUpdateSubcategory,
  onDeleteSubcategory,
}: SubcategoryListProps) => {
  if (!category.expanded || category.subcategories.length === 0) {
    return null;
  }

  return (
    <div className="p-4">
      {category.subcategories.map((subcategory) => (
        <SubcategoryItem
          key={subcategory.id}
          subcategory={subcategory}
          categoryId={category.id}
          onUpdateSubcategory={onUpdateSubcategory}
          onDeleteSubcategory={onDeleteSubcategory}
        />
      ))}
    </div>
  );
};

export default SubcategoryList;
