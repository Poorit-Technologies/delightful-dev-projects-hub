import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Settings, CheckCircle, AlertCircle } from 'lucide-react';
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

  const isConfigComplete = () => {
    const totalPercentage = easyPercentage + mediumPercentage + hardPercentage;
    return totalPercentage === 100 && config.totalQuestions > 0;
  };

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
      setIsOpen(false);
      toast({
        title: "Configuration Valid",
        description: "Test configuration is complete and valid.",
        variant: "default",
      });
    } else {
      toast({
        title: "Validation Error",
        description: `Total percentage must equal 100%. Current total: ${totalPercentage}%`,
        variant: "destructive",
      });
    }
  };

  const handleSectionBlur = (e: React.FocusEvent) => {
    const currentTarget = e.currentTarget;
    const relatedTarget = e.relatedTarget as Node;
    
    if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
      const totalPercentage = easyPercentage + mediumPercentage + hardPercentage;
      if (totalPercentage !== 100) {
        validatePercentages();
      } else if (totalPercentage === 100) {
        setIsOpen(false);
      }
    }
  };

  return (
    <Card className="p-0 overflow-hidden backdrop-blur-sm bg-white/80 border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full group">
          <div className={`flex items-center justify-between p-6 transition-all duration-300 ${
            isOpen 
              ? 'bg-gradient-to-r from-blue-50 to-indigo-50' 
              : isConfigComplete()
                ? 'bg-gradient-to-r from-green-50 via-blue-50 to-green-50 hover:from-green-100 hover:to-blue-100'
                : 'bg-gradient-to-r from-orange-50 via-yellow-50 to-orange-50 hover:from-orange-100 hover:to-yellow-100'
          } border-l-4 ${
            isConfigComplete() ? 'border-l-green-400' : 'border-l-orange-400'
          }`}>
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg transition-all duration-300 ${
                isConfigComplete() 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-orange-100 text-orange-600'
              }`}>
                <Settings className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                  Test Configuration
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {isConfigComplete() 
                    ? `✅ Complete - ${config.totalQuestions} questions configured`
                    : `⚠️ Configure ${config.totalQuestions} total questions`
                  }
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {isConfigComplete() ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-orange-500" />
              )}
              {isOpen ? (
                <ChevronDown className="h-5 w-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
              )}
            </div>
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="animate-accordion-down">
          <div onBlur={handleSectionBlur} className="p-6 bg-gradient-to-br from-white to-gray-50">
            <p className="text-sm text-gray-600 mb-6">
              Configure your test parameters and question distribution with intelligent distribution
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Total Questions */}
              <div className="space-y-2 p-6 rounded-xl border-2 border-blue-300 bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 text-blue-900 shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                   style={{
                     textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                     boxShadow: '0 8px 25px rgba(59, 130, 246, 0.15), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.1)'
                   }}>
                <Label htmlFor="totalQuestions" className="text-sm font-semibold text-center block">Total Questions</Label>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-900 mb-3">{config.totalQuestions}</div>
                  <Input
                    id="totalQuestions"
                    type="number"
                    value={config.totalQuestions}
                    onChange={(e) => handleTotalQuestionsChange(parseInt(e.target.value) || 0)}
                    className="text-center font-semibold text-lg bg-white/90 text-blue-900 border-blue-200 focus:border-blue-400"
                  />
                </div>
              </div>

              {/* Easy Questions */}
              <div className="space-y-2 p-6 rounded-xl border-2 border-green-300 bg-gradient-to-b from-green-50 via-green-100 to-green-200 text-green-900 shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                   style={{
                     textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                     boxShadow: '0 8px 25px rgba(34, 197, 94, 0.15), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.1)'
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
                      className="text-center bg-white/90 text-green-900 border-green-200 focus:border-green-400"
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
                      className="text-center bg-white/90 text-green-900 border-green-200 focus:border-green-400"
                    />
                  </div>
                  <Input
                    type="number"
                    placeholder="Time (seconds)"
                    value={config.easyTime}
                    onChange={(e) => handleInputChange('easyTime', parseInt(e.target.value) || 0)}
                    className="mt-3 text-center bg-white/90 text-green-900 border-green-200 focus:border-green-400"
                  />
                </div>
              </div>

              {/* Medium Questions */}
              <div className="space-y-2 p-6 rounded-xl border-2 border-orange-300 bg-gradient-to-b from-orange-50 via-orange-100 to-orange-200 text-orange-900 shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                   style={{
                     textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                     boxShadow: '0 8px 25px rgba(249, 115, 22, 0.15), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.1)'
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
                      className="text-center bg-white/90 text-orange-900 border-orange-200 focus:border-orange-400"
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
                      className="text-center bg-white/90 text-orange-900 border-orange-200 focus:border-orange-400"
                    />
                  </div>
                  <Input
                    type="number"
                    placeholder="Time (seconds)"
                    value={config.mediumTime}
                    onChange={(e) => handleInputChange('mediumTime', parseInt(e.target.value) || 0)}
                    className="mt-3 text-center bg-white/90 text-orange-900 border-orange-200 focus:border-orange-400"
                  />
                </div>
              </div>

              {/* Hard Questions */}
              <div className="space-y-2 p-6 rounded-xl border-2 border-red-300 bg-gradient-to-b from-red-50 via-red-100 to-red-200 text-red-900 shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                   style={{
                     textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                     boxShadow: '0 8px 25px rgba(239, 68, 68, 0.15), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.1)'
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
                      className="text-center bg-white/90 text-red-900 border-red-200 focus:border-red-400"
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
                      className="text-center bg-white/90 text-red-900 border-red-200 focus:border-red-400"
                    />
                  </div>
                  <Input
                    type="number"
                    placeholder="Time (seconds)"
                    value={config.hardTime}
                    onChange={(e) => handleInputChange('hardTime', parseInt(e.target.value) || 0)}
                    className="mt-3 text-center bg-white/90 text-red-900 border-red-200 focus:border-red-400"
                  />
                </div>
              </div>
            </div>

            {/* Smart Distribution */}
            <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl shadow-inner">
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
