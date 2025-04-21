import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const signupSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Confirm password is required" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

function AuthForm({ onLogin, onSignup, onForgotPassword }) {
  const [mode, setMode] = useState('login'); // 'login', 'signup', 'forgotPassword'
  
  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const signupForm = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  });

  const forgotPasswordForm = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    }
  });

  const handleLogin = (data) => {
    if (onLogin) {
      onLogin(data);
    }
  };

  const handleSignup = (data) => {
    if (onSignup) {
      onSignup(data);
    }
  };

  const handleForgotPassword = (data) => {
    if (onForgotPassword) {
      onForgotPassword(data);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-gray-800">
          {mode === 'login' ? 'Login' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {mode === 'login' && (
          <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                {...loginForm.register('email')}
                type="email"
                className={`w-full border rounded-lg px-3 py-2 ${loginForm.formState.errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter your email"
              />
              {loginForm.formState.errors.email && (
                <p className="text-red-500 text-xs mt-1">{loginForm.formState.errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                {...loginForm.register('password')}
                type="password"
                className={`w-full border rounded-lg px-3 py-2 ${loginForm.formState.errors.password ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter your password"
              />
              {loginForm.formState.errors.password && (
                <p className="text-red-500 text-xs mt-1">{loginForm.formState.errors.password.message}</p>
              )}
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setMode('forgotPassword')}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Forgot password?
              </button>
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Login
            </Button>
            
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Sign up
                </button>
              </p>
            </div>
          </form>
        )}
        
        {mode === 'signup' && (
          <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                {...signupForm.register('name')}
                type="text"
                className={`w-full border rounded-lg px-3 py-2 ${signupForm.formState.errors.name ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter your name"
              />
              {signupForm.formState.errors.name && (
                <p className="text-red-500 text-xs mt-1">{signupForm.formState.errors.name.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                {...signupForm.register('email')}
                type="email"
                className={`w-full border rounded-lg px-3 py-2 ${signupForm.formState.errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter your email"
              />
              {signupForm.formState.errors.email && (
                <p className="text-red-500 text-xs mt-1">{signupForm.formState.errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                {...signupForm.register('password')}
                type="password"
                className={`w-full border rounded-lg px-3 py-2 ${signupForm.formState.errors.password ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Create a password"
              />
              {signupForm.formState.errors.password && (
                <p className="text-red-500 text-xs mt-1">{signupForm.formState.errors.password.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                {...signupForm.register('confirmPassword')}
                type="password"
                className={`w-full border rounded-lg px-3 py-2 ${signupForm.formState.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Confirm your password"
              />
              {signupForm.formState.errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{signupForm.formState.errors.confirmPassword.message}</p>
              )}
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Create Account
            </Button>
            
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Login
                </button>
              </p>
            </div>
          </form>
        )}
        
        {mode === 'forgotPassword' && (
          <form onSubmit={forgotPasswordForm.handleSubmit(handleForgotPassword)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                {...forgotPasswordForm.register('email')}
                type="email"
                className={`w-full border rounded-lg px-3 py-2 ${forgotPasswordForm.formState.errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter your email"
              />
              {forgotPasswordForm.formState.errors.email && (
                <p className="text-red-500 text-xs mt-1">{forgotPasswordForm.formState.errors.email.message}</p>
              )}
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Reset Password
            </Button>
            
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Back to Login
                </button>
              </p>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

export default AuthForm;
