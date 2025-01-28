'use client';

import React from 'react';
import { useState } from 'react';
import Image from 'next/image'
import ButtonSignin from '@/components/ButtonSignin'
import { getClient } from '@/libs/supabase/client'

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const supabase = getClient();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/onboarding`
        }
      });

      if (error) throw error;
      setIsSent(true);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="mb-8">
        <Image src="/icon.png" alt="LimeNote Logo" width={40} height={40} className="rounded-xl" />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-2">Think it. Make it.</h1>
        <p className="text-gray-600 mb-8">Create your LimeNote account</p>

        {/* Sign in Options */}
        <div className="space-y-3">
          <ButtonSignin provider="google" text="Continue with Google" />
          <ButtonSignin provider="apple" text="Continue with Apple" />
          <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
            <span>Log in with passkey</span>
          </button>
          <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
            <span>Single sign-on (SSO)</span>
          </button>
        </div>

        {/* Email Input */}
        <form onSubmit={handleEmailSignIn} className="mt-8">
          {!isSent ? (
            <>
              <div className="text-left text-sm text-gray-600 mb-2">Work email</div>
              <input
                type="email"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                required
              />
              <p className="text-xs text-gray-500 text-left mb-4">
                Use an organization email to easily collaborate with teammates
              </p>
              <button 
                type="submit"
                disabled={isLoading}
                className={`w-full bg-[#32CD32] text-white rounded-lg py-2 hover:opacity-90 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Sending...
                  </span>
                ) : (
                  'Continue'
                )}
              </button>
            </>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
              <h3 className="text-green-800 font-medium mb-1">Check your inbox</h3>
              <p className="text-green-700 text-sm">
                We&apos;ve sent a magic link to <strong>{email}</strong>. Click the link to complete your signup.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
} 