
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ActionButtons = () => {
  const { toast } = useToast();

  const handlePrevious = () => {
    toast({
      title: "Previous Step",
      description: "Going back to the previous step...",
    });
  };

  const handleNext = () => {
    toast({
      title: "Next Step", 
      description: "Proceeding to the next step...",
    });
  };

  return (
    <div className="flex justify-center space-x-6">
      <Button 
        onClick={handlePrevious}
        variant="outline"
        className="group relative px-8 py-3 bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 border-2 border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-800 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        <div className="flex items-center space-x-2">
          <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
          <span>Previous</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Button>
      
      <Button 
        onClick={handleNext}
        className="group relative px-8 py-3 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0"
      >
        <div className="flex items-center space-x-2">
          <span>Next</span>
          <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Button>
    </div>
  );
};

export default ActionButtons;
