import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import CyberBackground from './components/CyberBackground';
import UrlInputForm from './components/UrlInputForm';
import Loader from './components/Loader';
import ResultsDisplay from './components/ResultsDisplay';
import PdfDownload from './components/PdfDownload';
import CodeRefactor from './components/CodeRefactor';
import Footer from './components/Footer';
import HackerIntro from './components/HackerIntro';
import QuantumChatbot from './components/QuantumChatbot';
import LandingPage from './components/LandingPage';
import BlogPage from './components/BlogPage';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import { generateAuditReport } from './services/geminiService';
import { generateAuditReportWithGranite } from './services/nimService';
import type { AuditResult } from './types';

type ServiceType = 'gemini' | 'nvidia-nim';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('https://google.com');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceType>('nvidia-nim');
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [showLandingPage, setShowLandingPage] = useState<boolean>(true);
  const [showBlogPage, setShowBlogPage] = useState<boolean>(false);
  const [showAnalytics, setShowAnalytics] = useState<boolean>(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleLandingPageAccept = () => {
    setShowLandingPage(false);
  };

  const handleShowBlogPage = () => {
    setShowBlogPage(true);
    setShowLandingPage(false);
  };

  const handleBackToLanding = () => {
    setShowBlogPage(false);
    setShowLandingPage(true);
  };

  const toggleAnalytics = () => {
    setShowAnalytics(!showAnalytics);
  };

  const handleAudit = useCallback(async (targetUrl: string) => {
    if (!targetUrl) {
      setError('Please enter a valid URL.');
      return;
    }
    setIsLoading(true);
    setAuditResult(null);
    setError(null);

    try {
      let result: AuditResult;
      
      if (selectedService === 'nvidia-nim') {
        result = await generateAuditReportWithGranite(targetUrl);
      } else {
        result = await generateAuditReport(targetUrl);
      }
      
      setAuditResult(result);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to generate audit. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [selectedService]);

  const getServiceDisplayName = (service: ServiceType) => {
    return service === 'gemini' ? 'Google Gemini' : 'NVIDIA NIM (IBM Granite)';
  };

  return (
    <div className="min-h-screen flex flex-col font-mono bg-black text-green-400 relative">
      {showIntro ? (
        <HackerIntro onComplete={handleIntroComplete} />
      ) : showBlogPage ? (
        <BlogPage onBack={handleBackToLanding} />
      ) : showLandingPage ? (
        <LandingPage onAccept={handleLandingPageAccept} onShowBlog={handleShowBlogPage} />
      ) : (
        <>
          <CyberBackground />
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8 md:py-12 relative z-10">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Side - Analytics Dashboard */}
              <div className="lg:w-1/3">
                {showAnalytics && (
                  <AnalyticsDashboard
                    auditResult={auditResult}
                    url={url}
                    serviceName={getServiceDisplayName(selectedService)}
                    isVisible={showAnalytics}
                    onToggleVisibility={toggleAnalytics}
                  />
                )}
              </div>
              
              {/* Right Side - Audit Tools */}
              <div className="lg:w-2/3">
                {/* Back to Landing Button */}
                <div className="mb-4 flex justify-between items-center">
                  <button
                    onClick={toggleAnalytics}
                    className={`px-4 py-2 rounded-3xl transition-colors font-mono text-sm ${
                      showAnalytics
                        ? 'bg-green-600/20 border border-green-500/50 text-green-400 hover:bg-green-600/30'
                        : 'bg-gray-600/20 border border-gray-500/50 text-gray-400 hover:bg-gray-600/30'
                    }`}
                  >
                    {showAnalytics ? '📊 HIDE ANALYTICS' : '📊 SHOW ANALYTICS'}
                  </button>
                  <button
                    onClick={handleBackToLanding}
                    className="px-4 py-2 bg-blue-600/20 border border-blue-500/50 text-blue-400 rounded-3xl hover:bg-blue-600/30 transition-colors font-mono text-sm"
                  >
                    ← BACK TO LANDING
                  </button>
                </div>
                
                {/* Service Selector */}
                <div className="mb-6 p-6 bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-3xl shadow-lg shadow-green-500/20 cyber-panel">
                  <h3 className="text-6xl font-semibold text-green-400 mb-4 flex items-center">
                    <span className="w-6 h-6 bg-green-500 rounded-full mr-4 animate-pulse"></span>
                    SELECT AI SERVICE
                  </h3>
                  <p className="text-lg text-green-400/80 font-mono mb-6 leading-relaxed">
                    Choose between two powerful AI engines for your quantum security analysis. Google Gemini provides advanced reasoning capabilities, while NVIDIA NIM with IBM Granite offers specialized quantum-resistant cryptography expertise. Each service delivers comprehensive vulnerability assessments with actionable recommendations.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Google Gemini */}
                    <button
                      onClick={() => setSelectedService('gemini')}
                      className={`relative p-6 rounded-3xl transition-all duration-500 transform hover:scale-105 ${
                        selectedService === 'gemini' 
                          ? 'bg-gradient-to-br from-purple-600/30 to-pink-600/30 border-2 border-purple-400 shadow-lg shadow-purple-500/30' 
                          : 'bg-black/40 border-2 border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="text-center">
                        {/* Icon */}
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                          selectedService === 'gemini'
                            ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50'
                            : 'bg-gray-700'
                        }`}>
                          <svg className={`w-8 h-8 transition-all duration-500 ${
                            selectedService === 'gemini' ? 'text-white' : 'text-gray-400'
                          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        
                        {/* Title */}
                        <h4 className={`font-mono text-xl font-bold mb-2 transition-all duration-500 ${
                          selectedService === 'gemini' ? 'text-purple-400' : 'text-gray-300'
                        }`}>
                          GOOGLE GEMINI
                        </h4>
                        
                        {/* Description */}
                        <p className={`text-sm font-mono transition-all duration-500 ${
                          selectedService === 'gemini' ? 'text-purple-300' : 'text-gray-500'
                        }`}>
                          Advanced reasoning & analysis
                        </p>
                        
                        {/* Selection Indicator */}
                        {selectedService === 'gemini' && (
                          <div className="absolute top-4 right-4 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center animate-pulse">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>

                    {/* NVIDIA NIM (IBM Granite) */}
                    <button
                      onClick={() => setSelectedService('nvidia-nim')}
                      className={`relative p-6 rounded-3xl transition-all duration-500 transform hover:scale-105 ${
                        selectedService === 'nvidia-nim' 
                          ? 'bg-gradient-to-br from-green-600/30 to-blue-600/30 border-2 border-green-400 shadow-lg shadow-green-500/30' 
                          : 'bg-black/40 border-2 border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="text-center">
                        {/* Icon */}
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                          selectedService === 'nvidia-nim'
                            ? 'bg-gradient-to-br from-green-500 to-blue-500 shadow-lg shadow-green-500/50'
                            : 'bg-gray-700'
                        }`}>
                          <svg className={`w-8 h-8 transition-all duration-500 ${
                            selectedService === 'nvidia-nim' ? 'text-white' : 'text-gray-400'
                          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                          </svg>
                        </div>
                        
                        {/* Title */}
                        <h4 className={`font-mono text-xl font-bold mb-2 transition-all duration-500 ${
                          selectedService === 'nvidia-nim' ? 'text-green-400' : 'text-gray-300'
                        }`}>
                          NVIDIA NIM
                        </h4>
                        <h5 className={`font-mono text-sm font-bold mb-2 transition-all duration-500 ${
                          selectedService === 'nvidia-nim' ? 'text-blue-400' : 'text-gray-400'
                        }`}>
                          (IBM GRANITE)
                        </h5>
                        
                        {/* Description */}
                        <p className={`text-sm font-mono transition-all duration-500 ${
                          selectedService === 'nvidia-nim' ? 'text-green-300' : 'text-gray-500'
                        }`}>
                          Quantum-resistant cryptography
                        </p>
                        
                        {/* Selection Indicator */}
                        {selectedService === 'nvidia-nim' && (
                          <div className="absolute top-4 right-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  </div>
                  <p className="text-xl text-green-400/70 mt-6 font-mono">
                    {selectedService === 'gemini' 
                      ? '> USING GOOGLE GEMINI FOR QUANTUM SECURITY ANALYSIS'
                      : '> USING NVIDIA NIM WITH IBM GRANITE 3.3-8B MODEL FOR QUANTUM SECURITY ANALYSIS'
                    }
                  </p>
                </div>

                <UrlInputForm
                  url={url}
                  setUrl={setUrl}
                  onSubmit={handleAudit}
                  isLoading={isLoading}
                />
                
                {isLoading && <Loader />}
                
                {error && (
                  <div className="mt-8 p-6 bg-red-900/30 border border-red-500/50 text-red-300 rounded-3xl text-center cyber-error">
                    <p className="font-bold text-red-400">ERROR DETECTED</p>
                    <p className="font-mono">{error}</p>
                  </div>
                )}

                {auditResult && !isLoading && (
                  <div className="mt-8 animate-fade-in">
                    <ResultsDisplay result={auditResult} />
                    <PdfDownload 
                      result={auditResult} 
                      url={url} 
                      serviceName={getServiceDisplayName(selectedService)}
                    />
                    <CodeRefactor 
                      result={auditResult} 
                      url={url} 
                      serviceName={getServiceDisplayName(selectedService)}
                    />
                    <QuantumChatbot
                      auditResult={auditResult}
                      refactoredCode={`/*\n * Quantum Refactor Auditor - Code Refactoring Report\n * Target URL: ${url}\n * AI Service: ${getServiceDisplayName(selectedService)}\n *\n * This code is a template for post-quantum security improvements.\n */\n\n// Example: Enhanced Security Headers\nconst securityHeaders = {\n  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',\n  'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self';",\n  'X-Content-Type-Options': 'nosniff',\n  'X-Frame-Options': 'DENY',\n  'X-XSS-Protection': '1; mode=block',\n  'Referrer-Policy': 'strict-origin-when-cross-origin',\n  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',\n  'X-Quantum-Resistant': 'enabled',\n  'X-Post-Quantum-Crypto': 'supported'\n};\n\n// Example: Apply headers in Express.js\n// app.use((req, res, next) => {\n//   Object.entries(securityHeaders).forEach(([key, value]) => {\n//     res.setHeader(key, value);\n//   });\n//   next();\n// });\n\n// Example: Quantum-resistant hash (SHA-3)\n// const crypto = require('crypto');\n// function quantumHash(data) {\n//   return crypto.createHash('sha3-512').update(data).digest('hex');\n// }\n\n// ... more code and recommendations ...\n`}
                      url={url}
                      serviceName={getServiceDisplayName(selectedService)}
                    />
                  </div>
                )}
              </div>
            </div>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
