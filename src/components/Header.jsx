import React from 'react';
import { FiGithub } from 'react-icons/fi';

export default function Header() {
  return (
    <header className="bg-slate-900 text-slate-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
          <h1 className="text-xl font-bold tracking-tight">
            Req <span className="text-indigo-300">API</span>
          </h1>
        </div>
        
        <a
          href="https://github.com/chrismat-05/Req-API"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1.5 text-slate-300 hover:text-white transition-colors text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-slate-800"
        >
          <FiGithub className="w-4 h-4" />
          <span>Star on GitHub</span>
        </a>
      </div>
    </header>
  );
}