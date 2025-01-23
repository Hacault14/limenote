/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { createClient } from "@/libs/supabase/client";
import config from "@/config";

interface ButtonSigninProps {
  provider?: 'google' | 'apple';
  text?: string;
  extraStyle?: string;
}

// A simple button to sign in with our providers (Google & Magic Links).
// It automatically redirects user to callbackUrl (config.auth.callbackUrl) after login, which is normally a private page for users to manage their accounts.
// If the user is already logged in, it will show their profile picture & redirect them to callbackUrl immediately.
export default function ButtonSignin({ provider, text, extraStyle }: ButtonSigninProps) {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      if (provider === 'google') {
        await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}${config.auth.callbackUrl}`
          }
        });
      } else if (provider === 'apple') {
        await supabase.auth.signInWithOAuth({
          provider: 'apple',
          options: {
            redirectTo: `${window.location.origin}${config.auth.callbackUrl}`
          }
        });
      }
    } catch (error) {
      console.error('Error signing in:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      disabled={isLoading}
      className={`w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 ${extraStyle || ''} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isLoading ? (
        <span className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mr-2" />
      ) : (
        <>
          {provider === 'google' && (
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          )}
          {provider === 'apple' && (
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M17.05 20.28c-.98.95-2.05.88-3.08.38-1.09-.52-2.08-.53-3.2 0-1.39.68-2.12.57-3.02-.38C3.33 15.85 4.18 8.22 9 7.87c1.18.07 2.03.51 2.78.51.73 0 2.07-.58 3.5-.5 1.46.11 2.23.53 3.03 1.4-2.67 1.59-2.24 5.13.74 6.08-.74 1.87-1.68 3.72-3 4.92M12.9 7.72c-.17-2.6 2.15-4.72 4.1-4.72.26 2.4-2.24 4.66-4.1 4.72"
              />
            </svg>
          )}
          <span>{text}</span>
        </>
      )}
    </button>
  );
}
