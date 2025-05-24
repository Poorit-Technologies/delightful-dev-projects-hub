
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, BarChart3, CheckCircle } from 'lucide-react';
import { TestConfig } from './TestConfigurationApp';

interface ConfigurationSummaryProps {
  config: TestConfig;
}

const ConfigurationSummary = ({ config }: ConfigurationSummaryProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const totalTime = (config.easyQuestions * config.easyTime) + (config.mediumQuestions * config.mediumTime) + (config.hardQuestions * config.hardTime);
  const totalMarks = (config.easyQuestions * config.easyMarks) + (config.mediumQuestions * config.mediumMarks) + (config.hardQuestions * config.hardMarks);

  return (
    <Card className="overflow-hidden backdrop-blur-sm bg-white/80 border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full group">
          <div className={`flex items-center justify-between p-6 transition-all duration-500 ${
            isOpen 
              ? 'bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50' 
              : 'bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 hover:from-emerald-100 hover:via-blue-100 hover:to-purple-100'
          } border-l-4 border-l-emerald-400`}>
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl transition-all duration-500 ${
                isOpen 
                  ? 'bg-purple-100 text-purple-600 scale-110' 
                  : 'bg-emerald-100 text-emerald-600 group-hover:scale-110'
              }`}>
                <BarChart3 className="h-6 w-6" />
              </div>
              <div className="text-left">
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                  📊 Current Configuration Summary
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {isOpen 
                    ? `Detailed breakdown of your test configuration`
                    : `${config.totalQuestions} questions • ${Math.round(totalTime/60)} min • ${totalMarks} marks`
                  }
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
              <div className={`transition-all duration-300 ${
                isOpen ? 'rotate-180' : 'rotate-0'
              }`}>
                <ChevronDown className="h-5 w-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
              </div>
            </div>
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="animate-accordion-down">
          <div className="p-6 bg-gradient-to-br from-white via-gray-50 to-blue-50">
            {/* Total Questions Display */}
            <div className="mb-6 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="text-center">
                  <div className="text-2xl font-bold">{config.totalQuestions}</div>
                  <div className="text-xs opacity-90">Total</div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mt-3">Total Questions</h3>
            </div>

            {/* Difficulty Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {/* Easy Questions */}
              <div className="space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
                  <div className="text-center">
                    <div className="text-xl font-bold">{config.easyQuestions}</div>
                    <div className="text-xs opacity-90">Easy</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-green-50/80 p-3 rounded-xl border border-green-100">
                    <div className="text-lg font-semibold text-green-700">{config.easyTime}s</div>
                    <div className="text-xs text-green-600">Time per question</div>
                  </div>
                  <div className="bg-green-50/80 p-3 rounded-xl border border-green-100">
                    <div className="text-lg font-semibold text-green-700">{config.easyMarks}</div>
                    <div className="text-xs text-green-600">Marks per question</div>
                  </div>
                </div>
              </div>
              
              {/* Medium Questions */}
              <div className="space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
                  <div className="text-center">
                    <div className="text-xl font-bold">{config.mediumQuestions}</div>
                    <div className="text-xs opacity-90">Medium</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-orange-50/80 p-3 rounded-xl border border-orange-100">
                    <div className="text-lg font-semibold text-orange-700">{config.mediumTime}s</div>
                    <div className="text-xs text-orange-600">Time per question</div>
                  </div>
                  <div className="bg-orange-50/80 p-3 rounded-xl border border-orange-100">
                    <div className="text-lg font-semibold text-orange-700">{config.mediumMarks}</div>
                    <div className="text-xs text-orange-600">Marks per question</div>
                  </div>
                </div>
              </div>
              
              {/* Hard Questions */}
              <div className="space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
                  <div className="text-center">
                    <div className="text-xl font-bold">{config.hardQuestions}</div>
                    <div className="text-xs opacity-90">Hard</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-red-50/80 p-3 rounded-xl border border-red-100">
                    <div className="text-lg font-semibold text-red-700">{config.hardTime}s</div>
                    <div className="text-xs text-red-600">Time per question</div>
                  </div>
                  <div className="bg-red-50/80 p-3 rounded-xl border border-red-100">
                    <div className="text-lg font-semibold text-red-700">{config.hardMarks}</div>
                    <div className="text-xs text-red-600">Marks per question</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                <div className="text-2xl font-bold text-blue-700">{Math.round(totalTime/60)} min</div>
                <div className="text-sm text-blue-600">Total Duration</div>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                <div className="text-2xl font-bold text-purple-700">{totalMarks}</div>
                <div className="text-sm text-purple-600">Total Marks</div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default ConfigurationSummary;
