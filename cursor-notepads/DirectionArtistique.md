Tout doit etre extremment créatif 

Je veux exactement cette direction artistique
La font que y'a dans le dossier public Naturaliy

Je veux 3 couleurs 
Blanc --> #FFFFFF
Noir --> #000000
Et la couleur accent principale du coup de l'app (dans le fichier config.ts) --> #x

Regarde la direction artistique global de mon autre site web principal et comprends la

'use client';

import React from 'react';
import { useEffect, useState, useRef } from 'react';
import Link from "next/link";
import localFont from 'next/font/local';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const naturalyFont = localFont({ src: '../public/Naturaly.otf' });

// Configuration des couleurs
const colors = {
  linktree: {
    primary: '#9723CC',
    light: '#9723CC',
    lighter: '#9723CC',
    lightest: '#9723CC',
    dark: '#9723CC',
    text: '#9723CC',
  },
  peach: {
    primary: '#F6A192',
    light: '#F6A192',
    lighter: '#F6A192',
    lightest: '#FFF5F3',
    dark: '#F6A192',
    text: '#F6A192',
  },
  guava: {
    primary: '#FD7565',
    light: '#FD7565',
    lighter: '#FD7565',
    lightest: '#FD7565',
    dark: '#FD7565',
    text: '#FD7565',
  },
  mango: {
    primary: '#FFC325',
    light: '#FFC325',
    lighter: '#FFC325',
    lightest: '#FFC325',
    dark: '#FFC325',
    text: '#FFC325',
  }
};

// Types
type Suite = {
  name: string;
  description: string;
};

type Suites = {
  [key: string]: Suite;
};

type App = {
  name: string;
  description: string;
  price: number;
  yearlyPrice: number;
  colorKey: string;
  suite: keyof Suites;
  link: string;
  screenshot: string;
};

// Configuration des apps
const suites: Suites = {
  fruits: {
    name: "Fruits Suite",
    description: "Sweet and juicy alternatives to your favorite tools"
  }
};

const apps: App[] = [
  {
    name: "GrapeLink",
    description: "Linktree Alternative",
    price: 4,
    yearlyPrice: 48,
    colorKey: "linktree",
    suite: "fruits",
    link: "/apps/grapelink",
    screenshot: "/grapelink2.png"
  },
  {
    name: "MangoForm",
    description: "Typeform Alternative",
    price: 15,
    yearlyPrice: 600,
    colorKey: "mango",
    suite: "fruits",
    link: "/apps/mangoform",
    screenshot: "/mangoform.png"
  },
  {
    name: "PeachCalendar",
    description: "Calendly Alternative",
    price: 12,
    yearlyPrice: 144,
    colorKey: "peach",
    suite: "fruits",
    link: "/apps/peachcalendar",
    screenshot: "/peachcalendar.png"
  },
  {
    name: "GuavaTeam",
    description: "Trello Alternative",
    price: 10,
    yearlyPrice: 120,
    colorKey: "guava",
    suite: "fruits",
    link: "/apps/guavateam",
    screenshot: "/guavateam.png"
  }
];

type AppVote = {
  id: string;
  name: string;
  votes: number;
};

