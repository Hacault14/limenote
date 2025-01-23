'use client';

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { createClient } from "@/libs/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tables } from "@/types/database";
import { User } from '@supabase/supabase-js';

export default function SettingsPage() {
  const [userSettings, setUserSettings] = useState<Tables<'user_settings'> | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      try {
        // Check if user is authenticated
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          router.push("/signin");
          return;
        }

        setUser(user);

        // Fetch user settings
        const { data: settings } = await supabase
          .from("user_settings")
          .select("*")
          .eq("user_id", user.id)
          .single();

        setUserSettings(settings);
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-zinc-500 dark:text-zinc-400">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">
            Settings
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Manage your account and preferences
          </p>
        </div>

        {/* Settings sections */}
        <div className="space-y-12">
          {/* Profile section */}
          <div className="bg-white dark:bg-zinc-800 shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-white">
                Profile
              </h3>
              <div className="mt-2 max-w-xl text-sm text-zinc-500 dark:text-zinc-400">
                <p>Update your personal information.</p>
              </div>
              <div className="mt-5">
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        disabled
                        value={user?.email || ''}
                        className="shadow-sm focus:ring-lime-500 focus:border-lime-500 block w-full sm:text-sm border-zinc-300 dark:border-zinc-700 rounded-md bg-zinc-100 dark:bg-zinc-900"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Theme section */}
          <div className="bg-white dark:bg-zinc-800 shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-white">
                Theme
              </h3>
              <div className="mt-2 max-w-xl text-sm text-zinc-500 dark:text-zinc-400">
                <p>Choose your preferred theme.</p>
              </div>
              <div className="mt-5">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="theme-light"
                      name="theme"
                      type="radio"
                      defaultChecked={userSettings?.theme === "light"}
                      className="focus:ring-lime-500 h-4 w-4 text-lime-600 border-zinc-300 dark:border-zinc-700"
                    />
                    <label
                      htmlFor="theme-light"
                      className="ml-3 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      Light
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="theme-dark"
                      name="theme"
                      type="radio"
                      defaultChecked={userSettings?.theme === "dark"}
                      className="focus:ring-lime-500 h-4 w-4 text-lime-600 border-zinc-300 dark:border-zinc-700"
                    />
                    <label
                      htmlFor="theme-dark"
                      className="ml-3 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      Dark
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications section */}
          <div className="bg-white dark:bg-zinc-800 shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-white">
                Notifications
              </h3>
              <div className="mt-2 max-w-xl text-sm text-zinc-500 dark:text-zinc-400">
                <p>Manage your notification preferences.</p>
              </div>
              <div className="mt-5">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="email-notifications"
                        name="email-notifications"
                        type="checkbox"
                        defaultChecked={userSettings?.notification_preferences?.email}
                        className="focus:ring-lime-500 h-4 w-4 text-lime-600 border-zinc-300 dark:border-zinc-700 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="email-notifications"
                        className="font-medium text-zinc-700 dark:text-zinc-300"
                      >
                        Email notifications
                      </label>
                      <p className="text-zinc-500 dark:text-zinc-400">
                        Receive email notifications when someone shares a page with you.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Danger zone */}
          <div className="bg-red-50 dark:bg-red-900/20 shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-red-800 dark:text-red-200">
                Danger Zone
              </h3>
              <div className="mt-2 max-w-xl text-sm text-red-700 dark:text-red-300">
                <p>
                  Once you delete your account, it cannot be undone. Please be certain.
                </p>
              </div>
              <div className="mt-5">
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 dark:text-red-200 bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                >
                  Delete account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 