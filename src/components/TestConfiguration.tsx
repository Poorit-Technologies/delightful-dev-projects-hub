
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { TestConfig } from './TestConfigurationApp';

interface TestConfigurationProps {
  config: TestConfig;
  onConfigChange: (updates: Partial<TestConfig>) => void;
}

const TestConfiguration = ({ config, onConfigChange }: TestConfigurationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [easyPercentage, setEasyPercentage] = useState(calculatePercentage(config.easyQuestions));
  const [mediumPercentage, setMediumPercentage] = useState(calculatePercentage(config.mediumQuestions));
  const [hardPercentage, setHardPercentage] = useState(calculatePercentage(config.hardQuestions));
  const { toast } = useToast();

  function calculatePercentage(count: number) {
    return config.totalQuestions > 0 ? Math.round((count / config.totalQuestions) * 100) : 0;
  }

  const handleInputChange = (field: keyof TestConfig, value: number | boolean) => {
    onConfigChange({ [field]: value });
  };

  const handleTotalQuestionsChange = (total: number) => {
    const easyCount = Math.round((easyPercentage / 100) * total);
    const mediumCount = Math.round((mediumPercentage / 100) * total);
    const hardCount = total - easyCount - mediumCount;
    
    onConfigChange({ 
      totalQuestions: total,
      easyQuestions: easyCount,
      mediumQuestions: mediumCount,
      hardQuestions: hardCount
    });
  };

  const handlePercentageChange = (difficulty: 'easy' | 'medium' | 'hard', percentage: number) => {
    const totalQuestions = config.totalQuestions;
    const newCount = Math.round((percentage / 100) * totalQuestions);
    
    if (difficulty === 'easy') {
      setEasyPercentage(percentage);
      onConfigChange({ easyQuestions: newCount });
    } else if (difficulty === 'medium') {
      setMediumPercentage(percentage);
      onConfigChange({ mediumQuestions: newCount });
    } else if (difficulty === 'hard') {
      setHardPercentage(percentage);
      onConfigChange({ hardQuestions: newCount });
    }
  };

  const validatePercentages = () => {
    const totalPercentage = easyPercentage + mediumPercentage + hardPercentage;
    if (totalPercentage === 100) {
      // If validation passes, collapse the section
      setIsOpen(false);
      toast({
        title: "Configuration Valid",
        description: "Test configuration is complete and valid.",
        variant: "default",
      });
    } else {
      // Only show error if total is not 100%
      toast({
        title: "Validation Error",
        description: `Total percentage must equal 100%. Current total: ${totalPercentage}%`,
        variant: "destructive",
      });
    }
  };

  const handleSectionBlur = (e: React.FocusEvent) => {
    // Check if the focus is moving outside the Test Configuration section
    const currentTarget = e.currentTarget;
    const relatedTarget = e.relatedTarget as Node;
    
    // If relatedTarget is null or not contained within the current section, validate
    if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
      const totalPercentage = easyPercentage + mediumPercentage + hardPercentage;
      // Only validate and show error if the total is not 100%
      if (totalPercentage !== 100) {
        validatePercentages();
      } else if (totalPercentage === 100) {
        // If validation passes, collapse the section without showing success toast
        setIsOpen(false);
      }
    }
  };

  return (
    <Card className="p-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h2 className="text-xl font-semibold text-blue-600">Test Configuration</h2>
          {isOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div onBlur={handleSectionBlur}>
            <p className="text-sm text-gray-600 mb-6">
              Configure your test parameters and question distribution with intelligent distribution
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Total Questions */}
              <div className="space-y-2 p-4 rounded-lg border-2 border-blue-400 bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 text-blue-900 shadow-lg transform hover:scale-105 transition-all duration-200"
                   style={{
                     textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                     boxShadow: '0 4px 8px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.1)'
                   }}>
                <Label htmlFor="totalQuestions" className="text-sm font-semibold text-center block">Total Questions</Label>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-900 mb-3">{config.totalQuestions}</div>
                  <Input
                    id="totalQuestions"
                    type="number"
                    value={config.totalQuestions}
                    onChange={(e) => handleTotalQuestionsChange(parseInt(e.target.value) || 0)}
                    className="text-center font-semibold text-lg bg-white text-blue-900"
                  />
                </div>
              </div>

              {/* Easy Questions */}
              <div className="space-y-2 p-4 rounded-lg border-2 border-green-400 bg-gradient-to-b from-green-100 via-green-200 to-green-300 text-green-900 shadow-lg transform hover:scale-105 transition-all duration-200"
                   style={{
                     textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                     boxShadow: '0 4px 8px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.1)'
                   }}>
                <Label className="text-sm font-semibold text-green-900 text-center block">Easy Questions</Label>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-900 mb-3">{config.easyQuestions}</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-sm">%</span>
                      <span className="text-sm">Percentage</span>
                    </div>
                    <Input
                      type="text"
                      value={easyPercentage}
                      onChange={(e) => handlePercentageChange('easy', parseInt(e.target.value) || 0)}
                      className="text-center bg-white text-green-900"
                    />
                  </div>
                  <div className="space-y-2 mt-3">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-sm">📊</span>
                      <span className="text-sm">Marks</span>
                    </div>
                    <Input
                      type="number"
                      value={config.easyMarks}
                      onChange={(e) => handleInputChange('easyMarks', parseInt(e.target.value) || 0)}
                      className="text-center bg-white text-green-900"
                    />
                  </div>
                  <Input
                    type="number"
                    placeholder="Time (seconds)"
                    value={config.easyTime}
                    onChange={(e) => handleInputChange('easyTime', parseInt(e.target.value) || 0)}
                    className="mt-3 text-center bg-white text-green-900"
                  />
                </div>
              </div>

              {/* Medium Questions */}
              <div className="space-y-2 p-4 rounded-lg border-2 border-orange-400 bg-gradient-to-b from-orange-100 via-orange-200 to-orange-300 text-orange-900 shadow-lg transform hover:scale-105 transition-all duration-200"
                   style={{
                     textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                     boxShadow: '0 4px 8px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.1)'
                   }}>
                <Label className="text-sm font-semibold text-orange-900 text-center block">Medium Questions</Label>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-900 mb-3">{config.mediumQuestions}</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-sm">%</span>
                      <span className="text-sm">Percentage</span>
                    </div>
                    <Input
                      type="text"
                      value={mediumPercentage}
                      onChange={(e) => handlePercentageChange('medium', parseInt(e.target.value) || 0)}
                      className="text-center bg-white text-orange-900"
                    />
                  </div>
                  <div className="space-y-2 mt-3">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-sm">📊</span>
                      <span className="text-sm">Marks</span>
                    </div>
                    <Input
                      type="number"
                      value={config.mediumMarks}
                      onChange={(e) => handleInputChange('mediumMarks', parseInt(e.target.value) || 0)}
                      className="text-center bg-white text-orange-900"
                    />
                  </div>
                  <Input
                    type="number"
                    placeholder="Time (seconds)"
                    value={config.mediumTime}
                    onChange={(e) => handleInputChange('mediumTime', parseInt(e.target.value) || 0)}
                    className="mt-3 text-center bg-white text-orange-900"
                  />
                </div>
              </div>

              {/* Hard Questions */}
              <div className="space-y-2 p-4 rounded-lg border-2 border-red-400 bg-gradient-to-b from-red-100 via-red-200 to-red-300 text-red-900 shadow-lg transform hover:scale-105 transition-all duration-200"
                   style={{
                     textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                     boxShadow: '0 4px 8px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.1)'
                   }}>
                <Label className="text-sm font-semibold text-red-900 text-center block">Hard Questions</Label>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-900 mb-3">{config.hardQuestions}</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-sm">%</span>
                      <span className="text-sm">Percentage</span>
                    </div>
                    <Input
                      type="text"
                      value={hardPercentage}
                      onChange={(e) => handlePercentageChange('hard', parseInt(e.target.value) || 0)}
                      className="text-center bg-white text-red-900"
                    />
                  </div>
                  <div className="space-y-2 mt-3">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-sm">📊</span>
                      <span className="text-sm">Marks</span>
                    </div>
                    <Input
                      type="number"
                      value={config.hardMarks}
                      onChange={(e) => handleInputChange('hardMarks', parseInt(e.target.value) || 0)}
                      className="text-center bg-white text-red-900"
                    />
                  </div>
                  <Input
                    type="number"
                    placeholder="Time (seconds)"
                    value={config.hardTime}
                    onChange={(e) => handleInputChange('hardTime', parseInt(e.target.value) || 0)}
                    className="mt-3 text-center bg-white text-red-900"
                  />
                </div>
              </div>
            </div>

            {/* Smart Distribution */}
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="smartDistribution"
                  checked={config.smartDistribution}
                  onCheckedChange={(checked) => handleInputChange('smartDistribution', !!checked)}
                />
                <Label htmlFor="smartDistribution" className="text-sm font-medium">
                  💡 Smart Distribution
                </Label>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Questions are automatically distributed across selected subcategories based on optimal learning algorithms and difficulty balancing.
              </p>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default TestConfiguration;
