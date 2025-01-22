"use client";

import Link from "next/link";
import localFont from 'next/font/local';

const naturalyFont = localFont({ src: '../public/Naturaly.otf' });

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Fond pointillé */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-transparent opacity-50" />
      </div>

      <div className="relative h-screen flex flex-col items-center justify-center px-4">
        {/* Message d'erreur */}
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <p className={`${naturalyFont.className} text-[20vw] md:text-[15vw] leading-none text-white opacity-20`}>
              error
            </p>
            <p className={`${naturalyFont.className} text-[8vw] md:text-[5vw] leading-none text-white`}>
              something went wrong.
            </p>
          </div>

          {/* Message d'erreur spécifique */}
          <p className="text-red-500 max-w-md mx-auto">
            {error.message || "An unexpected error occurred"}
          </p>

          {/* Boutons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={reset}
              className="group relative px-6 py-3 bg-white text-black rounded-xl text-sm font-medium hover:scale-[1.02] transition-all"
            >
              <div className="absolute inset-0 bg-[radial-gradient(#00000015_1px,transparent_1px)] [background-size:16px_16px] opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              <span className="relative">Try again</span>
            </button>

            <Link
              href="/"
              className="group relative px-6 py-3 bg-white/10 text-white rounded-xl text-sm font-medium hover:bg-white/20 transition-all"
            >
              <span className="relative">Return home</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
