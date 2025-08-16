"use client";

import React, { useState, useEffect } from 'react';
import { Copy, Check, Settings, User, Sparkles, ChevronDown, Menu, X, Zap, Target, Globe, TrendingUp } from 'lucide-react';

const ToneFixer = () => {
  const [text, setText] = useState('');
  const [profession, setProfession] = useState('');
  const [tone, setTone] = useState('');
  const [customProfession, setCustomProfession] = useState('');
  const [customTone, setCustomTone] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Animation trigger
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const professions = [
    "Software Engineer",
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "UX/UI Designer",
        "Product Manager",
        "Data Scientist",
        "Data Analyst",
        "Teacher / Educator",
        "Professor / Lecturer",
        "Doctor",
        "Nurse",
        "Pharmacist",
        "Dentist",
        "Surgeon",
        "Psychologist",
        "Therapist / Counselor",
        "Scientist / Researcher",
        "Lab Technician",
        "Engineer (Mechanical, Civil, Electrical)",
        "Architect",
        "Construction Worker",
        "Electrician",
        "Plumber",
        "Carpenter",
        "Chef / Cook",
        "Baker",
        "Artist / Painter",
        "Musician / Composer",
        "Actor / Performer",
        "Writer / Author / Editor",
        "Journalist / Reporter",
        "Photographer",
        "Graphic Designer",
        "Marketing Specialist",
        "Sales Executive",
        "Customer Support",
        "HR Specialist",
        "Consultant",
        "Manager / Team Lead",
        "Project Manager",
        "Business Analyst",
        "Entrepreneur / Startup Founder",
        "Lawyer / Legal Advisor",
        "Judge",
        "Police Officer",
        "Firefighter",
        "Paramedic",
        "Social Worker",
        "Coach / Mentor",
        "Student",
        "Freelancer / Gig Worker",
        "Logistics Manager",
        "Event Planner",
        "Healthcare Administrator",
        "Other"
  ];

  const tones = [
    "Friendly",
        "Professional",
        "Formal",
        "Casual",
        "Persuasive",
        "Humorous",
        "Inspirational",
        "Motivational",
        "Confident",
        "Polite",
        "Empathetic",
        "Compassionate",
        "Encouraging",
        "Concise",
        "Direct",
        "Technical",
        "Optimistic",
        "Positive",
        "Urgent",
        "Action-Oriented",
        "Respectful",
        "Authoritative",
        "Sincere",
        "Warm",
        "Energetic",
        "Cheerful",
        "Calm",
        "Reassuring",
        "Professional yet Friendly",
        "Formal yet Approachable",
        "Other"
  ];

  const handleFixTone = async () => {
    if (!text.trim()) return;
    
    setIsLoading(true);
    console.log(profession);
    console.log(tone);
    try {
          const response = await fetch("/api/fix-tone", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              text,
              profession: profession === "Other" ? customProfession : profession,
              tone: tone === "Other" ? customTone : tone
            }),
          });

          const data = await response.json();

          if (data.result) {
            setOutputText(data.result);
          } else {
            setOutputText("⚠️ No response from AI");
          }
        } catch (error) {
          console.error('Error:', error);
          setOutputText("⚠️ Error calling API");
        } finally {
          setIsLoading(false);
        }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const charCount = text.length;
  const isDisabled = !text.trim() || isLoading;

  const features = [
    { icon: Zap, title: "Instant Results", desc: "AI-powered tone transformation in seconds" },
    { icon: Target, title: "Precision Tuning", desc: "Perfect tone for every professional context" },
    { icon: Globe, title: "Universal Appeal", desc: "Works across industries and cultures" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-300/10 to-cyan-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Enhanced Header */}
      <header className="bg-white/70 backdrop-blur-md border-b border-white/30 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18 py-2">
            {/* Enhanced Logo/Brand */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl shadow-lg">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  ToneFixer
                </h1>
                <div className="flex items-center space-x-2 -mt-1">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                  <p className="text-xs font-medium text-gray-500">AI-Powered Communication</p>
                </div>
              </div>
            </div>
            
            {/* Enhanced Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-indigo-600 transition-all duration-300 font-medium relative group">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 transition-all duration-300 font-medium relative group">
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 transition-all duration-300 font-medium relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <div className="flex items-center space-x-3">
                <button className="text-gray-700 hover:text-indigo-600 transition-all duration-300 px-4 py-2 rounded-xl font-medium">
                  Sign In
                </button>
                <button className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </div>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-white/50 transition-colors duration-200"
            >
              {mobileMenuOpen ? <X className="h-6 w-6 text-gray-600" /> : <Menu className="h-6 w-6 text-gray-600" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-white/30 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <a href="#" className="block text-gray-700 font-medium py-2">Features</a>
              <a href="#" className="block text-gray-700 font-medium py-2">Pricing</a>
              <a href="#" className="block text-gray-700 font-medium py-2">About</a>
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <button className="block w-full text-left text-gray-700 font-medium py-2">Sign In</button>
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-xl font-semibold">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Enhanced Hero Section */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-6 border border-blue-200/50">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-800">Transform Communication Instantly</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
            Perfect Your
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent block">
              Professional Tone
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Instantly transform your writing with AI-powered tone adjustment. 
            Perfect for emails, messages, and any professional communication that needs the right touch.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 shadow-sm transform transition-all duration-700 hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                style={{ transitionDelay: `${index * 200 + 300}ms` }}
              >
                <feature.icon className="h-4 w-4 text-indigo-600" />
                <span className="text-sm font-medium text-gray-700">{feature.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Main Form */}
        <div className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/40 p-8 lg:p-12 mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
          {/* Input Section */}
          <div className="mb-10">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <label htmlFor="input-text" className="text-lg font-bold text-gray-800">
                Your Original Text
              </label>
            </div>
            
            <div className="relative group">
              <textarea
                id="input-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your text here and watch the magic happen... Try something like: 'Hey, can you send me that report ASAP? Thanks.'"
                className="w-full h-52 p-6 border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 resize-none bg-white/70 backdrop-blur-sm text-gray-800 placeholder-gray-400 group-hover:shadow-md group-hover:border-gray-300"
              />
              <div className="absolute bottom-4 right-6 flex items-center space-x-4">
                <div className={`text-sm transition-colors duration-200 ${charCount > 1000 ? 'text-amber-600' : charCount > 500 ? 'text-blue-600' : 'text-gray-400'}`}>
                  {charCount.toLocaleString()} characters
                </div>
                {charCount > 0 && (
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Settings Row */}
          <div className="grid lg:grid-cols-2 gap-8 mb-10">
            {/* Profession Dropdown */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <label className="text-lg font-bold text-gray-800">
                  Profession
                </label>
              </div>
              
              <div className="relative group">
                <select
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="w-full p-5 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/70 backdrop-blur-sm appearance-none cursor-pointer text-gray-700 font-medium group-hover:shadow-md group-hover:border-gray-300"
                >
                  <option value="">Choose profession...</option>
                  {professions.map((prof) => (
                    <option key={prof} value={prof}>{prof}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none transition-transform duration-200 group-focus-within:rotate-180" />
              </div>
              
              {profession === 'Other' && (
                <input
                  type="text"
                  value={customProfession}
                  onChange={(e) => setCustomProfession(e.target.value)}
                  placeholder="e.g., Freelance Designer, Startup Founder..."
                  className="w-full p-5 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-700 animate-slideIn"
                />
              )}
            </div>

            {/* Tone Dropdown */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <label className="text-lg font-bold text-gray-800">
                  Desired Tone
                </label>
              </div>
              
              <div className="relative group">
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full p-5 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/70 backdrop-blur-sm appearance-none cursor-pointer text-gray-700 font-medium group-hover:shadow-md group-hover:border-gray-300"
                >
                  <option value="">Select your preferred tone...</option>
                  {tones.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none transition-transform duration-200 group-focus-within:rotate-180" />
              </div>
              
              {tone === 'Other' && (
                <input
                  type="text"
                  value={customTone}
                  onChange={(e) => setCustomTone(e.target.value)}
                  placeholder="e.g., Warm but authoritative, Playfully confident..."
                  className="w-full p-5 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-700 animate-slideIn"
                />
              )}
            </div>
          </div>

          {/* Enhanced Fix Tone Button */}
          <div className="text-center">
            <button
              onClick={handleFixTone}
              disabled={isDisabled}
              className={`relative overflow-hidden px-12 py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform ${
                isDisabled
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed scale-95'
                  : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white hover:scale-105 shadow-2xl hover:shadow-indigo-500/25 active:scale-95'
              }`}
            >
              {!isDisabled && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 transform scale-x-0 hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              )}
              
              <span className="relative z-10 flex items-center justify-center space-x-3">
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Transforming Your Text...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-6 w-6" />
                    <span>Transform My Text</span>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </>
                )}
              </span>
            </button>
          </div>
        </div>

        {/* Enhanced Results Section */}
        {outputText && (
          <div className={`bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50 rounded-3xl shadow-2xl border border-white/40 p-8 lg:p-12 relative overflow-hidden transform transition-all duration-700 animate-slideIn`}>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-200/30 to-transparent rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-200/30 to-transparent rounded-full -ml-12 -mb-12"></div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">✨ Your Transformed Text</h3>
                <p className="text-gray-600">Ready to use in your professional communication</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Ready
                </div>
                <button
                  onClick={copyToClipboard}
                  className={`p-4 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                    copied
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'bg-white/70 hover:bg-white text-gray-600 hover:text-gray-800 shadow-md hover:shadow-lg'
                  }`}
                  title="Copy to clipboard"
                >
                  {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/40 shadow-inner relative z-10">
              <p className="text-gray-800 leading-relaxed text-lg whitespace-pre-wrap">
                {outputText}
              </p>
            </div>

            {copied && (
              <div className="absolute top-8 right-20 bg-green-500 text-white px-4 py-2 rounded-xl text-sm font-semibold animate-bounce shadow-lg z-20">
                Copied to clipboard! ✓
              </div>
            )}
          </div>
        )}
      </main>

      {/* Enhanced Footer */}
      <footer className="mt-24 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-white/30 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <Sparkles className="h-5 w-5 text-indigo-600" />
              <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ToneFixer</span>
            </div>
            <p className="text-gray-600 mb-6">Transforming communication, one message at a time.</p>
            <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <a href="#" className="hover:text-indigo-600 transition-colors duration-200">Privacy</a>
              <a href="#" className="hover:text-indigo-600 transition-colors duration-200">Terms</a>
              <a href="#" className="hover:text-indigo-600 transition-colors duration-200">Support</a>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-500">&copy; 2024 ToneFixer. Powered by advanced AI to enhance your professional communication.</p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ToneFixer;