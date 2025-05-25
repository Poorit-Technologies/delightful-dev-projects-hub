
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Settings, FileText, Plus } from 'lucide-react';

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Test Configuration Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Create, manage, and deploy custom test configurations with ease
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg mb-4 mx-auto">
              <Plus className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
              Create Test
            </h3>
            <p className="text-gray-600 text-center mb-4">
              Build new test configurations with custom parameters and categories
            </p>
            <Link to="/test">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Create New Test
              </Button>
            </Link>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-lg mb-4 mx-auto">
              <FileText className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
              My Configurations
            </h3>
            <p className="text-gray-600 text-center mb-4">
              View and manage all your saved test configurations
            </p>
            <Link to="/my-configurations">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                View Configurations
              </Button>
            </Link>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-lg mb-4 mx-auto">
              <Settings className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
              Settings
            </h3>
            <p className="text-gray-600 text-center mb-4">
              Customize your account settings and preferences
            </p>
            <Button variant="outline" className="w-full" disabled>
              Coming Soon
            </Button>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/20">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Welcome back, {user.user_metadata?.full_name || user.email?.split('@')[0]}!
          </h2>
          <p className="text-gray-600 mb-6">
            Ready to create your next test configuration? Start by clicking the "Create New Test" button above, 
            or explore your existing configurations to make modifications.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/test">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Quick Start
              </Button>
            </Link>
            <Link to="/my-configurations">
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                My Configurations
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
