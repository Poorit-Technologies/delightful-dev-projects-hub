
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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50"></div>
      
      <div className="relative z-10">
        <Card className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg">
          <div className="text-center space-y-6">
            {/* Logo and Company Name */}
            <div className="space-y-3">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">P</span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  P<span className="text-blue-500">@</span>ORIT
                </h1>
                <p className="text-gray-600 font-medium italic">Technologies</p>
              </div>
            </div>
            
            {/* Google Sign In Button */}
            <div className="space-y-4">
              <Button 
                onClick={signInWithGoogle}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium shadow-md transition-colors duration-200"
                disabled={loading}
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#ffffff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#ffffff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#ffffff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#ffffff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in as Somendra
              </Button>
              
              {/* OR Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">OR</span>
                </div>
              </div>
              
              {/* Login Button */}
              <Button 
                onClick={signInWithGoogle}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium shadow-md transition-colors duration-200"
                disabled={loading}
              >
                Login
              </Button>
              
              {/* Sign Up Link */}
              <div className="text-center">
                <button
                  onClick={signInWithGoogle}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
                  disabled={loading}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
