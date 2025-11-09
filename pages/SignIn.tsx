
import React from 'react';
import { View, UserType } from '../types';
import { Mail, Lock, LogIn } from 'lucide-react';

// Simplified SocialButton component for cleaner code
const SocialButton: React.FC<{ provider: 'Google' | 'Apple' | 'Facebook', icon: React.ReactNode }> = ({ provider, icon }) => (
    <button className="flex-1 flex items-center justify-center py-3 px-4 border border-brand-gray-300 rounded-lg hover:bg-brand-gray-100 transition-colors">
        {icon}
        <span className="sr-only">Sign in with {provider}</span>
    </button>
);

const SignIn: React.FC<{ navigate: (view: View) => void; onLogin: (userType: UserType) => void; }> = ({ navigate, onLogin }) => {
  return (
    <div className="min-h-screen bg-brand-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-2xl border border-brand-gray-200">
        <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
                <svg className="w-12 h-12 text-brand-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                </svg>
            </div>
            <h1 className="text-3xl font-bold text-brand-gray-900">Welcome Back</h1>
            <p className="text-brand-gray-600 mt-2">Sign in to the Ministry Portal.</p>
        </div>
        
        {/* Social Logins */}
        <div className="flex items-center space-x-3 mb-6">
            <SocialButton provider="Google" icon={<svg className="w-6 h-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>} />
            <SocialButton provider="Apple" icon={<svg className="w-6 h-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.048-3.804 1.236-4.824 3.12-1.284 2.388-.336 5.928 1.128 7.848.756.972 1.62 2.064 2.808 2.04 1.176-.024 1.512-.768 2.856-.768.336 0 1.68.768 2.856.768 1.224.024 2.088-1.092 2.844-2.064 1.488-1.884 2.388-4.92 1.128-7.836-1.02-1.86-2.76-3.072-4.752-3.12-.528-.012-1.284.024-1.944.024zm-1.92 10.68c-.912.024-1.8-1.056-2.52-2.016-1.464-1.944-2.064-4.44-1.128-6.336.984-1.776 2.64-2.664 4.224-2.712.552-.024 1.128.012 1.68.012.12 0 .24-.012.36-.012.48 0 1.08.012 1.56.012 1.584 0 3.12.936 4.056 2.664-1.992 1.176-3.432 3.624-3.072 5.832.864 2.52 3.12 3.48 3.36 3.528.024.012-.024-.012-1.92-1.152-.384-.204-.792-.312-1.2-.312-1.296 0-2.256.84-3.144.84-.96 0-1.824-.84-3.12-.84z" fill="currentColor"/></svg>} />
            <SocialButton provider="Facebook" icon={<svg className="w-6 h-6 text-[#1877F2]" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" fill="currentColor"/></svg>} />
        </div>

        <div className="my-6 flex items-center">
            <hr className="w-full border-brand-gray-200" />
            <span className="px-3 text-xs text-brand-gray-500 whitespace-nowrap">or continue with</span>
            <hr className="w-full border-brand-gray-200" />
        </div>

        <form onSubmit={(e) => {e.preventDefault(); onLogin('citizen');}} className="space-y-4">
            <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray-400" />
                <input type="email" placeholder="Email Address" defaultValue="citizen@example.com" className="w-full border border-brand-gray-300 rounded-lg pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 outline-none" />
            </div>
             <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray-400" />
                <input type="password" placeholder="Password" defaultValue="••••••••" className="w-full border border-brand-gray-300 rounded-lg pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 outline-none" />
            </div>
             <div className="flex justify-between items-center text-sm">
                <label className="flex items-center space-x-2"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-blue-600 focus:ring-brand-blue-500" /><span>Remember me</span></label>
                <a href="#" className="font-medium text-brand-blue-700 hover:underline">Forgot password?</a>
            </div>
            <button type="submit" className="w-full bg-brand-blue-700 text-white rounded-lg py-3 text-sm font-semibold hover:bg-brand-blue-800 flex items-center justify-center space-x-2">
                <LogIn className="w-5 h-5" />
                <span>Sign In</span>
            </button>
        </form>
        
        <div className="mt-6 text-center text-sm">
            <p className="text-brand-gray-600">
                Don't have an account?{' '}
                <button onClick={() => navigate('signup')} className="font-semibold text-brand-blue-700 hover:underline">Register now</button>
            </p>
        </div>
        
        <div className="mt-8 pt-6 border-t border-brand-gray-200 text-center text-sm">
            <p className="text-brand-gray-500 mb-3">For demo purposes:</p>
            <div className="flex justify-center items-center space-x-4">
                <button 
                    type="button" 
                    onClick={() => onLogin('citizen')}
                    className="font-semibold text-brand-gray-700 hover:text-brand-blue-700 hover:underline transition-colors"
                >
                    Login as Public User
                </button>
                <span className="text-brand-gray-300">|</span>
                <button 
                    type="button" 
                    onClick={() => onLogin('staff')}
                    className="font-semibold text-brand-gray-700 hover:text-brand-blue-700 hover:underline transition-colors"
                >
                    Login as Staff
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;