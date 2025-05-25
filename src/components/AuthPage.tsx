
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const { user, signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-3 border-slate-300 border-t-blue-600"></div>
          <p className="text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-white shadow-2xl border-0 rounded-2xl overflow-hidden">
          <div className="p-8 space-y-8">
            {/* Logo and Company Branding */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-3xl font-bold">P</span>
                </div>
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-slate-900">
                  P<span className="text-blue-600">@</span>ORIT
                </h1>
                <p className="text-slate-600 font-semibold italic tracking-wide">
                  Technologies
                </p>
              </div>
            </div>
            
            {/* Welcome Message */}
            <div className="text-center space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">
                Welcome Back
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Sign in to your account to continue to your dashboard and manage your projects.
              </p>
            </div>
            
            {/* Google Sign In Button */}
            <div className="space-y-6">
              <Button 
                onClick={signInWithGoogle}
                className="w-full bg-white hover:bg-gray-50 text-slate-700 border-2 border-gray-200 hover:border-gray-300 py-4 px-6 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 ease-in-out group"
                disabled={loading}
              >
                <div className="flex items-center justify-center space-x-3">
                  <svg className="w-6 h-6 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-lg">Continue with Google</span>
                </div>
              </Button>
              
              {/* Footer Text */}
              <div className="text-center">
                <p className="text-sm text-slate-500">
                  By signing in, you agree to our{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Additional Help Text */}
        <div className="text-center mt-6">
          <p className="text-slate-600 text-sm">
            Need help?{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