export default function Page() {
  const [votes, setVotes] = useState<AppVote[]>([
    {
      id: '1',
      name: 'HelloSign Alternative',
      votes: 45
    },
    {
      id: '2',
      name: 'Bit.ly Alternative',
      votes: 34
    },
    {
      id: '3',
      name: 'Cardd Alternative',
      votes: 21
    }
  ]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [votedId, setVotedId] = useState<string | null>(null);

  // Initialiser votedId après le montage du composant
  useEffect(() => {
    setMounted(true);
    const savedVoteId = localStorage.getItem('votedId');
    if (savedVoteId) {
      setVotedId(savedVoteId);
    }
  }, []);

  // Fonction pour obtenir les styles de couleur
  const getColorStyle = (slug: string) => {
    const color = colors[slug as keyof typeof colors];
    return {
      gradient: `linear-gradient(135deg, ${color.light}33 0%, ${color.primary}22 50%, ${color.light}11 100%)`,
      text: color.text,
      textLight: `${color.dark}cc`,
      bg: `${color.lightest}`,
      bgLight: `${color.lightest}99`,
      border: color.lighter,
      darkBg: color.dark,
    };
  };

  const scrollToVote = () => {
    document.getElementById('vote-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetchVotes();
  }, []);

  async function fetchVotes() {
    // Ne rien faire, les votes sont en dur maintenant
  }

  async function handleVote(voteId: string) {    
    // Ne rien faire si on a déjà voté
    if (votedId) return;
    
    // Bloquer immédiatement les votes
    setVotedId(voteId);
    localStorage.setItem('votedId', voteId);
    
    try {
      // Insérer le vote dans la base de données
      const { error } = await supabase
        .from('votes')
        .insert([{ app_id: voteId }]);

      if (error) {
        console.error('Error inserting vote:', error);
        // En cas d'erreur, on ne reset pas le votedId pour éviter le spam
      }
    } catch (err) {
      console.error('Error:', err);
      // En cas d'erreur, on ne reset pas le votedId pour éviter le spam
    }
  }

  // Hook pour l'animation au scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      threshold: 0.1
    });

    // Observer tous les éléments avec data-scroll
    document.querySelectorAll('[data-scroll]').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  async function handleSuggestTool(e: React.FormEvent) {
    e.preventDefault();
    if (!suggestion.trim()) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.rpc('add_suggestion', {
        tool_name: suggestion.trim()
      });
      
      if (error) throw error;
      
      setSuggestion('');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error submitting suggestion:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleAppClick = async (appName: string) => {
    try {
      // Récupérer l'IP via une API externe
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const { ip } = await ipResponse.json();

      console.log('Tracking click for:', appName);
      const { data, error } = await supabase
        .from('app_clicks')
        .insert([{ 
          app_name: appName.toLowerCase(),
          ip_address: ip
        }])
        .select();

      if (error) {
        console.error('Error tracking click:', error);
      } else {
        console.log('Click tracked successfully:', data);
      }
    } catch (err) {
      console.error('Failed to track click:', err);
    }
  };

  return (
    <>
      <main className="bg-gradient-to-b from-white to-zinc-50 text-black min-h-screen">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)] pointer-events-none" />
        
        <section className="relative flex flex-col items-center justify-center text-center gap-12 px-8 py-24 max-w-6xl mx-auto">
          <div className="space-y-4">
            <h1 className={`${naturalyFont.className} text-7xl text-black animate-fade-in`}>
              F*ck Subscription
            </h1>
            <p className="text-sm tracking-widest uppercase text-zinc-500">No bloat. No monthly fees. Just what you need.</p>
          </div>

          <p className="text-xl text-zinc-600 max-w-2xl">
            Your favorite SaaS tools, stripped down to their essential features.
            <span className="block mt-2 text-zinc-400">One-time payment. Forever yours.</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {/* <div className="col-span-full mb-6 flex items-center gap-4 text-zinc-400 text-sm">
              <div className="h-[1px] flex-1 bg-zinc-200"></div>
              <span className="uppercase tracking-wider">{suites[apps[0].suite].name}</span>
              <div className="h-[1px] flex-1 bg-zinc-200"></div>
            </div> */}
            {apps.map((app) => {
              const color = colors[app.colorKey as keyof typeof colors];
              return (
                <Link 
                  key={app.colorKey}
                  href={app.link} 
                  onClick={() => handleAppClick(app.name)}
                  className="group relative h-[300px] overflow-hidden rounded-2xl bg-white transition-all hover:shadow-2xl border border-zinc-100"
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ 
                      background: `linear-gradient(135deg, ${color.light}33 0%, ${color.primary}22 50%, ${color.light}11 100%)`
                    }}
                  />
                  <div className="relative z-10 p-6">
                    <div className="flex items-start justify-between">
                      <div className="text-left">
                        <h3 
                          className="text-2xl font-bold transition-colors duration-300"
                          style={{ color: color.primary }}
                        >
                          {app.name}
                        </h3>
                        <p 
                          className="text-sm mt-1 text-black"
                        >
                          {app.description}
                        </p>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold">${app.price}</span>
                          <span className="text-sm text-zinc-400">once</span>
                        </div>
                        <div className="flex items-baseline gap-1 text-xs text-zinc-400">
                          <span className="line-through">${app.yearlyPrice}</span>
                          <span>/year</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-[200px] transition-transform duration-500 ease-out translate-y-8 group-hover:translate-y-0">
                    <div 
                      className="mx-auto w-[90%] h-full rounded-t-lg p-2 transition-colors duration-300"
                      style={{ 
                        backgroundColor: '#1f2937'
                      }}
                    >
                      <div className="w-full h-full bg-white rounded-md overflow-hidden relative">
                        <Image
                          src={app.screenshot}
                          alt={`${app.name} screenshot`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}

            <button 
              onClick={scrollToVote}
              className="group relative h-[300px] overflow-hidden rounded-2xl bg-gradient-to-br from-black to-zinc-900 text-white transition-all hover:shadow-2xl border border-zinc-800 hover:scale-[1.02]"
            >
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              <div className="relative h-full flex flex-col items-center justify-center p-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform mx-auto">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className={`${naturalyFont.className} text-2xl mb-2`}>Want something else?</h3>
                  <p className="text-zinc-400 text-sm">Help us choose the next tool</p>
                </div>
              </div>
            </button>
          </div>
        </section>

        <section className="relative py-32 bg-black text-white overflow-hidden">
          {/* Fond pointillé uniforme */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-transparent opacity-50" />
          </div>
          
          <div className="max-w-[100vw] mx-auto">
            {/* Stats avec grand impact */}
            <div className="relative py-24 overflow-hidden">
              <div className="max-w-7xl mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="relative">
                    <div className="space-y-2">
                      <p className={`${naturalyFont.className} text-[8vw] md:text-[5vw] bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50`}>
                        $300B+
                      </p>
                      <p className="text-zinc-500 tracking-wide">Spent yearly on SaaS</p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="space-y-2">
                      <p className={`${naturalyFont.className} text-[8vw] md:text-[5vw] bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50`}>
                        80%
                      </p>
                      <p className="text-zinc-500 tracking-wide">Features never used</p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="space-y-2">
                      <p className={`${naturalyFont.className} text-[8vw] md:text-[5vw] bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50`}>
                        ∞
                      </p>
                      <p className="text-zinc-500 tracking-wide">Subscription fatigue</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Message central avec animation */}
            <div className="relative py-12">
              <div className="max-w-[90vw] mx-auto px-8">
                <div className="flex flex-col items-center">
                  <p className={`${naturalyFont.className} text-[12vw] md:text-[8vw] leading-none text-center text-white opacity-20`}>
                    subscriptions
                  </p>
                  <p className={`${naturalyFont.className} text-[12vw] md:text-[8vw] leading-none text-center text-white opacity-40`}>
                    subscriptions
                  </p>
                  <p className={`${naturalyFont.className} text-[12vw] md:text-[8vw] leading-none text-center text-white`}>
                    no more.
                  </p>

                  <div className="mt-12 flex flex-col items-center gap-8">
                    <p className="text-xl text-zinc-400 max-w-xl text-center">
                      Tired of bloated software?<br />
                      We&apos;re building simple alternatives.
                    </p>
                    <Link 
                      href="#tools"
                      className="group relative px-8 py-4 bg-white text-black rounded-xl text-lg font-medium hover:scale-[1.02] transition-all"
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(#00000015_1px,transparent_1px)] [background-size:16px_16px] opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                      <span className="relative">Our tools →</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modal pour suggérer un outil */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-black border border-white/10 rounded-2xl p-8 max-w-md w-full relative">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-white/60 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h3 className={`${naturalyFont.className} text-2xl text-white mb-2`}>Suggest a tool</h3>
              <p className="text-zinc-400 mb-6">What SaaS tool would you like to see simplified?</p>

              <form onSubmit={handleSuggestTool} className="space-y-4">
                <input
                  type="text"
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  placeholder="Ex: Notion, Mailchimp, etc."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/20"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black rounded-xl px-4 py-3 font-medium hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit suggestion'}
                </button>
              </form>
            </div>
          </div>
        )}

        <section id="vote-section" className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-black">
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>
          
          <div className="relative max-w-4xl mx-auto px-8">
            <div className="text-center mb-12">
              <h2 className={`${naturalyFont.className} text-5xl text-white mb-4`}>Vote for the next tool</h2>
              <p className="text-zinc-400">Click on the tool you want us to build next</p>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
              {votes.map((vote) => {
                const isVoted = mounted && votedId === vote.id;
                
                return (
                  <button 
                    key={vote.id}
                    onClick={() => handleVote(vote.id)}
                    className={`w-full group relative ${
                      isVoted ? 'bg-white/20' : 'bg-white/5 hover:bg-white/10'
                    } rounded-xl p-5 text-left transition-all`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg text-white">
                          {vote.name}
                        </span>
                        {isVoted && (
                          <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">
                            Voted
                          </span>
                        )}
                      </div>
                      <span className="text-white/60 bg-white/10 px-3 py-1 rounded-full">
                        {vote.votes}%
                      </span>
                    </div>

                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`${isVoted ? 'bg-white' : 'bg-white/60'} h-full transition-all duration-500`}
                        style={{ width: `${vote.votes}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="text-white/60 hover:text-white text-sm border border-white/10 rounded-full px-4 py-2 hover:bg-white/5 transition-all"
              >
                + Suggest a tool
              </button>
            </div>
          </div>
          </section>
        </main>
        <a 
          href="https://www.producthunt.com/posts/f-cksubscription?embed=true&utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-f&#0045;cksubscription" 
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 z-50 hover:opacity-90 transition-all hover:scale-105 transform hover:-translate-y-1"
        >
          <img 
            src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=790477&theme=neutral&period=daily&t=1737393084766" 
            alt="F*ckSubscription - Simple, one-time payment alternatives to popular SaaS tools. | Product Hunt" 
            style={{ width: '200px', height: '43px' }} 
            width="200" 
            height="43" 
          />
        </a>
      </>
    );
  }


'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';
import localFont from 'next/font/local';
import { getRemainingDays } from '@/config/launch-dates';
import LinkedInTracker from '../../components/LinkedInTracker';

const naturalyFont = localFont({ src: '../../../public/Naturaly.otf' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function MangoFormLanding() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [daysToLaunch, setDaysToLaunch] = useState<number | null>(null);
  const [loadingDays, setLoadingDays] = useState(true);

  useEffect(() => {
    async function fetchDays() {
      try {
        const days = await getRemainingDays('mangoform');
        setDaysToLaunch(days);
        setLoadingDays(false);
      } catch (err) {
        console.error('Failed to fetch days:', err);
        setLoadingDays(false);
      }
    }
    fetchDays();

    const interval = setInterval(fetchDays, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loadingDays || daysToLaunch === null) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('early_access')
        .insert([{ email, app: 'mangoform' }]);

      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-y-auto flex items-center py-8">
      {/* Background pattern */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-transparent opacity-50" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 relative z-10">
            <div>
              <h1 className={`${naturalyFont.className} text-4xl md:text-6xl mb-3 leading-tight`}>
                <span className="text-[#FFC325]">Tired of complex</span><br />
                form builders?
              </h1>
              <p className="text-zinc-300 text-lg">
                Hey! I&apos;m <LinkedInTracker appName="mangoform"><a href="https://www.linkedin.com/in/martinbonan/" target="_blank" rel="noopener noreferrer" className="text-[#FFC325] hover:underline">Martin</a></LinkedInTracker>, a 19yo developer who&apos;s done with overpriced form builders.
                I&apos;m building a rebellion against bloated SaaS, and this is our strike against complex survey tools.
                Join hundreds of others who&apos;ve already ditched their subscriptions. Let&apos;s make forms simple again. 🥭
              </p>
            </div>

            {!submitted ? (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl md:text-3xl font-bold text-[#FFC325]">$15</span>
                  <span className="text-zinc-400">lifetime access</span>
                  <span className="text-sm text-zinc-500 ml-2 line-through">$600/year on Typeform</span>
                </div>

                <div className="bg-[#FFC325]/10 rounded-lg p-3 mb-4">
                  <p className="text-sm text-zinc-200">
                    🚀 <span className="text-white font-medium">Early Access Offer:</span> Get lifetime access for <span className="text-white font-medium">$7</span> when we launch in {daysToLaunch} days
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFC325]/50"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-[#FFC325] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#FFC325]/90 transition-colors whitespace-nowrap"
                    >
                      Get Early Access
                    </button>
                  </div>
                  <p className="text-[10px] text-zinc-500 text-center">No spam, just your early access link when we launch.</p>
                  {error && <p className="text-red-500 text-xs">{error}</p>}
                </form>
              </div>
            ) : (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
                <div className="w-12 h-12 bg-[#FFC325]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-[#FFC325]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">You&apos;re in!</h3>
                <p className="text-zinc-400 text-sm">
                  We&apos;ll send you the early access link in {daysToLaunch} days.
                </p>
              </div>
            )}
          </div>

          <div className="relative md:h-full flex items-center order-first md:order-last mb-4 md:mb-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:hidden" />
            <div className="bg-[#1f2937] rounded-xl p-2 rotate-1 transform hover:rotate-0 transition-transform duration-500">
              <div className="bg-white rounded-lg overflow-hidden">
                <Image
                  src="/mangoform.png"
                  alt="MangoForm Screenshot"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
