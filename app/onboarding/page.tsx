import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create a profile - LimeNote',
}

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#191919]">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">Create a profile</h1>
          <p className="text-gray-400">This is how you'll appear in LimeNote</p>
        </div>

        {/* Profile Form */}
        <div className="space-y-6">
          {/* Photo Upload */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center mb-2 cursor-pointer hover:bg-gray-700 transition-colors">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <button className="text-sm text-blue-500 hover:text-blue-400">
              Add a photo
            </button>
          </div>

          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm text-gray-400 mb-2">
              Enter your name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm text-gray-400 mb-2">
              Set a password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Marketing Consent */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="marketing"
              className="w-4 h-4 border-gray-700 rounded bg-gray-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
            />
            <label htmlFor="marketing" className="ml-2 text-sm text-gray-400">
              I agree to LimeNote marketing communications
            </label>
          </div>

          {/* Continue Button */}
          <button className="w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition-colors">
            Continue
          </button>
        </div>
      </div>
    </div>
  )
} 